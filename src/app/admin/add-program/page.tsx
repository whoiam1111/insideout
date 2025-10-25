'use client';
import { useState, useEffect } from 'react';

// 타입 정의
interface Program {
    id: number;
    title: string;
    subtitle?: string | null;
    category?: string | null;
    subcategory?: string | null;
    city?: string | null;
    district?: string | null;
    description?: string | null;
    capacity?: number | null;
    duration_type?: string | null;
    time?: string | null;
    date?: string | null;
    days?: string[] | null;
    start_date?: string | null;
    end_date?: string | null;
    thumbnail?: string | null;
    price?: number | null;
    tags?: string[] | null;
    created_at?: string | null;
}
type ProgramInsert = Omit<Program, 'id' | 'created_at'>;

export default function AddProgramPage() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState<number | ''>('');
    const [durationType, setDurationType] = useState('단기');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [days, setDays] = useState<string[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState<number | ''>('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    // 프로그램 목록 불러오기
    const fetchPrograms = async () => {
        try {
            const res = await fetch('/api/programs');
            const data = await res.json();
            if (Array.isArray(data)) setPrograms(data);
            else setPrograms([]);
        } catch (error) {
            console.error('[Fetch Error]', error);
            setMessage('⚠️ 모임 목록 불러오기 실패');
        }
    };

    // 서브카테고리 목록 불러오기
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const res = await fetch('/api/icon_grid');
                const data = await res.json();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (Array.isArray(data)) setSubcategories(data.map((c: any) => c.text));
                console.log(data, '?data');
            } catch (err) {
                console.error('[Fetch Subcategories Error]', err);
            }
        };
        fetchSubcategories();
    }, []);

    useEffect(() => {
        fetchPrograms();
    }, []);

    // 미리보기 메모리 해제
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    // 파일 선택 시 미리보기
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    // 요일 선택
    const handleDayToggle = (day: string) => {
        setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    };

    // 태그 추가
    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (!tags.includes(newTag)) {
                setTags((prev) => [...prev, newTag]);
            }
            setTagInput('');
        }
    };

    // 태그 삭제
    const handleRemoveTag = (tagToRemove: string) => {
        setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            let publicUrl: string | null = null;

            // 이미지 업로드
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok || uploadData.error) throw new Error(uploadData.error || '이미지 업로드 실패');
                publicUrl = uploadData.url;
            }

            // DB 저장
            const newProgram: ProgramInsert = {
                title,
                subtitle,
                category,
                subcategory,
                city,
                district,
                description,
                capacity: capacity === '' ? null : Number(capacity),
                duration_type: durationType,
                time,
                date: durationType === '단기' ? date : null,
                days: durationType === '장기' ? days : [],
                start_date: durationType === '장기' ? startDate : null,
                end_date: durationType === '장기' ? endDate : null,
                thumbnail: publicUrl,
                price: price === '' ? null : Number(price),
                tags: tags.length > 0 ? tags : null,
            };

            const res = await fetch('/api/programs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProgram),
            });

            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error || '모임 추가 실패');

            setMessage(`✅ "${title}" 프로그램이 등록되었습니다!`);

            // 폼 초기화
            setTitle('');
            setSubtitle('');
            setCategory('');
            setSubcategory('');
            setCity('');
            setDistrict('');
            setDescription('');
            setCapacity('');
            setDurationType('단기');
            setTime('');
            setDate('');
            setDays([]);
            setStartDate('');
            setEndDate('');
            setFile(null);
            setPreview(null);
            setPrice('');
            setTagInput('');
            setTags([]);
            fetchPrograms();
        } catch (err: unknown) {
            console.error('[Submit Error]', err);
            const msg = err instanceof Error ? err.message : '알 수 없는 오류';
            setMessage(`⚠️ 등록 실패: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">➕ 새 프로그램 등록</h1>

            {message && (
                <p
                    className={`mb-4 p-3 rounded-lg ${
                        message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mb-12 bg-white p-6 rounded-xl shadow-sm">
                {/* 이름 & 부제 */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        프로그램 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="새로운 모임의 이름을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    />
                </div>
                <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                        부제 / 간단한 설명
                    </label>
                    <input
                        type="text"
                        id="subtitle"
                        placeholder="모임을 한 문장으로 설명해주세요"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    />
                </div>

                {/* 카테고리 */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    >
                        <option value="">카테고리 선택</option>
                        <option value="모임">모임</option>
                        <option value="챌린지">챌린지</option>
                        <option value="강연">강연</option>
                        <option value="클래스">클래스</option>
                    </select>
                </div>

                {/* 서브카테고리 */}
                {category && (
                    <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                            서브카테고리
                        </label>
                        <select
                            id="subcategory"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                        >
                            <option value="">서브카테고리 선택</option>
                            {subcategories.map((sc) => (
                                <option key={sc} value={sc}>
                                    {sc}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* 지역 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">지역</label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="시 (예: 서울특별시)"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="구 (예: 강남구)"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="flex-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                        />
                    </div>
                </div>

                {/* 상세 설명 */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        상세 내용
                    </label>
                    <textarea
                        id="description"
                        placeholder="모임에 대한 자세한 내용을 입력해주세요"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3 h-32 resize-y"
                    />
                </div>

                {/* 정원 */}
                <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                        정원
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        placeholder="참가 정원 (숫자만 입력)"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    />
                </div>

                {/* 가격 */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        가격 (원)
                    </label>
                    <input
                        type="number"
                        id="price"
                        placeholder="참가비 (예: 10000)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    />
                </div>

                {/* 단기 / 장기 */}
                <div>
                    <label htmlFor="durationType" className="block text-sm font-medium text-gray-700 mb-1">
                        기간 유형
                    </label>
                    <select
                        id="durationType"
                        value={durationType}
                        onChange={(e) => setDurationType(e.target.value)}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    >
                        <option value="단기">단기 (하루만 진행)</option>
                        <option value="장기">장기 (특정 기간 반복)</option>
                    </select>
                </div>

                {/* 시간 */}
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        시간
                    </label>
                    <input
                        type="text"
                        id="time"
                        placeholder="시간 (예: 오후 7시~9시)"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    />
                </div>

                {/* 단기일 경우 날짜 */}
                {durationType === '단기' && (
                    <div>
                        <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700">
                            날짜
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                        />
                    </div>
                )}

                {/* 장기일 경우 시작~종료일 */}
                {durationType === '장기' && (
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="startDate" className="block mb-1 text-sm font-medium text-gray-700">
                                시작일
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="endDate" className="block mb-1 text-sm font-medium text-gray-700">
                                종료일
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                            />
                        </div>
                    </div>
                )}

                {/* 요일 선택 */}
                {durationType === '장기' && (
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">요일 선택</label>
                        <div className="flex gap-2 flex-wrap">
                            {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => handleDayToggle(d)}
                                    className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                                        days.includes(d)
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 태그 입력 */}
                <div>
                    <label htmlFor="tags" className="block mb-1 text-sm font-medium text-gray-700">
                        태그 (엔터로 추가)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="예: #이태원 #문화생활 #소셜"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base py-2 px-3"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                            >
                                #{tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-indigo-100 transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* 썸네일 */}
                <div>
                    <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-700">
                        썸네일 이미지
                    </label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                    {preview && (
                        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden w-48 h-48 flex items-center justify-center">
                            <img src={preview} alt="썸네일 미리보기" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '프로그램 등록 중...' : '프로그램 등록'}
                </button>
            </form>

            {/* 등록된 프로그램 리스트 */}
            <h2 className="text-2xl font-bold mb-5 text-gray-900">📋 등록된 프로그램</h2>
            <ul className="space-y-4">
                {programs.length === 0 && (
                    <p className="text-gray-500 p-4 bg-gray-50 rounded-lg">등록된 프로그램이 없습니다.</p>
                )}
                {programs.map((p) => (
                    <li
                        key={p.id}
                        className="flex flex-col sm:flex-row gap-4 sm:items-center border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        {p.thumbnail ? (
                            <img
                                src={p.thumbnail}
                                alt={p.title}
                                className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md text-gray-400 text-xs flex-shrink-0">
                                No Image
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
                            {p.subtitle && <p className="text-gray-600 text-sm mt-1">{p.subtitle}</p>}
                            <p className="text-gray-500 text-xs mt-1">
                                {p.city && `${p.city} ${p.district ? `- ${p.district}` : ''}`} | 정원:{' '}
                                {p.capacity ?? '미정'}명
                            </p>
                            {typeof p.price === 'number' && (
                                <p className="text-indigo-600 font-bold mt-2 text-base">{p.price.toLocaleString()}원</p>
                            )}
                            {p.tags && p.tags.length > 0 && (
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {p.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="text-gray-500 text-sm mt-2 sm:mt-0 sm:text-right">
                            <p>{p.time}</p>
                            <p>{p.duration_type === '단기' ? p.date : `${p.start_date} ~ ${p.end_date}`}</p>
                            {p.duration_type === '장기' && p.days && p.days.length > 0 && <p>({p.days.join(', ')})</p>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

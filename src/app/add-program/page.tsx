'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 타입 정의
interface Program {
    id: number;
    title: string;
    subtitle?: string | null;
    category?: string | null;
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
    created_at?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ProgramInsert extends Omit<Program, 'id' | 'created_at'> {}
export default function AddProgramPage() {
    // 상태 관리
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [category, setCategory] = useState('');
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

    // 프로그램 목록 불러오기
    const fetchPrograms = async () => {
        try {
            const res = await fetch('/api/programs');
            const data = await res.json();
            if (Array.isArray(data)) setPrograms(data);
            else {
                console.error('[Unexpected Data]', data);
                setPrograms([]);
            }
        } catch (error) {
            console.error('[Fetch Error]', error);
            setMessage('⚠️ 모임 목록 불러오기 실패');
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    // 파일 선택 시 미리보기 표시
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    };

    // 요일 선택 핸들러
    const handleDayToggle = (day: string) => {
        setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
    };

    // 제출
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            let publicUrl: string | null = null;

            // 이미지 업로드
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `programs/${fileName}`;
                const { error: uploadError } = await supabase.storage.from('program-images').upload(filePath, file);

                if (uploadError) throw new Error(`이미지 업로드 실패: ${uploadError.message}`);

                const { data: publicUrlData } = supabase.storage.from('program-images').getPublicUrl(filePath);
                publicUrl = publicUrlData?.publicUrl ?? null;
            }

            // DB 저장
            const newProgram: ProgramInsert = {
                title,
                subtitle,
                category,
                city,
                district,
                description,
                capacity: capacity === '' ? null : Number(capacity),
                duration_type: durationType,
                time,
                date: durationType === '단기' ? date : null,
                days,
                start_date: durationType === '장기' ? startDate : null,
                end_date: durationType === '장기' ? endDate : null,
                thumbnail: publicUrl,
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
            fetchPrograms();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '알 수 없는 오류';
            setMessage(`⚠️ 등록 실패: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">➕ 새 프로그램 등록</h1>

            {message && (
                <p className={`mb-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4 mb-8"
            >
                {/* 이름 & 부제 */}
                <input
                    type="text"
                    placeholder="프로그램 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="부제 / 간단한 설명"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                />

                {/* 카테고리 */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded-lg"
                >
                    <option value="">카테고리 선택</option>
                    <option value="모임">모임</option>
                    <option value="챌린지">챌린지</option>
                    <option value="강연">강연</option>
                    <option value="클래스">클래스</option>
                </select>

                {/* 지역 */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="시 (예: 서울특별시)"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 border px-3 py-2 rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="구 (예: 강남구)"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="flex-1 border px-3 py-2 rounded-lg"
                    />
                </div>

                {/* 상세 설명 */}
                <textarea
                    placeholder="상세 내용"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg h-24"
                />

                {/* 정원 */}
                <input
                    type="number"
                    placeholder="정원"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full border px-3 py-2 rounded-lg"
                />

                {/* 단기 / 장기 */}
                <select
                    value={durationType}
                    onChange={(e) => setDurationType(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                >
                    <option value="단기">단기</option>
                    <option value="장기">장기</option>
                </select>

                {/* 시간 */}
                <input
                    type="text"
                    placeholder="시간 (예: 오후 7시~9시)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                />

                {/* 단기일 경우 날짜 */}
                {durationType === '단기' && (
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg"
                    />
                )}

                {/* 장기일 경우 시작~종료일 */}
                {durationType === '장기' && (
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 text-sm font-medium text-gray-700">시작일</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 text-sm font-medium text-gray-700">종료일</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg"
                            />
                        </div>
                    </div>
                )}

                {/* 요일 선택 */}
                {durationType === '장기' && (
                    <div>
                        <label className="block mb-1 font-medium">요일 선택</label>
                        <div className="flex gap-2 flex-wrap">
                            {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => handleDayToggle(d)}
                                    className={`px-3 py-1 border rounded-full ${
                                        days.includes(d) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* 썸네일 */}
                <div>
                    <label className="block mb-1 font-medium">썸네일 이미지</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="썸네일 미리보기"
                            className="mt-2 w-32 h-32 object-cover rounded-md border"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg"
                >
                    {loading ? '등록 중...' : '프로그램 등록'}
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">📋 등록된 프로그램</h2>
            <ul className="space-y-2">
                {programs.map((p) => (
                    <li
                        key={p.id}
                        className="p-3 border rounded-lg flex items-center gap-3"
                    >
                        {p.thumbnail && (
                            <img
                                src={p.thumbnail}
                                alt={p.title}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                        )}
                        <div>
                            <p className="font-semibold">{p.title}</p>
                            <p className="text-sm text-gray-600">{p.subtitle}</p>
                            {p.start_date && p.end_date && (
                                <p className="text-xs text-gray-500">
                                    📅 {p.start_date} ~ {p.end_date}
                                </p>
                            )}
                            {p.city && p.district && (
                                <p className="text-xs text-gray-500">
                                    📍 {p.city} {p.district}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

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
    image?: string | null;
    thumbnail?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
}

interface ProgramInsert {
    title: string;
    subtitle?: string | null;
    image?: string | null;
    thumbnail?: string | null;
}

export default function AddProgramPage() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [file, setFile] = useState<File | null>(null); // 업로드할 파일
    const [preview, setPreview] = useState<string | null>(null); // 미리보기용 URL
    const [programs, setPrograms] = useState<Program[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 기존 프로그램 불러오기
    const fetchPrograms = async () => {
        try {
            const res = await fetch('/api/programs');
            const data: Program[] = await res.json();
            setPrograms(data);
        } catch (error) {
            console.error('[Fetch Error]', error);
            setMessage('⚠️ 모임 목록 불러오기 실패');
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    // 파일 선택 시 미리보기만 표시 (업로드 X)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    };

    // 제출 시 실제 업로드 + DB 저장
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            let publicUrl: string | null = null;

            // 1️⃣ 이미지가 있을 경우에만 업로드 수행
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `programs/${fileName}`;

                const { error: uploadError } = await supabase.storage.from('program-images').upload(filePath, file);

                if (uploadError) {
                    console.error('[Upload Error]', uploadError);
                    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
                }

                const { data: publicUrlData } = supabase.storage.from('program-images').getPublicUrl(filePath);

                publicUrl = publicUrlData?.publicUrl ?? null;
                if (!publicUrl) throw new Error('이미지 URL 생성 실패');
            }

            // 2️⃣ DB에 program 정보 저장
            const newProgram: ProgramInsert = {
                title,
                subtitle,
                image: publicUrl,
                thumbnail: publicUrl,
            };

            const res = await fetch('/api/programs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProgram),
            });

            const data = await res.json();
            if (!res.ok || data.error) {
                console.error('[Insert Error]', data);
                throw new Error(data.error || '모임 추가 실패');
            }

            // 3️⃣ 성공 시 UI 갱신
            setMessage(`✅ "${title}" 모임이 추가되었습니다`);
            setTitle('');
            setSubtitle('');
            setFile(null);
            setPreview(null);
            fetchPrograms();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '알 수 없는 오류';
            console.error('[Submit Error]', msg);
            setMessage(`⚠️ 모임 추가 실패: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">➕ 새 모임 관리</h1>

            {message && (
                <p className={`mb-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <input
                    type="text"
                    placeholder="모임 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="설명"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                />

                <div>
                    <label className="block mb-1 font-medium">썸네일 이미지 선택 (미리보기만)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {preview && (
                        <img
                            src={preview}
                            alt="썸네일 미리보기"
                            className="mt-2 w-32 h-32 object-cover rounded-md border"
                        />
                    )}
                </div>

                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                    {loading ? '추가 중...' : '모임 추가'}
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">등록된 모임</h2>
            <ul className="space-y-2">
                {programs.map((p) => (
                    <li key={p.id} className="p-3 border rounded-lg flex items-center gap-3">
                        {p.thumbnail && (
                            <img src={p.thumbnail} alt={p.title} className="w-16 h-16 object-cover rounded-md" />
                        )}
                        <div>
                            <p className="font-semibold">{p.title}</p>
                            <p className="text-sm text-gray-600">{p.subtitle}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

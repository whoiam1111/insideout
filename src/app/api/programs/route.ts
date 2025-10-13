import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '@/app/lib/db';

// 전체 조회
export async function GET() {
    const client = getClient();
    await client.connect();

    try {
        const result = await client.query(`
      SELECT id, title, subtitle, image, link,
        to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
        to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') AS updated_at
      FROM programs
      ORDER BY id DESC
    `);
        return NextResponse.json(result.rows);
    } catch (err) {
        console.error('조회 오류:', err);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    } finally {
        await client.end();
    }
}

// 새 모임 추가
export async function POST(req: NextRequest) {
    const client = getClient();
    await client.connect();

    try {
        const { title, subtitle, image, link } = await req.json();
        if (!title) return NextResponse.json({ error: '모임 이름 필요' }, { status: 400 });

        await client.query(`INSERT INTO programs (title, subtitle, image, link) VALUES ($1,$2,$3,$4)`, [
            title,
            subtitle,
            image,
            link,
        ]);

        const result = await client.query(`
      SELECT id, title, subtitle, image, link,
        to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,
        to_char(updated_at, 'YYYY-MM-DD HH24:MI:SS') AS updated_at
      FROM programs
      ORDER BY id DESC
    `);

        return NextResponse.json(result.rows);
    } catch (err) {
        console.error('추가 오류:', err);
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
    } finally {
        await client.end();
    }
}

// 모임 수정
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//     const client = getClient();
//     await client.connect();

//     try {
//         const programId = parseInt(params.id);
//         const { title, subtitle, image, link } = await req.json();

//         const result = await client.query(
//             `UPDATE programs SET title=$1, subtitle=$2, image=$3, link=$4, updated_at=NOW() WHERE id=$5 RETURNING *`,
//             [title, subtitle, image, link, programId]
//         );

//         if (result.rowCount === 0) return NextResponse.json({ error: '모임을 찾을 수 없습니다.' }, { status: 404 });

//         return NextResponse.json(result.rows[0]);
//     } catch (err) {
//         console.error('수정 오류:', err);
//         return NextResponse.json({ error: '서버 오류' }, { status: 500 });
//     } finally {
//         await client.end();
//     }
// }

// // 모임 삭제
// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//     const client = getClient();
//     await client.connect();

//     try {
//         const programId = parseInt(params.id);
//         const result = await client.query(`DELETE FROM programs WHERE id=$1`, [programId]);

//         if (result.rowCount === 0) return NextResponse.json({ error: '모임을 찾을 수 없습니다.' }, { status: 404 });

//         return NextResponse.json({ message: '삭제 완료' });
//     } catch (err) {
//         console.error('삭제 오류:', err);
//         return NextResponse.json({ error: '서버 오류' }, { status: 500 });
//     } finally {
//         await client.end();
//     }
// }

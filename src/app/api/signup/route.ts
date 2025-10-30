import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
	const { email, password, full_name, gender, birthday, phone, interests } =
		await req.json();
	const password_hash = await bcrypt.hash(password, 10);

	const { data, error } = await supabase
		.from("users")
		.insert([
			{
				email,
				password_hash,
				full_name,
				gender,
				birthday,
				phone,
				interests,
			},
		]);

	if (error)
		return NextResponse.json(
			{ success: false, message: error.message },
			{ status: 400 }
		);
	return NextResponse.json({ success: true, message: "회원가입 성공!" });
}

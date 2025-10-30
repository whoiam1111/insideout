// app/(legal)/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "개인정보처리방침 | 인사이드아웃",
};

export default function PrivacyPage() {
	const effectiveDate = "2025년 10월 30일"; // 실제 게시일로 교체하세요

	return (
		<article className="prose prose-zinc max-w-none">
			<h1 className="mb-2 text-xl md:text-2xl font-bold">
				인사이드아웃 개인정보 처리 방침
			</h1>
			<p className="m-0 text-sm text-gray-500">
				시행일자: {effectiveDate}
			</p>
			<p className="mt-1 text-sm text-gray-500">
				인사이드아웃(이하 “회사”)은 「개인정보 보호법」 등 관련 법령을
				준수하며, 이용자의 개인정보가 어떤 방식으로
				수집·이용·보관·파기되는지 아래와 같이 안내드립니다.
			</p>

			<hr className="my-8" />
			<div className="flex flex-col gap-6">
				<div>
					<h2 id="collect" className="font-semibold text-lg">
						제1조 (수집하는 개인정보 항목)
					</h2>
					<ol>
						<li>
							<strong>회원가입</strong> — 필수: 이름, 이메일,
							비밀번호 / 선택: 닉네임, 프로필 이미지, 관심 분야
						</li>
						<li>
							<strong>프로그램 신청·결제</strong> — 필수: 이름,
							이메일, 연락처, 결제정보(카드사명, 승인번호 등) /
							선택: 참여 목적, 자기소개
						</li>
						<li>
							<strong>고객문의·제휴</strong> — 필수: 이름, 이메일,
							문의내용 / 선택: 연락처, 직업, 소속
						</li>
						<li>
							<strong>자동수집</strong> — 서비스 이용기록, 접속
							로그, 쿠키, IP, 기기·브라우저 정보 등
						</li>
					</ol>
				</div>
				<div>
					<h2 id="purpose" className="font-semibold text-lg">
						제2조 (개인정보의 수집 및 이용목적)
					</h2>
					<ol>
						<li>회원관리: 본인확인, 계정 관리, 부정이용 방지</li>
						<li>
							서비스 제공: 프로그램 신청·결제·환불, 일정/진행 안내
						</li>
						<li>커뮤니케이션: 공지·알림, 고객문의 응대</li>
						<li>맞춤 추천: 관심사 기반 모임/콘텐츠 추천</li>
						<li>
							서비스 개선 및 통계분석: 이용 패턴 분석, 신규 기능
							기획
						</li>
						<li>법적 의무 준수 및 분쟁 대응</li>
					</ol>
				</div>
				<div>
					<h2 id="retention" className="font-semibold text-lg">
						제3조 (개인정보의 보유 및 이용기간)
					</h2>
					<ol>
						<li>
							원칙적으로 수집 목적 달성 후 지체 없이 파기합니다.
						</li>
						<li>
							다만 관련 법령에 따라 아래 정보는 일정 기간 보관할
							수 있습니다.
							<ul>
								<li>계약/청약철회 기록: 5년</li>
								<li>대금결제 및 재화 공급 기록: 5년</li>
								<li>소비자 불만 또는 분쟁처리 기록: 3년</li>
								<li>접속 로그 등 통신사실확인자료: 3개월</li>
							</ul>
						</li>
					</ol>
				</div>
				<div>
					<h2 id="third-party" className="font-semibold text-lg">
						제4조 (개인정보의 제3자 제공)
					</h2>
					<ol>
						<li>
							회사는 원칙적으로 이용자 개인정보를 제3자에게
							제공하지 않습니다.
						</li>
						<li>
							예외적으로 ① 이용자 사전 동의, ② 법령상 요구, ③
							프로그램 운영을 위해 주최자에게 필요한 최소
							정보(이름, 이메일, 연락처 등)를 제공해야 하는 경우
							제공될 수 있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="outsourcing" className="font-semibold text-lg">
						제5조 (개인정보의 처리위탁)
					</h2>
					<p>
						회사는 서비스 제공을 위해 아래와 같이 업무를 위탁할 수
						있습니다.
					</p>
					<table>
						<thead>
							<tr>
								<th>수탁업체</th>
								<th>위탁업무</th>
								<th>보유·이용기간</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>결제대행사 : 토스페이먼츠</td>
								<td>결제 처리 및 정산</td>
								<td>
									서비스 제공 종료 또는 위탁계약 종료 시까지
								</td>
							</tr>
							{/* <tr>
								<td>메일 발송 시스템 (예: Mailchimp 등)</td>
								<td>알림/공지/마케팅 이메일 발송</td>
								<td>회원 탈퇴 또는 위탁계약 종료 시까지</td>
							</tr> */}
						</tbody>
					</table>
					<p className="text-sm text-gray-500">
						※ 실제 도입 서비스에 따라 수탁사 정보는 업데이트됩니다.
					</p>
				</div>
				<div>
					<h2 id="destruction" className="font-semibold text-lg">
						제6조 (개인정보의 파기절차 및 방법)
					</h2>
					<ol>
						<li>
							보유기간 경과 또는 처리 목적 달성 시 지체 없이
							파기합니다.
						</li>
						<li>
							전자적 파일: 복구 불가능한 기술적 방법으로 삭제 /
							종이 문서: 분쇄 또는 소각
						</li>
					</ol>
				</div>
				<div>
					<h2 id="rights" className="font-semibold text-lg">
						제7조 (이용자 및 법정대리인의 권리)
					</h2>
					<ol>
						<li>
							이용자는 언제든지 개인정보 열람·정정·삭제 및
							처리정지를 요구할 수 있습니다.
						</li>
						<li>
							회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있습니다.
						</li>
						<li>
							만 14세 미만 아동은 법정대리인 동의 하에 가입
							가능합니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="security" className="font-semibold text-lg">
						제8조 (개인정보의 안전성 확보조치)
					</h2>
					<ol>
						<li>접근권한 관리 및 담당자 보안 교육</li>
						<li>비밀번호 암호화, 접근 로그 관리</li>
						<li>전송 구간 SSL/TLS 암호화</li>
						<li>백업/복구 체계 및 정기 보안 점검</li>
					</ol>
				</div>
				<div>
					<h2 id="cookies" className="font-semibold text-lg">
						제9조 (쿠키의 설치·운영 및 거부)
					</h2>
					<ol>
						<li>
							맞춤형 서비스 제공을 위해 쿠키를 사용할 수 있습니다.
						</li>
						<li>
							브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 일부
							서비스 이용이 제한될 수 있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="dpo" className="font-semibold text-lg">
						제10조 (개인정보 보호책임자 및 문의처)
					</h2>
					<p>
						회사는 개인정보 관련 문의를 신속하고 성실히 처리하기
						위해 다음과 같이 보호책임자를 지정합니다.
					</p>
					<ul>
						<li>
							<strong>개인정보 보호책임자:</strong>한슬기
						</li>
						<li>
							<strong>소속/직위:</strong> 인사이드아웃 운영팀
						</li>
						<li>
							<strong>이메일:</strong> contact@insideout.kr
						</li>
						{/* <li>
							<strong>전화:</strong> 02-XXX-XXXX
						</li> */}
					</ul>
				</div>
				<div>
					<h2 id="changes" className="font-semibold text-lg">
						제11조 (개인정보처리방침의 변경)
					</h2>
					<ol>
						<li>
							본 방침은 법령 또는 서비스 정책 변경에 따라 수정될
							수 있습니다.
						</li>
						<li>
							중요 변경 시 웹사이트 공지사항을 통해 사전
							고지합니다.
						</li>
					</ol>
				</div>
			</div>
			<hr className="my-8" />
			<p className="text-sm text-gray-500">
				본 약관의 내용은 서비스 운영 정책 또는 관련 법령의 개정에 따라
				변경될 수 있으며, 변경 시 서비스 내 공지사항을 통해 사전
				안내합니다.
			</p>
		</article>
	);
}

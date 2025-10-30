// app/(legal)/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "이용약관 | 인사이드아웃",
};

export default function TermsPage() {
	const effectiveDate = "2025년 10월 30일"; // 실제 게시일로 교체하세요

	return (
		<article className="prose prose-zinc max-w-none">
			<h1 className="mb-2 text-xl md:text-2xl font-bold">
				인사이드아웃 이용약관
			</h1>
			<p className="m-0 text-sm text-gray-500">
				시행일자: {effectiveDate}
			</p>
			<p className="mt-1 text-sm text-gray-500">
				본 약관은 인사이드아웃(이하 “회사”)이 운영하는 온라인 플랫폼
				Inside Out(이하 “서비스”)을 이용함에 있어 회사와 이용자 간의
				권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
			</p>

			<hr className="my-8" />
			<div className="flex flex-col gap-6">
				<div>
					<h2 id="purpose" className="font-semibold text-lg">
						제1조 (목적)
					</h2>
					<p>
						이 약관은 회사가 제공하는 모임·강연·프로그램 중개 및
						신청 서비스(이하 “서비스”)의 이용조건과 절차, 권리와
						의무 및 기타 필요한 사항을 규정합니다.
					</p>
				</div>
				<div>
					<h2 id="definitions" className="font-semibold text-lg">
						제2조 (용어의 정의)
					</h2>
					<ol>
						<li>
							“서비스”: 플랫폼을 통해 제공되는 모임/강연/프로그램
							정보 제공, 신청·결제 대행 및 소통 지원 등 일체의
							기능
						</li>
						<li>
							“이용자”: 본 약관에 따라 서비스를 이용하는 회원 및
							비회원
						</li>
						<li>
							“회원”: 서비스에 가입하여 지속적으로 기능을 이용할
							수 있는 자
						</li>
						<li>
							“주최자(호스트)”: 프로그램을 기획·운영하며 플랫폼을
							통해 홍보 및 모집하는 자
						</li>
						<li>
							“참가자”: 주최자가 개설한 프로그램에 참여
							신청·결제를 완료한 자
						</li>
					</ol>
				</div>
				<div>
					<h2 id="effect" className="font-semibold text-lg">
						제3조 (약관의 효력 및 변경)
					</h2>
					<ol>
						<li>
							본 약관은 서비스 화면에 게시하거나 기타 방법으로
							공지함으로써 효력이 발생합니다.
						</li>
						<li>
							회사는 관련 법령을 위반하지 않는 범위에서 약관을
							개정할 수 있으며, 변경 시 사전 공지합니다.
						</li>
						<li>
							이용자가 변경 약관에 동의하지 않을 경우 서비스
							이용을 중단하고 회원탈퇴를 요청할 수 있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="service" className="font-semibold text-lg">
						제4조 (서비스의 제공 및 변경)
					</h2>
					<ol>
						<li>
							회사는 ① 프로그램 등록·홍보 ② 신청·결제 및 관리 ③
							주최자-참가자 소통 지원 ④ 기타 부가서비스를
							제공합니다.
						</li>
						<li>
							서비스 품질 개선 또는 기술적 사양 변경을 위해 서비스
							내용을 변경할 수 있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="intermediary" className="font-semibold text-lg">
						제5조 (서비스의 중개 성격)
					</h2>
					<ol>
						<li>
							회사는 주최자와 참가자 간 거래의{" "}
							<strong>중개자</strong>
							이며, 프로그램의 내용·운영·결과에 대한 직접 책임을
							지지 않습니다.
						</li>
						<li>
							프로그램의 품질·안전성·합법성 등은 주최자에게 책임이
							있습니다.
						</li>
						<li>
							회사는 거래 당사자가 아니며, 분쟁 발생 시 합리적
							범위에서 중재 협력을 할 수 있으나 법적 책임은
							부담하지 않습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="contract" className="font-semibold text-lg">
						제6조 (이용 계약의 성립)
					</h2>
					<ol>
						<li>
							이용계약은 이용자가 약관에 동의하고 회사가 정한
							절차에 따른 신청을 승인함으로써 성립합니다.
						</li>
						<li>
							회사는 ① 타인 정보 도용 ② 허위 정보 기재 ③ 기타
							부적절한 이용으로 판단되는 경우 승인을 거절할 수
							있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="member-duty" className="font-semibold text-lg">
						제7조 (회원의 의무)
					</h2>
					<ol>
						<li>
							회원은 ① 타인 정보 도용·허위 등록 ② 불법 정보 게시 ③
							타인의 권리(저작권·상표권 등) 침해 ④ 서비스 운영
							방해 행위를 해서는 안됩니다.
						</li>
						<li>
							계정 관리 책임은 회원에게 있으며, 부정 사용으로 인한
							손해는 회원 본인에게 있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="payment-refund" className="font-semibold text-lg">
						제8조 (결제 및 환불)
					</h2>
					<ol>
						<li>
							참가자는 주최자가 정한 조건에 따라 결제를
							진행합니다.
						</li>
						<li>
							환불 정책은{" "}
							<strong>
								각 프로그램의 주최자가 별도로 정한 규정
							</strong>
							을 따르며, 회사는 환불 조건 차이에 대해 책임을 지지
							않습니다.
						</li>
						<li>
							회사는 결제 시스템 지원 및 결제 처리 대행을
							담당합니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="privacy" className="font-semibold text-lg">
						제9조 (개인정보 보호)
					</h2>
					<ol>
						<li>
							회사는 별도 게시된{" "}
							<a
								href="/privacy"
								className="underline underline-offset-2"
							>
								개인정보처리방침
							</a>
							을 준수합니다.
						</li>
						<li>
							서비스 제공 목적 외로 개인정보를 이용하지 않습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="copyright" className="font-semibold text-lg">
						제10조 (저작권 및 콘텐츠 관리)
					</h2>
					<ol>
						<li>
							서비스 내 게시물의 저작권은 작성자(주최자 또는
							회사)에 귀속됩니다.
						</li>
						<li>
							회원은 게시물의 저작권을 침해하거나 무단 도용할 수
							없습니다.
						</li>
						<li>
							회사는 운영상 필요 시 사전 공지 후 게시물을
							수정·이동·삭제할 수 있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="restriction" className="font-semibold text-lg">
						제11조 (서비스 이용 제한 및 해지)
					</h2>
					<ol>
						<li>
							회사는 약관 위반 또는 운영 방해 시 사전 통보 없이
							이용을 제한할 수 있습니다.
						</li>
						<li>회원은 언제든지 탈퇴할 수 있습니다.</li>
					</ol>
				</div>
				<div>
					<h2 id="disclaimer" className="font-semibold text-lg">
						제12조 (면책 조항)
					</h2>
					<ol>
						<li>
							회사는 천재지변, 기술 장애, 제3자의 불법 행위 등
							불가항력으로 인한 서비스 중단에 책임을 지지
							않습니다.
						</li>
						<li>
							이용자 간 분쟁에 대한 법적 책임을 지지 않으며,
							원만한 해결을 위해 필요한 범위의 지원을 할 수
							있습니다.
						</li>
					</ol>
				</div>
				<div>
					<h2 id="law" className="font-semibold text-lg">
						제13조 (준거법 및 관할법원)
					</h2>
					<ol>
						<li>본 약관은 대한민국 법령에 따라 해석됩니다.</li>
						<li>
							분쟁 발생 시 회사 본사 소재지 관할 법원을 전속
							관할로 합니다.
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

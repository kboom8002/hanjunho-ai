import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '팩트 인증센터 | hanjunho.ai 신뢰·검수 허브',
  description: '누가 답을 만들고, 누가 검수하며, 어떤 기준으로 hanjunho.ai가 운영되는지 확인할 수 있는 공식 신뢰 허브입니다.',
  openGraph: {
    title: '팩트 인증센터 | hanjunho.ai 신뢰·검수 허브',
    description: '한준호, 김태영 교수, 한준호 캠프 AI 정책본부의 역할과 검증 구조를 확인하세요.',
  }
};

export default function TrustCenterPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-h1 mb-6">팩트 인증센터</h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          이 플랫폼의 답변과 브리핑은 누가 만들고, 누가 검수하며, 어떤 기준으로 공개되는지 확인할 수 있습니다.
        </p>
      </div>

      <section className="bg-surface-muted p-10 rounded-[22px] mb-12 text-center">
        <h2 className="text-h3 mb-6">후보의 약속</h2>
        <p className="text-body-lg text-neutral-800 leading-relaxed font-medium">
          한준호 후보는 경기도의 현안을 더 분명하게 설명하고, 근거와 함께 답하며, 업데이트 가능한 형태로 공개하는 정치를 지향합니다. hanjunho.ai는 그 약속을 질문형 구조로 실천하는 공식 플랫폼입니다.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="flex flex-col items-center text-center p-10">
          <div className="w-24 h-24 bg-brand-100 rounded-full mb-6"></div>
          <h2 className="text-h3 border-b-2 border-brand-700 pb-2 mb-4">총괄 검수자</h2>
          <p className="text-body-lg font-bold mb-2">김태영 교수</p>
          <p className="text-body text-neutral-600 mb-6">정책과 이슈 설명이 더 정확하고 더 설명 가능하도록 검수합니다.</p>
          <Link href="/profiles/kim-tae-young">
            <Button variant="secondary">김태영 교수 프로필 보기</Button>
          </Link>
        </Card>
        
        <Card className="flex flex-col items-center text-center p-10">
          <div className="w-24 h-24 bg-brand-100 rounded-full mb-6"></div>
          <h2 className="text-h3 border-b-2 border-brand-700 pb-2 mb-4">책임 편집 주체</h2>
          <p className="text-body-lg font-bold mb-2">한준호 캠프 AI 정책본부</p>
          <p className="text-body text-neutral-600 mb-6">질문 구조화, 답변 작성, 카드 업데이트와 브리핑 편집을 담당합니다.</p>
          <Button variant="secondary">편집 주체 보기</Button>
        </Card>
      </div>

      <section className="mb-16">
        <h2 className="text-h2 text-center mb-10">이렇게 검증됩니다</h2>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {["질문 수집", "답변 작성", "근거 정리", "검수", "업데이트"].map((step, idx) => (
            <div key={idx} className="flex-1 bg-surface-soft border border-line-default rounded-2xl p-6 text-center">
              <div className="text-brand-700 font-bold mb-2">단계 {idx + 1}</div>
              <h3 className="text-h3 text-neutral-900">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center bg-brand-900 text-white rounded-[22px] p-12">
        <h2 className="text-h2 mb-4">질문·제안·제보</h2>
        <p className="text-body-lg text-neutral-300 mb-8 max-w-xl mx-auto">
          정책 질문, 개선 제안, 사실관계 확인이 필요한 제보를 남겨주세요.
        </p>
        <Link href="/contact">
          <Button variant="primary" className="bg-white text-brand-900 hover:bg-neutral-100 border-transparent">
            질문·제안·제보 보내기
          </Button>
        </Link>
      </section>
    </div>
  );
}

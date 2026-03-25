import { Metadata } from 'next';
import { Chip } from '@/components/ui/chip';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '한준호 | 경기도민의 질문에 답하는 공식 발화자',
  description: '한준호 후보의 역할, 주요 이력, 정책 발화 원칙, 대표 공약 답변을 한곳에서 확인하세요. 국토교통, 소통, 기술, 생활 현안을 함께 이해하는 공식 프로필 페이지입니다.',
  openGraph: {
    title: '한준호 | 경기도민의 질문에 답하는 공식 발화자',
    description: '교통, 일자리, 주거, 돌봄, 행정 혁신까지. 한준호 후보의 역할과 대표 답변을 공식 프로필 페이지에서 확인하세요.',
  }
};

export default function HanjunhoProfilePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "한준호",
      "description": "국토교통, 소통, 기술, 생활 현안을 함께 이해하는 시각으로 경기도의 질문에 답합니다. 복잡한 현안을 피하지 않고, 시민이 이해할 수 있는 언어로 설명하며, 정책과 실행의 연결까지 책임지는 정치인입니다.",
      "image": "https://hanjunho.ai/images/hanjunho.jpg",
      "url": "https://hanjunho.ai/hanjunho"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="w-full">
        {/* Profile Hero */}
        <section className="bg-surface-muted pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <Chip variant="primary" className="mb-6">공식 발화자 프로필</Chip>
            <h1 className="text-h1 mb-6 leading-tight">경기도민의 질문에 공식 답을 내는 사람, <br />한준호</h1>
            <p className="text-body-lg text-neutral-600 max-w-2xl mb-10">
              국토교통, 소통, 기술, 생활 현안을 함께 이해하는 시각으로 경기도의 질문에 답합니다. 이 페이지는 한준호 후보의 역할, 경험, 정책 발화 원칙을 정리한 공식 프로필입니다.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["제22대 국회의원", "국회 국토교통위원회 위원", "전 더불어민주당 최고위원", "전 MBC 아나운서"].map((badge, i) => (
                <Chip key={i} variant="base">{badge}</Chip>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center border-b border-line-default">
          <h2 className="text-h3 mb-6">한준호를 한 문장으로 소개하면</h2>
          <p className="text-[22px] leading-relaxed text-brand-900 font-medium">
            복잡한 현안을 피하지 않고, 시민이 이해할 수 있는 언어로 설명하며, 정책과 실행의 연결까지 책임지는 정치인. 한준호 후보는 경기도의 생활 문제를 더 분명하고 더 구조적으로 다루는 공적 답변자를 지향합니다.
          </p>
        </section>

        {/* Why Official Speaker */}
        <section className="bg-brand-050 py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-h2 text-center mb-12">왜 한준호의 답변을 공식 기준으로 삼는가</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <Card className="p-8">
                <h3 className="text-h3 mb-4 text-brand-700">국토교통과 도시 현안 이해</h3>
                <p className="text-body text-neutral-700">국회 국토교통위원회 활동을 통해 교통·주거·도시 의제를 직접 다뤄온 경험이 한준호 후보의 강점입니다.</p>
              </Card>
              <Card className="p-8">
                <h3 className="text-h3 mb-4 text-brand-700">정치 커뮤니케이션 경험</h3>
                <p className="text-body text-neutral-700">원내대변인, 홍보위원장, 청와대 국민소통수석실, MBC 아나운서 경험은 복잡한 문제를 공적 언어로 설명하는 힘이 됩니다.</p>
              </Card>
              <Card className="p-8">
                <h3 className="text-h3 mb-4 text-brand-700">디지털·기술 감각</h3>
                <p className="text-body text-neutral-700">데이콤 ST 프로그래머와 코스닥시장 근무 이력은 정책을 시스템과 데이터의 관점에서 바라보는 감각으로 이어집니다.</p>
              </Card>
              <Card className="p-8">
                <h3 className="text-h3 mb-4 text-brand-700">생활 밀착형 시선</h3>
                <p className="text-body text-neutral-700">정책은 생활의 언어로 설명될 때 힘을 가집니다. 한준호 후보는 현장과 일상에 닿는 설명을 지향합니다.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Policy Principles */}
        <section className="max-w-4xl mx-auto px-4 py-20 border-b border-line-default">
          <div className="text-center mb-12">
            <h2 className="text-h2">한준호의 정책 발화 원칙</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-8 text-center">
            <div className="flex-1">
              <div className="text-[40px] font-bold text-brand-200 mb-2">1</div>
              <h3 className="text-h3 text-neutral-900">질문을 먼저 이해한다</h3>
            </div>
            <div className="flex-1">
              <div className="text-[40px] font-bold text-brand-200 mb-2">2</div>
              <h3 className="text-h3 text-neutral-900">근거를 함께 제시한다</h3>
            </div>
            <div className="flex-1">
              <div className="text-[40px] font-bold text-brand-200 mb-2">3</div>
              <h3 className="text-h3 text-neutral-900">생활의 언어로 설명한다</h3>
            </div>
          </div>
        </section>

        {/* Answer Cards Outlink */}
        <section className="max-w-xl mx-auto px-4 py-20 text-center">
          <h2 className="text-h2 mb-6">한준호의 대표 답변 보기</h2>
          <Button variant="primary" size="lg" className="w-full sm:w-auto">대표 답변카드 보기</Button>
        </section>
      </div>
    </>
  );
}

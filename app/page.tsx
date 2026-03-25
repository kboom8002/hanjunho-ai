import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '한준호 경기도지사 후보 | 정책·이슈 답변·팩트체크 공식 플랫폼',
  description: '경기도지사 후보 한준호의 교통, 일자리, 주거, 돌봄, 교육, 행정 혁신 공약을 질문형으로 확인하세요. 핵심 이슈 답변, 정책 근거, 팩트체크를 한곳에서 제공합니다.',
  openGraph: {
    title: '한준호 | 경기도민의 질문에 답하는 공식 정책·이슈 플랫폼',
    description: '출퇴근, 청년 일자리, 주거, 돌봄, 교육, 행정 혁신까지. 경기도민이 가장 궁금한 질문에 한준호 후보의 정책과 근거를 한곳에서 확인하세요.',
  }
};

export default function Home() {
  const quickQuestions = [
    "GTX-R은 기존 교통대책과 무엇이 다른가",
    "청년 일자리 10만 개는 어떻게 가능한가",
    "1기 신도시 정비는 얼마나 빨라지나",
    "전세사기 긴급기금은 어떻게 지원되나",
    "경기북부 발전 전략의 핵심은 무엇인가",
    "AI 교육 공약은 어떻게 추진되나"
  ];

  const clearMapVisions = [
    { title: "내 출퇴근", desc: "교통과 이동 시간 해법" },
    { title: "내 일자리", desc: "청년·산업·성장 전략" },
    { title: "내 가족", desc: "돌봄·교육·복지 해법" },
    { title: "투명한 도정", desc: "설명 가능한 행정 혁신" },
    { title: "개혁적 민생", desc: "주거·상권·균형발전" }
  ];

  return (
    <div className="flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Chip variant="primary" className="mb-6">한준호 공식 정책·이슈 플랫폼</Chip>
        <h1 className="text-h1 mb-6 max-w-4xl mx-auto">
          경기도민의 질문에 답하는<br className="hidden md:block" /> 한준호 공식 정책·이슈 플랫폼
        </h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-10">
          출퇴근, 청년 일자리, 주거, 돌봄, 교육, 행정 혁신까지. 경기도민이 가장 궁금한 질문에 한준호 후보의 정책, 근거, 팩트체크를 한곳에 모았습니다.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <Suspense fallback={<div className="w-full h-[60px] rounded-full border border-brand-700 bg-white" />}>
            <SearchInput actionUrl="/clearmap" placeholder="GTX-R, 전세사기 대책, 청년 일자리, 1기 신도시처럼 자연어로 찾아보세요" />
          </Suspense>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/clearmap"><Button variant="secondary">질문별 공약 보기</Button></Link>
          <Link href="/issues"><Button variant="secondary">핵심 이슈 브리핑</Button></Link>
          <Link href="/fact-check"><Button variant="secondary">팩트체크 확인하기</Button></Link>
        </div>
      </section>

      {/* Quick Questions Section */}
      <section className="w-full bg-surface-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-h2 mb-4">이런 질문이 있으신가요?</h2>
            <p className="text-body text-neutral-600">경기도민이 많이 묻는 핵심 질문을 먼저 정리했습니다. 궁금한 주제부터 바로 확인해보세요.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {quickQuestions.map((q, i) => (
              <Link href={`/clearmap?q=${encodeURIComponent(q)}`} key={i}>
                <Chip variant="base" className="cursor-pointer hover:bg-brand-050 hover:text-brand-700 hover:border-brand-200 transition-colors">
                  {q}
                </Chip>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Visions Clear Map Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-h2 mb-4">5대 비전 클리어맵</h2>
            <p className="text-body text-neutral-600">경기도민의 일상과 가장 가까운 다섯 가지 질문 축으로 정책을 정리했습니다.</p>
          </div>
          <Link href="/clearmap">
            <Button variant="tertiary" className="mt-4 md:mt-0">5대 비전 전체 보기</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {clearMapVisions.map((vision, i) => (
            <Link href={`/clearmap?category=${encodeURIComponent(vision.title)}`} key={i} className="block group">
              <Card className="hover:shadow-md transition-shadow h-full border-line-default group-hover:border-brand-200">
                <h3 className="text-h3 mb-2 group-hover:text-brand-700">{vision.title}</h3>
                <p className="text-body text-neutral-600">{vision.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Block */}
      <section className="w-full bg-surface-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h2 mb-4">이 답변은 이렇게 검증됩니다</h2>
          <p className="text-body text-neutral-600 mb-10 max-w-2xl mx-auto">누가 답을 만들고, 누가 검수하며, 어떤 기준으로 공개하는지 함께 확인할 수 있습니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <h3 className="text-h3 mb-2">한준호</h3>
              <p className="text-body text-neutral-600">공식 발화자</p>
            </Card>
            <Card>
              <h3 className="text-h3 mb-2">김태영 교수</h3>
              <p className="text-body text-neutral-600">총괄 검수자</p>
            </Card>
            <Card>
              <h3 className="text-h3 mb-2">한준호 캠프 AI 정책본부</h3>
              <p className="text-body text-neutral-600">책임 편집 주체</p>
            </Card>
          </div>
          <Link href="/trust-center">
            <Button variant="secondary">팩트 인증센터 보기</Button>
          </Link>
        </div>
      </section>

      {/* Action CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-h2 mb-4">경기도의 질문에 더 가까이 답하겠습니다</h2>
        <p className="text-body text-neutral-600 mb-10 max-w-2xl mx-auto">현장의 질문과 제안이 정책을 더 구체적으로 만듭니다. 질문을 남기고, 정책을 제안하고, 투표 일정도 확인하세요.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary">질문 남기기</Button>
          <Button variant="secondary">정책 제안 보내기</Button>
          <Button variant="tertiary">투표 안내 보기</Button>
        </div>
      </section>

    </div>
  );
}

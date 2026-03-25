import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '팩트체크 | 한준호 관련 주요 쟁점 검증',
  description: '주요 쟁점과 논란이 되는 주장에 대해 수치, 근거, 출처를 기준으로 확인합니다. 관련 정책 답변과 이슈브리핑도 함께 연결합니다.',
  openGraph: {
    title: '팩트체크 | 한준호 관련 주요 쟁점 검증',
    description: '주요 주장과 논란을 근거 중심으로 확인하는 공식 검증 허브입니다.',
  }
};

export default function FactCheckIndex() {
  const cases = [
    { title: "GTX-R 노선은 실현 불가능한 공약인가?", verdict: "과장", domain: "경기 교통" },
    { title: "데이터센터 건립 반대, 지역 발전 저해?", verdict: "맥락 필요", domain: "경기 경제" },
  ];

  const verdictStyles: Record<string, "primary" | "verified" | "issue" | "fact"> = {
    "과장": "issue",
    "맥락 필요": "verified",
    "사실": "fact",
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-h1 mb-6">팩트체크</h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          주요 쟁점과 논란이 되는 주장에 대해 수치, 근거, 출처를 기준으로 확인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <div className="mb-6">
               <div className="flex gap-2 mb-4">
                  <Chip variant="base">검증 결과</Chip>
                  <Chip variant={verdictStyles[c.verdict]}>{c.verdict}</Chip>
               </div>
               <h3 className="text-h3 text-neutral-900 leading-snug">{c.title}</h3>
            </div>
            <div className="pt-4 border-t border-line-default flex gap-2">
              <Button variant="secondary" size="sm" className="w-full">검증 내용 보기</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import Link from 'next/link';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({}: Props): Promise<Metadata> {
  // In a real app, fetch card data here
  const name = "GTX-R 노선 신설 계획";
  const snippet = "기존 노선과 달리 수도권 서북부와 동북부를 직접 연결하여 출퇴근 시간을 30분 단축합니다.";
  
  return {
    title: `${name} | 한준호 클리어맵`,
    description: snippet,
    openGraph: {
      title: `${name} | 한준호 클리어맵`,
      description: snippet,
    }
  }
}

export default function AnswerCardPage({}: Props) {
  // Mock data matching the schema
  const data = {
    name: "GTX-R 노선 신설 계획",
    category: "내 출퇴근",
    userQuery: "GTX-R은 기존 교통대책과 무엇이 다른가요?",
    snippet: "기존 노선과 달리 수도권 서북부와 동북부를 직접 연결하여 출퇴근 시간을 30분 단축합니다. 예비타당성 면제를 통한 조기 착공이 핵심입니다.",
    date: "2024.10.15"
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://hanjunho.ai/" },
          { "@type": "ListItem", "position": 2, "name": "5대 비전 클리어맵", "item": "https://hanjunho.ai/clearmap" },
          { "@type": "ListItem", "position": 3, "name": data.category },
          { "@type": "ListItem", "position": 4, "name": data.name }
        ]
      },
      {
        "@type": "WebPage",
        "name": `${data.name} | 한준호 클리어맵`,
        "description": data.snippet,
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": data.userQuery,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": data.snippet
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <nav className="text-caption text-neutral-500 mb-6">
            <Link href="/" className="hover:text-brand-700">홈</Link> &gt; 
            <Link href="/clearmap" className="hover:text-brand-700 ml-1">5대 비전 클리어맵</Link> &gt; 
            <span className="ml-1">{data.category}</span> &gt; 
            <span className="text-neutral-900 ml-1 font-medium">{data.name}</span>
          </nav>
          
          <div className="flex gap-2 items-center mb-6">
            <Chip variant="primary">김태영 교수 검수</Chip>
            <span className="text-caption text-neutral-500">최종 업데이트 {data.date}</span>
          </div>

          <div className="bg-surface-soft border border-brand-100 rounded-[22px] p-8 mb-8 relative shadow-sm">
            <div className="absolute -top-4 left-8 bg-brand-700 text-white text-caption px-4 py-1 rounded-full font-semibold">도민의 질문</div>
            <h1 className="text-h2 mt-4 text-brand-900 leading-snug">
              &ldquo;{data.userQuery}&rdquo;
            </h1>
          </div>
          
          <div className="mb-10">
            <h2 className="text-h3 border-b-2 border-neutral-900 pb-3 mb-6 inline-block">명쾌한 정답</h2>
            <p className="text-body-lg text-neutral-900 font-medium leading-relaxed bg-brand-050 p-6 rounded-2xl border border-line-default">
              {data.snippet}
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-h3 mb-6">실행 방안 3</h2>
          <ul className="list-disc pl-5 space-y-4 text-body text-neutral-700">
            <li>수도권 서북부 교통망 기본계획 반영</li>
            <li>예비타당성조사 면제 법안 발의</li>
            <li>국토부-경기도-고양시 3자 협의체 구성</li>
          </ul>
        </section>

        <section className="mb-12 bg-surface-muted p-8 rounded-[22px]">
          <h2 className="text-h3 mb-6">작성 · 검수</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Chip variant="base" className="mb-3">작성</Chip>
              <p className="text-body font-semibold">한준호 캠프 AI 정책본부</p>
              <p className="text-caption text-neutral-600 mt-1">질문 구조화, 답변 작성, 카드 업데이트를 책임지는 편집 주체입니다.</p>
            </div>
            <div>
              <Chip variant="base" className="mb-3">검수</Chip>
              <p className="text-body font-semibold">김태영 교수</p>
              <p className="text-caption text-neutral-600 mt-1">정책 표현과 근거, 논리 구조를 검수하는 총괄 검수자입니다.</p>
              <Button variant="tertiary" size="sm" className="mt-3">프로필 보기</Button>
            </div>
          </div>
        </section>

        <section className="text-center pt-8 border-t border-line-default">
          <h2 className="text-h3 mb-6">관련 Answer Card</h2>
          <Button variant="secondary">관련 답변 더 보기</Button>
        </section>
      </article>
    </>
  );
}

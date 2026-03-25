import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from('answer_cards').select('name, snippet').eq('canonical_slug', params.slug).single();

  const name = data?.name || "한준호 공식 답변 카드";
  const snippet = data?.snippet || "질문에 대한 한준호의 공식 정책 답변입니다.";
  
  return {
    title: `${name} | 한준호 클리어맵`,
    description: snippet,
    openGraph: {
      title: `${name} | 한준호 클리어맵`,
      description: snippet,
    }
  }
}

export default async function AnswerCardPage({ params }: Props) {
  const supabase = createClient();
  let { data, error } = await supabase.from('answer_cards').select('*').eq('canonical_slug', params.slug).single();

  if (error || !data) {
    if (params.slug === 'mock-card-0' || params.slug === 'mock-slug') {
      // Graceful fallback for the UI mockups if DB is empty
      data = {
        name: "GTX-R 노선 신설 계획",
        category: "내 출퇴근",
        user_query: "GTX-R은 기존 교통대책과 무엇이 다른가요?",
        snippet: "기존 노선과 달리 수도권 서북부와 동북부를 직접 연결하여 출퇴근 시간을 30분 단축합니다. 예비타당성 면제를 통한 조기 착공이 핵심입니다.",
        updated_at: "2024-10-15T00:00:00Z",
        action_plan_1_title: "수도권 서북부 교통망 기본계획 반영",
        action_plan_1_body: "",
        action_plan_2_title: "예비타당성조사 면제 법안 발의",
        action_plan_2_body: "",
        action_plan_3_title: "국토부-경기도-고양시 3자 협의체 구성",
        action_plan_3_body: ""
      };
    } else {
      notFound();
    }
  }

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
            "name": data.user_query,
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
            <h1 className="text-neutral-900 ml-1 font-medium inline text-base">{data.name} | 한준호 공식 정책 답변</h1>
          </nav>
          
          <div className="flex gap-2 items-center mb-6">
            <Chip variant="primary">김태영 교수 검수</Chip>
            <span className="text-caption text-neutral-500">
              최종 업데이트 {data.updated_at ? new Date(data.updated_at).toLocaleDateString() : ''}
            </span>
          </div>

          <div className="bg-surface-soft border border-brand-100 rounded-[22px] p-8 mb-8 relative shadow-sm">
            <div className="absolute -top-4 left-8 bg-brand-700 text-white text-caption px-4 py-1 rounded-full font-semibold">도민의 질문</div>
            <h2 className="text-h2 mt-4 text-brand-900 leading-snug">
              &ldquo;{data.user_query}&rdquo;
            </h2>
          </div>
          
          <div className="mb-10">
            <div className="text-h3 border-b-2 border-neutral-900 pb-3 mb-6 inline-block font-bold">명쾌한 정답</div>
            <p className="text-body-lg text-neutral-900 font-medium leading-relaxed bg-brand-050 p-6 rounded-2xl border border-line-default whitespace-pre-line">
              {data.snippet}
            </p>
          </div>
        </div>

        <section className="mb-12">
          <div className="text-h3 mb-6 font-bold">실행 방안</div>
          <ul className="list-disc pl-5 space-y-4 text-body text-neutral-700">
            {data.action_plan_1_title && (
              <li>
                <span className="font-semibold">{data.action_plan_1_title}</span>
                {data.action_plan_1_body && <p className="mt-1 text-sm">{data.action_plan_1_body}</p>}
              </li>
            )}
            {data.action_plan_2_title && (
              <li>
                <span className="font-semibold">{data.action_plan_2_title}</span>
                {data.action_plan_2_body && <p className="mt-1 text-sm">{data.action_plan_2_body}</p>}
              </li>
            )}
            {data.action_plan_3_title && (
              <li>
                <span className="font-semibold">{data.action_plan_3_title}</span>
                {data.action_plan_3_body && <p className="mt-1 text-sm">{data.action_plan_3_body}</p>}
              </li>
            )}
            {(!data.action_plan_1_title && !data.action_plan_2_title) && (
              <li>세부 실행 방안을 준비 중입니다.</li>
            )}
          </ul>
        </section>

        {data.context_impact && (
          <section className="mb-12">
            <div className="text-h3 border-b-2 border-neutral-900 pb-3 mb-6 inline-block font-bold">기대 효과 및 맥락</div>
            <p className="text-body text-neutral-700 whitespace-pre-line bg-surface-soft p-6 rounded-2xl">
              {data.context_impact}
            </p>
          </section>
        )}

        <section className="mb-12 bg-surface-muted p-8 rounded-[22px]">
          <div className="text-h3 mb-6 font-bold">작성 · 검수</div>
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
          <div className="text-h3 mb-6 font-bold">관련 Answer Card</div>
          <Link href={`/clearmap?category=${encodeURIComponent(data.category)}`}>
            <Button variant="secondary">같은 비전 답변 더 보기</Button>
          </Link>
        </section>
      </article>
    </>
  );
}

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
  const { data } = await supabase.from('issue_briefings').select('title, summary').eq('canonical_slug', params.slug).single();
  
  const briefingTitle = data?.title || "한준호 이슈브리핑";
  const briefingSummary = data?.summary || "한준호 정책 및 현안에 대한 해설 브리핑입니다.";
  
  return {
    title: `${briefingTitle} | 한준호 이슈브리핑`,
    description: briefingSummary,
    openGraph: {
      title: `${briefingTitle} | 한준호 이슈브리핑`,
      description: briefingSummary,
    }
  }
}

export default async function IssueBriefingDetailPage({ params }: Props) {
  const supabase = createClient();
  let { data, error } = await supabase.from('issue_briefings').select('*').eq('canonical_slug', params.slug).single();

  if (error || !data) {
    if (params.slug.startsWith('mock') || params.slug.startsWith('briefing')) {
       data = {
         title: "고양시청 원안 존치, 왜 중요한가? (Mock)",
         issue_topic: "경기 균형",
         summary: "시청 이전 논란에 대한 핵심 쟁점과 한준호 후보의 원안 존치 논리를 해설합니다.",
         source_published_date: "2024-11-01T00:00:00Z",
         primary_source_title: "한준호, 고양시청 원안 존치 재확인",
         primary_source_url: "#",
         publisher: "중부일보",
         body: "본문 내용이 여기에 들어갑니다. 언론 자료의 팩트와 후보의 공식 입장이 교차하는 지점을 서술합니다.",
         key_takeaway_1: "과도한 매몰비용과 예산 낭비 논란",
         key_takeaway_2: "구도심 공동화 및 지역 균형발전 저해",
         key_takeaway_3: "주민 의견 수렴 절차의 정당성 부족"
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
          { "@type": "ListItem", "position": 2, "name": "이슈브리핑", "item": "https://hanjunho.ai/issues" },
          { "@type": "ListItem", "position": 3, "name": data.issue_topic }
        ]
      },
      {
        "@type": "WebPage",
        "name": `${data.title} | 한준호 이슈브리핑`,
        "description": data.summary,
        "dateModified": data.source_published_date
      },
      {
        "@type": "Article",
        "headline": data.title,
        "description": data.summary,
        "datePublished": data.source_published_date,
        "dateModified": data.source_published_date,
        "author": {
          "@type": "Organization",
          "name": "한준호 캠프 AI 정책본부",
          "url": "https://hanjunho.ai/trust-center"
        },
        "publisher": {
          "@type": "Organization",
          "name": "hanjunho.ai",
          "url": "https://hanjunho.ai/"
        }
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
        <nav className="text-caption text-neutral-500 mb-6 border-b border-line-default pb-4">
          <Link href="/" className="hover:text-brand-700">홈</Link> &gt; 
          <Link href="/issues" className="hover:text-brand-700 ml-1">이슈브리핑</Link> &gt; 
          <span className="text-neutral-900 ml-1 font-medium">{data.title}</span>
        </nav>

        <div className="mb-12">
          <Chip variant="base" className="mb-4">{data.issue_topic}</Chip>
          <h1 className="text-h1 mb-6">{data.title}</h1>
          <p className="text-body-lg text-neutral-700 bg-surface-muted p-6 border-l-4 border-brand-700 rounded-r-2xl whitespace-pre-line">
            {data.summary}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-h3 mb-6 flex items-center gap-3">
            <span className="bg-brand-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">✓</span> 
            핵심 쟁점
          </h2>
          <ul className="list-disc pl-14 space-y-4 text-body text-neutral-800">
            {data.key_takeaway_1 && <li>{data.key_takeaway_1}</li>}
            {data.key_takeaway_2 && <li>{data.key_takeaway_2}</li>}
            {data.key_takeaway_3 && <li>{data.key_takeaway_3}</li>}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">해설 본문</h2>
          <div className="prose prose-lg text-neutral-700 whitespace-pre-line">
            <p>{data.body}</p>
          </div>
        </section>

        <section className="bg-surface-soft p-8 rounded-[22px] mb-12 border border-line-default">
          <h2 className="text-h3 mb-6">작성 · 검수</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Chip variant="base" className="mb-2">작성</Chip>
              <div className="text-body font-bold mt-2">한준호 캠프 AI 정책본부</div>
              <p className="text-caption text-neutral-600 mt-1">한준호 관련 이슈를 언론 보도 기반으로 정리하고 해설하는 편집 주체입니다.</p>
            </div>
            <div>
              <Chip variant="base" className="mb-2">검수</Chip>
              <div className="text-body font-bold mt-2">김태영 교수</div>
              <p className="text-caption text-neutral-600 mt-1">공공정책과 평가 관점에서 브리핑의 사실 관계와 표현 구조를 검수합니다.</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-h3 mb-4">추가 기사 · 관련 브리핑</h2>
          <div className="flex gap-4 justify-center">
            {data.primary_source_url && (
              <a href={data.primary_source_url} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">원문 기사 보기 ({data.publisher})</Button>
              </a>
            )}
            <Link href={`/issues?topic=${encodeURIComponent(data.issue_topic)}`}>
              <Button variant="primary">관련 주제 모아보기</Button>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}

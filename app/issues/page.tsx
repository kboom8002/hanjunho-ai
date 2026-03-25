import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: '이슈브리핑 | 한준호 관련 주요 이슈 해설',
  description: '한준호 관련 주요 이슈를 언론 보도 기반으로 정리한 기사형 해설 허브입니다. 주요 기사, 핵심 쟁점, 관련 정책 답변을 함께 확인할 수 있습니다.',
  openGraph: {
    title: '이슈브리핑 | 한준호 관련 주요 이슈 해설',
    description: '언론 보도를 기반으로 정리한 한준호 관련 이슈 해설과 관련 정책 답변을 확인하세요.',
  }
};

type Props = {
  searchParams: { topic?: string };
}

export default async function IssueBriefingList({ searchParams }: Props) {
  const currentTopic = searchParams.topic;
  const topics = ["경기 교통", "경기 경제", "경기 복지", "투명 행정", "기타 현안"];
  
  let briefings: any[] = [];
  let errorMsg = null;

  try {
    const supabase = createClient();
    let query = supabase.from('issue_briefings').select('*').eq('public_status', 'Public').order('created_at', { ascending: false });

    if (currentTopic) {
      query = query.eq('issue_topic', currentTopic);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Supabase query error:", error);
      errorMsg = "이슈브리핑 데이터를 불러오는 중 문제가 발생했습니다.";
    } else if (data) {
      briefings = data;
    }
  } catch (e) {
    console.error("Supabase client init error:", e);
    // Fallback Mock Data
    briefings = [
      { id: '1',  title: "고양시청 원안 존치, 왜 중요한가? (Mock)", publisher: "중부일보", source_published_date: "2024-11-01T00:00:00Z", summary: "시청 이전 논란에 대한 핵심 쟁점과 한준호 후보의 원안 존치 논리를 해설합니다.", canonical_slug: "mock-briefing-1" },
      { id: '2', title: "GTX-A 요금체계 개편안 해설 (Mock)", publisher: "한겨레", source_published_date: "2024-10-28T00:00:00Z", summary: "고액 요금 논란 관련 정부의 개편안과 추가적인 교통비 절감 쟁점을 다룹니다.", canonical_slug: "mock-briefing-2" },
    ];
  }

  const getTopicLink = (t?: string) => {
    return t ? `/issues?topic=${encodeURIComponent(t)}` : `/issues`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 border-b border-line-default pb-12">
        <h1 className="text-h1 mb-6">핵심 이슈브리핑</h1>
        <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
          한준호 관련 주요 이슈에 대해 언론 보도를 기반으로 쟁점과 맥락을 정리했습니다. 주요 기사, 핵심 포인트, 관련 정책 답변을 한곳에서 확인하세요.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-10 pb-4">
        <Link href={getTopicLink()}>
          <Button variant={!currentTopic ? "secondary" : "tertiary"} size="sm" className={!currentTopic ? "bg-brand-050" : ""}>
            전체 보기
          </Button>
        </Link>
        {topics.map((t) => (
          <Link href={getTopicLink(t)} key={t}>
            <Button variant={currentTopic === t ? "secondary" : "tertiary"} size="sm" className={currentTopic === t ? "bg-brand-050" : ""}>
              {t}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-caption text-neutral-500">
          총 {briefings.length}개의 주요 이슈 {currentTopic ? `(주제: '${currentTopic}')` : ''}
        </span>
      </div>

      {briefings.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-line-default rounded-2xl">
          <p className="text-body-lg text-neutral-500 mb-4">{errorMsg || "조건에 맞는 이슈브리핑이 아직 등록되지 않았습니다."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {briefings.map((issue, i) => (
            <Link href={`/issues/${issue.canonical_slug || 'mock-slug'}`} key={issue.id || i}>
              <Card className="hover:shadow-md transition-shadow h-full flex flex-col justify-between cursor-pointer border-line-default hover:border-brand-200">
                <div>
                  <span className="text-caption text-neutral-500 mb-3 block">
                    {issue.publisher} · {issue.source_published_date ? new Date(issue.source_published_date).toLocaleDateString() : ''}
                  </span>
                  <h3 className="text-h3 mb-4 hover:text-brand-700">{issue.title}</h3>
                  <p className="text-body text-neutral-600 mb-6">{issue.summary}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-line-default pt-4">
                  <span className="hidden">관련 정책 보기</span>
                  <Button variant="secondary" size="sm" className="w-full flex-1 whitespace-nowrap">관련 정책 보기</Button>
                  <Button variant="primary" size="sm" className="w-full flex-1 whitespace-nowrap">이슈 해설 보기</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

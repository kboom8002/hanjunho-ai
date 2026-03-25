import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '5대 비전 클리어맵 | 한준호 정책 질문 허브',
  description: '출퇴근, 일자리, 가족, 투명한 도정, 개혁적 민생까지. 경기도민의 질문을 기준으로 한준호 후보의 정책 답변을 탐색할 수 있는 공식 허브입니다.',
  openGraph: {
    title: '5대 비전 클리어맵 | 한준호 정책 질문 허브',
    description: '경기도민의 질문을 기준으로 정리한 한준호 후보의 대표 정책 답변을 확인하세요.',
  }
};

type Props = {
  searchParams: { q?: string; category?: string; sort?: string };
}

export default async function ClearMapPage({ searchParams }: Props) {
  const categories = ["내 출퇴근", "내 일자리", "내 가족", "투명한 도정", "개혁적 민생"];
  const currentCategory = searchParams.category;
  const currentQ = searchParams.q;
  const currentSort = searchParams.sort || 'latest';

  let cards: any[] = [];
  let errorMsg = null;

  try {
    const supabase = createClient();
    let query = supabase.from('answer_cards').select('*').eq('public_status', 'Public');

    if (currentCategory) {
      query = query.eq('category', currentCategory);
    }
    if (currentQ) {
      query = query.ilike('name', `%${currentQ}%`);
    }

    if (currentSort === 'important') {
      query = query.order('display_priority', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error) {
      console.error("Supabase query error:", error);
      errorMsg = "데이터를 불러오는 중 문제가 발생했습니다.";
    } else if (data) {
      cards = data;
    }
  } catch (e) {
    console.error("Supabase client init error, missing credentials typically:", e);
    // Fallback Mock Data if env is not set or DB access fails
    cards = [
      { id: '1', name: "GTX-R 노선 신설 계획 (Mock)", policy_domain: "경기 교통", category: "내 출퇴근", updated_at: "2024-10-15T00:00:00Z" },
    ];
  }

  // Generate category links
  const getCategoryLink = (cat?: string) => {
    const params = new URLSearchParams();
    if (cat) params.set('category', cat);
    if (currentQ) params.set('q', currentQ);
    if (currentSort !== 'latest') params.set('sort', currentSort);
    return `/clearmap?${params.toString()}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-h1 mb-4">5대 비전 클리어맵</h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          경기도민의 일상과 가장 가까운 다섯 가지 질문 축으로 정책을 정리했습니다. 궁금한 주제부터 바로 확인해보세요.
        </p>
        <div className="max-w-2xl mx-auto mb-6 relative">
          <Suspense fallback={<div className="w-full h-[60px] rounded-full border border-brand-700 bg-white" />}>
            <SearchInput actionUrl="/clearmap" placeholder="질문이나 키워드로 찾아보세요" />
          </Suspense>
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-10 border-b border-line-default pb-4">
        <Link href={getCategoryLink()}>
          <Button variant={!currentCategory ? "secondary" : "tertiary"} size="sm" className={!currentCategory ? "bg-brand-050" : ""}>
            전체
          </Button>
        </Link>
        {categories.map((c) => (
          <Link href={getCategoryLink(c)} key={c}>
            <Button variant={currentCategory === c ? "secondary" : "tertiary"} size="sm" className={currentCategory === c ? "bg-brand-050" : ""}>
              {c}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-caption text-neutral-500">
          총 {cards.length}개의 답변 {currentQ ? `(검색어: '${currentQ}')` : ''}
        </span>
        <div className="flex gap-2">
          <Link href={`/clearmap?${new URLSearchParams({ ...searchParams, sort: 'latest' }).toString()}`}>
            <span className={`text-caption cursor-pointer ${currentSort !== 'important' ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}>최신순</span>
          </Link>
          <span className="text-caption text-neutral-300">|</span>
          <Link href={`/clearmap?${new URLSearchParams({ ...searchParams, sort: 'important' }).toString()}`}>
            <span className={`text-caption cursor-pointer ${currentSort === 'important' ? 'font-bold text-neutral-900' : 'text-neutral-500'}`}>중요도순</span>
          </Link>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-line-default rounded-2xl">
          <p className="text-body-lg text-neutral-500 mb-4">{errorMsg || "조건에 맞는 정책 답변이 아직 등록되지 않았습니다."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Link href={`/cards/${card.canonical_slug || 'mock-slug'}`} key={card.id || i}>
              <Card className="hover:shadow-md transition-shadow h-full flex flex-col justify-between cursor-pointer border-line-default hover:border-brand-200">
                <div>
                  <div className="flex gap-2 mb-4">
                    <Chip variant="base">{card.policy_domain}</Chip>
                    <Chip variant="primary">{card.category}</Chip>
                  </div>
                  <h3 className="text-h3 mb-2 hover:text-brand-700">{card.name}</h3>
                  <p className="text-caption text-brand-600 bg-brand-050 inline-block px-2 py-1 rounded">김태영 교수 검수</p>
                </div>
                <div className="mt-8 flex justify-between items-center border-t border-line-default pt-4">
                  <span className="text-caption text-neutral-500">
                    업데이트 {card.updated_at ? new Date(card.updated_at).toLocaleDateString() : ''}
                  </span>
                  <span className="text-body-sm font-semibold text-brand-700">정답 보기 &rarr;</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

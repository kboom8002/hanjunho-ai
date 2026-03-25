import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import Link from 'next/link';
import { deleteCard } from './actions';

export default async function AdminCardsPage() {
  const supabase = createClient();
  
  const { data: cards, error } = await supabase
    .from('answer_cards')
    .select('id, name, category, public_status, created_at, canonical_slug')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-h2 mb-2">Answer Cards 관리</h1>
          <p className="text-body text-neutral-500">클리어맵 정책 정본 데이터를 관리합니다.</p>
        </div>
        <Link href="/admin/cards/new">
          <Button variant="primary">새로운 카드 작성</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          데이터를 불러오지 못했습니다. 에러: {error.message}
        </div>
      )}

      <div className="bg-white border border-line-default rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-soft border-b border-line-default">
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">제목</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">카테고리</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">상태</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">작성일</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {!cards || cards.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-neutral-500">
                  등록된 카드가 없습니다. 새 카드를 작성해보세요.
                </td>
              </tr>
            ) : (
              cards.map((card) => (
                <tr key={card.id} className="border-b border-line-default hover:bg-neutral-50">
                  <td className="py-4 px-6 font-medium text-neutral-900">{card.name}</td>
                  <td className="py-4 px-6 text-neutral-600">{card.category}</td>
                  <td className="py-4 px-6">
                    <Chip variant={card.public_status === 'Public' ? 'primary' : 'base'} className="text-[12px] px-2 py-0.5">
                      {card.public_status}
                    </Chip>
                  </td>
                  <td className="py-4 px-6 text-neutral-500 text-body-sm">
                    {new Date(card.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/cards/${card.canonical_slug}`} target="_blank">
                        <Button variant="tertiary" size="sm" className="px-3">보기</Button>
                      </Link>
                      <Link href={`/admin/cards/${card.id}/edit`}>
                        <Button variant="secondary" size="sm" className="px-3">수정</Button>
                      </Link>
                      <form action={deleteCard.bind(null, card.id)}>
                        <Button type="submit" variant="tertiary" size="sm" className="px-3 text-red-600 hover:bg-red-50">삭제</Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

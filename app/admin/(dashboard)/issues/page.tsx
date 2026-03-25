import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import Link from 'next/link';
import { deleteBriefing } from './actions';

export default async function AdminIssuesPage() {
  const supabase = createClient();
  
  const { data: briefings, error } = await supabase
    .from('issue_briefings')
    .select('id, title, issue_topic, publisher, public_status, created_at, canonical_slug')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-h2 mb-2">Issue Briefings 관리</h1>
          <p className="text-body text-neutral-500">언론 기반 기사형 해설 콘텐츠를 관리합니다.</p>
        </div>
        <Link href="/admin/issues/new">
          <Button variant="primary">새로운 브리핑 작성</Button>
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
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">주제</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">매체</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600">상태</th>
              <th className="py-4 px-6 text-caption font-semibold text-neutral-600 text-right">관리</th>
            </tr>
          </thead>
          <tbody>
            {!briefings || briefings.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-neutral-500">
                  등록된 브리핑이 없습니다. 새 브리핑을 작성해보세요.
                </td>
              </tr>
            ) : (
              briefings.map((briefing) => (
                <tr key={briefing.id} className="border-b border-line-default hover:bg-neutral-50">
                  <td className="py-4 px-6 font-medium text-neutral-900">{briefing.title}</td>
                  <td className="py-4 px-6 text-neutral-600">{briefing.issue_topic}</td>
                  <td className="py-4 px-6 text-neutral-600">{briefing.publisher}</td>
                  <td className="py-4 px-6">
                    <Chip variant={briefing.public_status === 'Public' ? 'primary' : 'base'} className="text-[12px] px-2 py-0.5">
                      {briefing.public_status}
                    </Chip>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/issues/${briefing.canonical_slug}`} target="_blank">
                        <Button variant="tertiary" size="sm" className="px-3">보기</Button>
                      </Link>
                      <form action={deleteBriefing.bind(null, briefing.id)}>
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

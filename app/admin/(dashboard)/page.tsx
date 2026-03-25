import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminDashboardHome() {
  return (
    <>
      <h1 className="text-h2 mb-2">대시보드</h1>
      <p className="text-body text-neutral-500 mb-8">한준호 공식 플랫폼의 정책 답변, 해설 기사를 관리합니다.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Link href="/admin/cards">
          <Card className="hover:border-brand-300 transition-colors cursor-pointer border-line-default">
            <h3 className="text-body-sm font-semibold text-neutral-500 mb-2">Answer Cards</h3>
            <p className="text-h2 text-brand-700">관리 바로가기</p>
          </Card>
        </Link>
        <Link href="/admin/issues">
          <Card className="hover:border-brand-300 transition-colors cursor-pointer border-line-default">
            <h3 className="text-body-sm font-semibold text-neutral-500 mb-2">Issue Briefings</h3>
            <p className="text-h2 text-brand-700">관리 바로가기</p>
          </Card>
        </Link>
      </div>
    </>
  );
}

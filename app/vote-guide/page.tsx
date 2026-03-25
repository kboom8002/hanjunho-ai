import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '투표 안내 | 한준호 경선·본선 참여 정보',
  description: '경선, 권리당원, 본선 투표 절차와 일정을 쉽게 확인하세요. 누가, 언제, 어떻게 투표하는지 한눈에 정리했습니다.',
  openGraph: {
    title: '투표 안내 | 한준호 경선·본선 참여 정보',
    description: '경선과 본선 투표 정보를 쉽게 확인하고 참여할 수 있도록 정리한 안내 페이지입니다.',
  }
};

export default function VoteGuidePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 border-b border-line-default pb-12">
        <h1 className="text-h1 mb-6">투표 안내</h1>
        <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
          경선·권리당원·본선 투표 절차를 쉽게 확인하세요. 가장 필요한 정보부터 순서대로 정리했습니다.
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-surface-soft p-8 rounded-2xl border border-line-default">
          <h2 className="text-h2 text-brand-700 hover:text-brand-800 transition-colors cursor-pointer flex justify-between items-center">
            누가 투표하나요
            <span className="text-2xl font-normal">+</span>
          </h2>
        </section>

        <section className="bg-surface-soft p-8 rounded-2xl border border-line-default">
          <h2 className="text-h2 text-brand-700 hover:text-brand-800 transition-colors cursor-pointer flex justify-between items-center">
            언제 투표하나요
            <span className="text-2xl font-normal">+</span>
          </h2>
        </section>

        <section className="bg-surface-soft p-8 rounded-2xl border border-line-default">
          <h2 className="text-h2 text-brand-700 hover:text-brand-800 transition-colors cursor-pointer flex justify-between items-center">
            어떻게 투표하나요
            <span className="text-2xl font-normal">+</span>
          </h2>
        </section>

        <section className="bg-surface-soft p-8 rounded-2xl border border-line-default">
          <h2 className="text-h2 text-brand-700 hover:text-brand-800 transition-colors cursor-pointer flex justify-between items-center">
            자주 묻는 질문
            <span className="text-2xl font-normal">+</span>
          </h2>
        </section>
      </div>

      <div className="mt-16 text-center">
        <p className="text-caption text-neutral-500 mb-6">최종 업데이트 2024.11.01</p>
        <h2 className="text-h3 mb-4">도움이 필요하신가요?</h2>
        <Link href="/contact">
          <Button variant="secondary" className="px-8">질문·제안·제보 보내기</Button>
        </Link>
      </div>
    </div>
  );
}

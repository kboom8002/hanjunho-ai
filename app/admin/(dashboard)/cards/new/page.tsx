import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { createCard } from '../actions';
import Link from 'next/link';

export default function NewCardPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex gap-2 text-caption text-neutral-500 mb-2">
          <Link href="/admin/cards" className="hover:text-brand-700">Answer Cards</Link> &gt; <span>새로운 카드 작성</span>
        </div>
        <h1 className="text-h2">새로운 Answer Card 작성</h1>
        <p className="text-body text-neutral-500 mt-2">사용자 질문에 해답을 주는 정책 카드를 생성합니다.</p>
      </div>

      <form action={createCard} className="space-y-10 bg-white p-8 rounded-2xl border border-line-default shadow-sm">
        
        {/* Meta Section */}
        <section>
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">기본 정보 (Meta)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-body-sm font-semibold mb-2">공개 상태 <span className="text-red-500">*</span></label>
              <Select name="public_status" required>
                <option value="Draft">Draft (초안)</option>
                <option value="Review">Review (검수대기)</option>
                <option value="Public">Public (공개 발행)</option>
                <option value="Hidden">Hidden (숨김)</option>
                <option value="Archived">Archived (보관)</option>
              </Select>
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">URL 슬러그 (고유 영문) <span className="text-red-500">*</span></label>
              <Input name="canonical_slug" placeholder="e.g. gtx-r-plan" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-body-sm font-semibold mb-2">카드 제목 (내부 관리용 및 H1) <span className="text-red-500">*</span></label>
              <Input name="name" placeholder="GTX-R 노선 신설 계획" required />
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">클리어맵 카테고리 <span className="text-red-500">*</span></label>
              <Select name="category" required>
                <option value="내 출퇴근">내 출퇴근</option>
                <option value="내 일자리">내 일자리</option>
                <option value="내 가족">내 가족</option>
                <option value="투명한 도정">투명한 도정</option>
                <option value="개혁적 민생">개혁적 민생</option>
              </Select>
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">정책 도메인 <span className="text-red-500">*</span></label>
              <Input name="policy_domain" placeholder="예: 경기 교통" required />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section>
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">핵심 콘텐츠</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-body-sm font-semibold mb-2">도민의 질문 (User Query) <span className="text-red-500">*</span></label>
              <Textarea name="user_query" placeholder="GTX-R은 기존 교통대책과 무엇이 다른가요?" required className="min-h-[80px]" />
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">3문장 요약 정답 (Snippet - AEO Schema 반영) <span className="text-red-500">*</span></label>
              <Textarea name="snippet" placeholder="직접 연결하여 30분을 단축합니다. 예타 면제로 조기 착공합니다. ..." required />
            </div>
          </div>
        </section>

        {/* Action Plans */}
        <section>
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">세부 실행 방안</h2>
          <div className="space-y-8">
            <div className="p-4 bg-surface-soft rounded-xl border border-line-default">
              <label className="block text-body-sm font-semibold mb-2">실행 방안 1 제목 및 내용</label>
              <Input name="action_plan_1_title" placeholder="방안 1 제목" className="mb-3" />
              <Textarea name="action_plan_1_body" placeholder="방안 1 상세 설명" className="min-h-[80px]" />
            </div>
            <div className="p-4 bg-surface-soft rounded-xl border border-line-default">
              <label className="block text-body-sm font-semibold mb-2">실행 방안 2 제목 및 내용</label>
              <Input name="action_plan_2_title" placeholder="방안 2 제목" className="mb-3" />
              <Textarea name="action_plan_2_body" placeholder="방안 2 상세 설명" className="min-h-[80px]" />
            </div>
            <div className="p-4 bg-surface-soft rounded-xl border border-line-default">
              <label className="block text-body-sm font-semibold mb-2">실행 방안 3 제목 및 내용</label>
              <Input name="action_plan_3_title" placeholder="방안 3 제목" className="mb-3" />
              <Textarea name="action_plan_3_body" placeholder="방안 3 상세 설명" className="min-h-[80px]" />
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section>
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">맥락 및 기타</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-body-sm font-semibold mb-2">기대효과 및 맥락 (Context & Impact) <span className="text-red-500">*</span></label>
              <Textarea name="context_impact" placeholder="이 정책이 시행되면 도민의 일상은 이렇게 바뀝니다." required />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-6 border-t border-line-default">
          <Link href="/admin/cards">
            <Button type="button" variant="tertiary" className="px-8">취소</Button>
          </Link>
          <Button type="submit" variant="primary" className="px-12">저장하기</Button>
        </div>
      </form>
    </div>
  );
}

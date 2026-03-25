import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { createBriefing } from '../actions';
import Link from 'next/link';

export default function NewBriefingPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex gap-2 text-caption text-neutral-500 mb-2">
          <Link href="/admin/issues" className="hover:text-brand-700">Issue Briefings</Link> &gt; <span>새로운 브리핑 작성</span>
        </div>
        <h1 className="text-h2">새로운 Issue Briefing 작성</h1>
        <p className="text-body text-neutral-500 mt-2">언론 보도를 기반으로 이슈 쟁점을 해설하는 문서를 생성합니다.</p>
      </div>

      <form action={createBriefing} className="space-y-10 bg-white p-8 rounded-2xl border border-line-default shadow-sm">
        
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
              </Select>
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">URL 슬러그 (고유 영문) <span className="text-red-500">*</span></label>
              <Input name="canonical_slug" placeholder="e.g. goyang-cityhall" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-body-sm font-semibold mb-2">브리핑 제목 (H1) <span className="text-red-500">*</span></label>
              <Input name="title" placeholder="고양시청 원안 존치, 왜 중요한가?" required />
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">이슈 주제 <span className="text-red-500">*</span></label>
              <Select name="issue_topic" required>
                <option value="경기 교통">경기 교통</option>
                <option value="경기 경제">경기 경제</option>
                <option value="경기 복지">경기 복지</option>
                <option value="투명 행정">투명 행정</option>
                <option value="기타 현안">기타 현안</option>
              </Select>
            </div>
          </div>
        </section>

        {/* Article Source */}
        <section>
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">기사 출처 (Primary Source)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="block text-body-sm font-semibold mb-2">원문 기사 제목 <span className="text-red-500">*</span></label>
              <Input name="primary_source_title" placeholder="기사 헤드라인 원문" required />
            </div>
            <div className="md:col-span-3">
              <label className="block text-body-sm font-semibold mb-2">기사 URL <span className="text-red-500">*</span></label>
              <Input type="url" name="primary_source_url" placeholder="https://..." required />
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2">매체명 <span className="text-red-500">*</span></label>
              <Input name="publisher" placeholder="예: 중부일보" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-body-sm font-semibold mb-2">기사 발행일 <span className="text-red-500">*</span></label>
              <Input type="date" name="source_published_date" required />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section>
          <h2 className="text-h3 mb-6 border-b border-line-default pb-2">해설 본문</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-body-sm font-semibold mb-2">브리핑 요약 (Summary - SEO Description) <span className="text-red-500">*</span></label>
              <Textarea name="summary" placeholder="이슈의 핵심을 2~3줄로 요약합니다." required className="min-h-[80px]" />
            </div>
            
            <div className="space-y-4 p-4 bg-surface-soft rounded-xl border border-line-default">
              <label className="block text-body-sm font-semibold">핵심 쟁점 3가지 (Takeaways)</label>
              <Input name="key_takeaway_1" placeholder="쟁점 1" />
              <Input name="key_takeaway_2" placeholder="쟁점 2" />
              <Input name="key_takeaway_3" placeholder="쟁점 3" />
            </div>

            <div>
              <label className="block text-body-sm font-semibold mb-2">해설 본문 (Body) <span className="text-red-500">*</span></label>
              <Textarea name="body" placeholder="자세한 해설을 자연어로 작성합니다. 추후 WYSIWYG 에디터로 확장 가능합니다." required className="min-h-[200px]" />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4 pt-6 border-t border-line-default">
          <Link href="/admin/issues">
            <Button type="button" variant="tertiary" className="px-8">취소</Button>
          </Link>
          <Button type="submit" variant="primary" className="px-12">저장하기</Button>
        </div>
      </form>
    </div>
  );
}

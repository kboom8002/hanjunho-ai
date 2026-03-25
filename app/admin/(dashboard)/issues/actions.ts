'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteBriefing(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('issue_briefings').delete().eq('id', id);
  if (error) {
    console.error("Delete error:", error);
    throw new Error(error.message);
  }
  revalidatePath('/admin/issues');
  revalidatePath('/issues');
}

export async function createBriefing(formData: FormData) {
  const supabase = createClient();

  const data = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    body: formData.get('body') as string,
    primary_source_title: formData.get('primary_source_title') as string,
    primary_source_url: formData.get('primary_source_url') as string,
    publisher: formData.get('publisher') as string,
    source_published_date: (formData.get('source_published_date') as string) + 'T00:00:00Z',
    issue_topic: formData.get('issue_topic') as string,
    canonical_slug: formData.get('canonical_slug') as string,
    public_status: formData.get('public_status') as string,
    key_takeaway_1: formData.get('key_takeaway_1') as string,
    key_takeaway_2: formData.get('key_takeaway_2') as string,
    key_takeaway_3: formData.get('key_takeaway_3') as string,
  };

  const { error } = await supabase.from('issue_briefings').insert([data]);

  if (error) {
    console.error("Create Briefing Error:", error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/issues');
  revalidatePath('/issues');
  redirect('/admin/issues');
}

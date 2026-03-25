'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteCard(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('answer_cards').delete().eq('id', id);
  if (error) {
    console.error("Delete error:", error);
    throw new Error(error.message);
  }
  revalidatePath('/admin/cards');
  revalidatePath('/clearmap');
}

export async function createCard(formData: FormData) {
  const supabase = createClient();

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    policy_domain: formData.get('policy_domain') as string,
    user_query: formData.get('user_query') as string,
    snippet: formData.get('snippet') as string,
    context_impact: formData.get('context_impact') as string,
    canonical_slug: formData.get('canonical_slug') as string,
    public_status: formData.get('public_status') as string,
    action_plan_1_title: formData.get('action_plan_1_title') as string,
    action_plan_1_body: formData.get('action_plan_1_body') as string,
    action_plan_2_title: formData.get('action_plan_2_title') as string,
    action_plan_2_body: formData.get('action_plan_2_body') as string,
    action_plan_3_title: formData.get('action_plan_3_title') as string,
    action_plan_3_body: formData.get('action_plan_3_body') as string,
  };

  const { error } = await supabase.from('answer_cards').insert([data]);

  if (error) {
    console.error("Create Card Error:", error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/cards');
  revalidatePath('/clearmap');
  redirect('/admin/cards');
}

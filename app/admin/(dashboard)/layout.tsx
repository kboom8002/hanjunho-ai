import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const handleLogout = async () => {
    'use server';
    const sb = createClient();
    await sb.auth.signOut();
    redirect('/admin/login');
  };

  return (
    <div className="flex h-screen bg-surface-soft overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-line-default flex flex-col shrink-0">
        <div className="p-6 border-b border-line-default">
          <Link href="/admin"><h2 className="text-h3 text-brand-700">Hanjunho.ai CMS</h2></Link>
        </div>
        
        <div className="p-4 border-b border-line-default">
          <p className="text-caption text-neutral-500 mb-1">Signed in as</p>
          <p className="text-body-sm font-semibold text-neutral-900 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link href="/admin/cards" className="block px-4 py-2 hover:bg-brand-050 hover:text-brand-700 rounded-lg text-body font-medium transition-colors">Answer Cards</Link>
          <Link href="/admin/issues" className="block px-4 py-2 hover:bg-brand-050 hover:text-brand-700 rounded-lg text-body font-medium transition-colors">Issue Briefings</Link>
          <Link href="/admin/fact-check" className="block px-4 py-2 hover:bg-brand-050 hover:text-brand-700 rounded-lg text-body font-medium transition-colors">Fact Checks</Link>
          <Link href="/admin/profiles" className="block px-4 py-2 hover:bg-brand-050 hover:text-brand-700 rounded-lg text-body font-medium transition-colors">Profiles</Link>
        </nav>
        
        <div className="p-4 border-t border-line-default">
          <form action={handleLogout}>
            <Button type="submit" variant="secondary" className="w-full">로그아웃</Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-surface-muted bg-opacity-50">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

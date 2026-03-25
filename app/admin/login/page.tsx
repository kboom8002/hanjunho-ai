import { login } from './actions'
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-line-default p-8">
        <div className="text-center mb-8">
          <h1 className="text-h2 text-brand-900 mb-2">Hanjunho.ai</h1>
          <p className="text-body text-neutral-500">운영진 관리자 대시보드 로그인</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-body-sm font-semibold text-neutral-700 mb-2" htmlFor="email">이메일</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-line-default focus:outline-none focus:ring-2 focus:ring-brand-700/20 text-body bg-surface-soft"
              placeholder="admin@hanjunho.ai"
            />
          </div>
          <div>
            <label className="block text-body-sm font-semibold text-neutral-700 mb-2" htmlFor="password">비밀번호</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-line-default focus:outline-none focus:ring-2 focus:ring-brand-700/20 text-body bg-surface-soft"
            />
          </div>
          <Button formAction={login} variant="primary" className="w-full py-4 text-body-lg">
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}

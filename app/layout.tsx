import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "한준호 경기도지사 후보 | 정책·이슈 답변·팩트체크 공식 플랫폼",
  description: "경기도지사 후보 한준호의 교통, 일자리, 주거, 돌봄, 교육, 행정 혁신 공약을 질문형으로 확인하세요. 핵심 이슈 답변, 정책 근거, 팩트체크를 한곳에서 제공합니다.",
  openGraph: {
    title: "한준호 | 경기도민의 질문에 답하는 공식 정책·이슈 플랫폼",
    description: "출퇴근, 청년 일자리, 주거, 돌봄, 교육, 행정 혁신까지. 경기도민이 가장 궁금한 질문에 한준호 후보의 정책과 근거를 한곳에서 확인하세요.",
  }
};

const navigation = [
  { name: "Ask AI", href: "/" },
  { name: "5대 비전 클리어맵", href: "/clearmap" },
  { name: "이슈브리핑", href: "/issues" },
  { name: "팩트체크", href: "/fact-check" },
  { name: "팩트 인증센터", href: "/trust-center" },
  { name: "투표 안내", href: "/vote-guide" },
  { name: "한준호", href: "/hanjunho" },
];

const footerNavigation = [
  ...navigation.filter(n => n.name !== "Ask AI"),
  { name: "질문·제안·제보", href: "/contact" },
  { name: "현장 기록", href: "/gallery" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b border-line-default bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center text-brand-700 font-bold text-lg">
              hanjunho.ai
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-body-sm text-neutral-900 font-medium hover:text-brand-700 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center md:hidden">
              <Button variant="tertiary" size="sm">Menu</Button>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full mx-auto">
          {children}
        </main>

        <footer className="bg-brand-900 py-12 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <span className="text-xl font-bold">hanjunho.ai</span>
                <p className="mt-4 text-caption text-neutral-300 max-w-xs">
                  경기도민의 질문에 답하는 공식 정책·이슈 플랫폼
                </p>
              </div>
              <div className="col-span-2 md:col-span-2">
                <ul className="grid grid-cols-2 gap-4">
                  {footerNavigation.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-body-sm text-neutral-300 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

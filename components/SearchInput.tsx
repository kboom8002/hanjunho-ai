'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, SyntheticEvent } from 'react';

export default function SearchInput({ 
  placeholder = "질문이나 키워드로 찾아보세요", 
  initialValue = "",
  actionUrl = "/clearmap"
}: { 
  placeholder?: string;
  initialValue?: string;
  actionUrl?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue || searchParams.get('q') || '');

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }
    // Delete pagination or specific filters if necessary
    // params.delete('category'); 
    router.push(`${actionUrl}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full relative">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[60px] pl-6 pr-[120px] rounded-full border border-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700/20 shadow-sm text-body text-neutral-900 bg-white"
      />
      <Button type="submit" variant="primary" className="absolute right-2 top-2 rounded-full h-[44px] px-6">
        검색
      </Button>
    </form>
  );
}

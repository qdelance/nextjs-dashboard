import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/artworks/table';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchArtworkPages } from "@/app/lib/data-collcon";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const {nbArtworks, nbPages} = await fetchArtworkPages();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>CollCon Artworks</h1>
      </div>
      <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table currentPage={currentPage} count={nbArtworks} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={nbPages} />
      </div>
    </div>
  );
}
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Artwork from "@/app/ui/artworks/artwork";
import { fetchArtwork } from "@/app/lib/data-collcon";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const artwork = await fetchArtwork(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Artworks', href: '/dashboard/artworks' },
          {
            label: 'Artwork',
            href: `/dashboard/artworks/${id}`,
            active: true,
          },
        ]}
      />
      <Artwork artwork={artwork} />
    </main>
  );
}
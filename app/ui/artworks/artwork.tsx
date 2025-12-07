'use client'

import { fetchArtwork } from '@/app/lib/data-collcon';
import { useRouter } from "next/navigation";
import { Artwork} from "@/app/lib/definitions-collcon";


export default async function Artwork({
  artwork
}: {
  artwork: Artwork;
}) {
  const router = useRouter()

  return (
    <div className="mt-6 flow-root">
      <p>
        <strong>Title :</strong> {artwork.title}
      </p>
      <p>
        <strong>N° gestion :</strong> {artwork.object_number2}
      </p>
      <p>
        <strong>N° inventaire :</strong> {artwork.object_number_unparsed}
      </p>
      <p>
        <strong>Classification :</strong> {artwork.classification}
      </p>
      <p>
      <strong>Description :</strong> {artwork.description}
        {/*
        Safely inserting sanitized HTML into the component
        TODO dompurify
        https://docureacten.github.io/Rendering/6-4-Safely%20Using%20Raw%20HTML
        */}
        <span dangerouslySetInnerHTML={{ __html: artwork.description }} />
      </p>

      <button
        type="button"
        className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        onClick={() => router.back()}>
        Retour
      </button>
    </div>
  );
}

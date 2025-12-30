'use client'

import { useRouter } from "next/navigation";
import { Artwork } from "@/app/lib/definitions-collcon";


export default async function ArtworkPage({
  artwork
}: {
  artwork: Artwork;
}) {
  const router = useRouter()

  return (
    <div className="mt-6 flow-root">
      <h1 className="text-5xl font-bold text-heading"><strong>{artwork.titles[0].type} : </strong>{artwork.titles[0].title}</h1>

      {
        artwork.titles.slice(1).map((title) => (
          <p><strong>{title.type}</strong> : {title.title}</p>
        ))
      }
      <img
        src={`${artwork.img_url}&width=400`}
        className=""
        width={400}
        height={400}
        alt="Artwork main picture"
      />

      <div className="grid grid-cols-6 gap-4">
      {
        artwork.extra_images.map((image) => (
          <img
            src={`${image.url}&width=200`}
            className=""
            width={200}
            height={200}
            alt="Artwork main picture"
          />
        ))
      }
      </div>

      <h2 className="text-4xl font-bold text-heading">Champs de base</h2>

      <p>
        <strong>N° gestion :</strong> {artwork.numero_gestion}
      </p>
      <p>
        <strong>N° inventaire :</strong> {artwork.numero_inventaire}
      </p>
      <p>
        <strong>Matériaux et techniques :</strong> {artwork.materiaux_techniques}
      </p>
      <p>
        <strong>Classification :</strong> {artwork.classification}
      </p>
      <p>

      <h2 className="text-4xl font-bold text-heading">Détails</h2>

      <p>
        <strong>Description :</strong>
        {/*
        Safely inserting sanitized HTML into the component
        TODO dompurify
        https://docureacten.github.io/Rendering/6-4-Safely%20Using%20Raw%20HTML
        */}
        <span dangerouslySetInnerHTML={{ __html: artwork.detail.description }} />
      </p>

      <p>
        <strong>Usage :</strong> {artwork.detail.usage}
        <span dangerouslySetInnerHTML={{ __html: artwork.detail.usage }} />
      </p>

      <p><strong>Exposé ? </strong> {artwork.detail.expose ? 'Oui': 'Non'}</p>

      {
        artwork.detail.expose &&
        <p>
          <strong>Lieu d'exposition :</strong> {artwork.detail.lieu_exposition}
        </p>
      }

      <p>
        <strong>Matériaux et techniques :</strong> {artwork.materiaux_techniques}
      </p>
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

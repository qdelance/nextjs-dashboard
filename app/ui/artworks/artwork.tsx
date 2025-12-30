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

      {/*
        artwork.titles.slice(1).map((title, idx) => (
          <p key={`t-${idx}`}><strong>{title.type}</strong> : {title.title}</p>
        ))
      */}
      <img
        src={`${artwork.img_url}&width=400`}
        className=""
        width={400}
        height={400}
        alt="Artwork main picture"
      />

      <div className="grid grid-cols-6 gap-4">
      {
        artwork.extra_images.map((image, idx) => (
          <img
            key={`image-${idx}`}
            src={`${image.url}&width=200`}
            className=""
            width={200}
            height={200}
            alt="Artwork main picture"
          />
        ))
      }
      </div>

      <h2 className="text-4xl font-bold text-heading">1. Présentation globale</h2>

      {
        artwork.titles.map((title, idx) => (
          <p key={`title-${idx}`}><strong>{title.type} : </strong>{title.title}</p>
        ))
      }

      <p><strong>Date : </strong>{artwork.date}</p>

      {
        artwork.lieu_exposition &&
        <p>
          <strong>Lieu d'exposition :</strong> {artwork.lieu_exposition}
        </p>
      }

      <p><strong>Exposé ? </strong>{artwork.expose ? 'Oui': 'Non'}</p>
      <p>
        <strong>N° inventaire : </strong>{artwork.numero_inventaire}
      </p>
      <p>
        <strong>N° gestion : </strong>{artwork.numero_gestion}
      </p>
      <p>
        <strong>Matériaux et techniques : </strong>{artwork.materiaux_techniques}
      </p>
      {/*<p>
        <strong>Classification :</strong> {artwork.classification}
      </p>*/}

      <p>
        <strong>Description : </strong>
        {/*
        Safely inserting sanitized HTML into the component
        TODO dompurify
        https://docureacten.github.io/Rendering/6-4-Safely%20Using%20Raw%20HTML
        */}
        <span dangerouslySetInnerHTML={{ __html: artwork.description }} />
      </p>

      <p>
        <strong>Usage : </strong>{artwork.usage}
        <span dangerouslySetInnerHTML={{ __html: artwork.usage }} />
      </p>

      <h2 className="text-4xl font-bold text-heading">2. Détails de l'oeuvre</h2>

      <p>
        <strong>Matériaux et techniques : </strong>{artwork.materiaux_techniques}
      </p>

      <p>
        <strong>Dimensions : </strong>{artwork.dimensions}
      </p>

      <p>
        <strong>Signature : </strong>{artwork.signature}
      </p>

      <p>
        <strong>Inscription : </strong>{artwork.inscription}
      </p>


      <h3 className="text-2xl font-bold text-heading">Provenance</h3>

      <p>
        <strong>Anciens numéros : </strong>
        {
          artwork.anciens_numeros?.map((ancien_numero, idx) => (
            <p key={`num-${idx}`}>{ancien_numero.description} : {ancien_numero.numero}</p>
          ))
        }
      </p>

      <h2 className="text-4xl font-bold text-heading">3. Personnes (en attendant mieux)</h2>

      <h3 className="text-2xl font-bold text-heading">ConX</h3>

      <p>
        {
          artwork.people?.map((person, idx) => (
            <p key={`person-${idx}`}><strong>{person.role} : </strong>
              {person.display_name}
              {person.display_date && ` (${person.display_date})`}<br/>
              Debug role ID={person.role_id} role type ID={person.role_type_id}
            </p>
          ))
        }
      </p>

      <h3 className="text-2xl font-bold text-heading">ConXother</h3>

      <p>
        {
          artwork.people2?.map((person, idx) => (
            <p key={`person2-${idx}`}><strong>{person.role} : </strong>
              {person.display_name}
              {person.display_date && ` (${person.display_date})`}<br/>
              Debug role ID={person.role_id} role type ID={person.role_type_id}
            </p>
          ))
        }
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

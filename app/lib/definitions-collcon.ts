// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// Requête search globale
/*action
  :
  "get"
command
  :
  "facets"
fields
  :
  "/Record/mqb_thesterm/ThesTerms/CN:1-200:regexp(^MQY..?.?.?$)"
query
  :
  "and(/Record/Title/Title,/Record/Description,/Record/ObjectNumber,/Record/ObjectNumberUnparsed,/Record/ObjectNumber2,/Record/ObjAltnum/Altnum,/Record/ConXall/AlphaSort,/Record/mqb_thesterm/TermPath,/Record/Collection/Name,/Record/Evenement/Evenement,/Record/Evenement/Description=[71.1958.13.1])"
responseformat
  :
  "json"
sort
  :
  "alpha"*/

// ObjAltnum
export type object_altnum = {
  description: string; // Description
  altnum: string; // Altnum
}

export type Artwork = {
  id: string;
  titles: ArtworkTitle[],
  source: 'icono' | 'objects';
  classification: string;

  // 1. Présentation globale
  image2: string;
  img_url: string;
  extra_images: ArtworkImage[],
  date: string,
  lieu_exposition?: string
  expose: boolean,
  numero_gestion: string;
  numero_inventaire?: string;
  description: string,
  usage: string,

  // 2. Détail de l'oeuvre
  materiaux_techniques: string,
  dimensions: string,
  signature: string,
  inscription: string,
  obj_altnum?: object_altnum[];
};

export type ArtworkTitle = {
  title: string,
  type: string,
}

export type ArtworkImage = {
  image2: string,
  url: string,
}
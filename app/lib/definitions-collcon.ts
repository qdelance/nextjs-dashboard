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
  id: string; // ccObjectNumber
  numero_gestion: string;
  numero_inventaire?: string;
  obj_altnum?: object_altnum[];
  title_type: string;
  title: string;
  materiaux_techniques: string,
  classification: string;
  source: 'icono' | 'objects';
  image2: string;
  img_url: string;
  detail: ArtworkDescription
};

export type ArtworkDescription = {
  description: string,
  usage: string,
  expose: boolean,
  lieu_exposition?: string
}

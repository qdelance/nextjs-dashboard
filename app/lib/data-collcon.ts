import { AncienNumero, Artwork, ArtworkImage, ArtworkTitle } from "@/app/lib/definitions-collcon";
import { forEach } from "eslint-config-next";

export async function fetchArtwork(
  artworkId: string,
) {

  try {
    const response = await fetch(`https://collections.quaibranly.fr/ccProxy.ashx?action=get&command=search&query=and(Record/ccObjectID=${artworkId})&responseformat=json`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log('QDE fetchArtwork', data, data.records.length);

    const record = data.records.record.data.Record;

    return getArtworkFromJSON(record);

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredArtworks(
  currentPage: number,
) {

  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = currentPage * ITEMS_PER_PAGE;
  try {
    const response = await fetch(`https://collections.quaibranly.fr/ccProxy.ashx?action=get&command=search&query=and(*=*;or(/Record/source=objects;/Record/source=icono))&range=${start}-${end}&responseformat=json`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log('QDE fetchFilteredArtworks', data);

    if (Array.isArray(data.records.record)) {
      const artworks: Artwork[] = data.records.record.map((item: any) => {
        const record = item.data.Record;

        return getArtworkFromJSON(record);
      });
      return artworks;
    } else {
      let arworks: Artwork[] = [];
      const arwork = getArtworkFromJSON(data.records.record);
      arworks.push(arwork);
      return arworks;
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchArtworkPages() {
  try {
    const response = await fetch(`https://collections.quaibranly.fr/ccProxy.ashx?action=get&command=search&query=and(*=*;or(/Record/source=objects;/Record/source=icono))&range=1-10&responseformat=json`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log('QDE fetchArtworkPages', data);
    return {
      nbArtworks : data.request.count,
      nbPages: Math.ceil(data.request.count / ITEMS_PER_PAGE)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

function getArtworkFromJSON(record: any): Artwork {
  let image2 = record.source == 'icono' ? record.IImages?.image2 : record.Image?.image2;
  const url = getImageURLFromImage2Field(image2);

  let titles: ArtworkTitle[] = [];
  if (Array.isArray(record.Title)) {
    for(const title of record.Title) {
      titles.push({
        title: title.Title,
        type: title.TitleType,
      })
    }
  } else {
    titles.push({
      title: record.Title.Title,
      type: record.Title.TitleType,
    })
  }

  let extra_images: ArtworkImage[] = []
  if (record.ImagesMore) {
    if (Array.isArray(record.ImagesMore)) {
      for (const image of record.ImagesMore) {
        extra_images.push({
          image2: image.image2,
          url: getImageURLFromImage2Field(image.image2),
        })
      }
    } else {
      extra_images.push({
        image2: record.ImagesMore.image2,
        url: getImageURLFromImage2Field(record.ImagesMore.image2),
      })
    }
  }

  let anciens_numeros: AncienNumero[] = [];
  if (record.ObjAltnum) {
    if (Array.isArray(record.ObjAltnum)) {
      for (const obj of record.ObjAltnum) {
        anciens_numeros.push({
          description: obj.Description,
          numero: obj.Altnum,
        })
      }
    } else {
      anciens_numeros.push({
        description: record.ObjAltnum.Description,
        numero: record.ObjAltnum.Altnum,
      })
    }
  }


  return {
    id: record.ccObjectID,
    titles: titles,
    source: record.source,
    classification: record.Classification,
    // 1. Présentation globale
    image2,
    img_url: url,
    extra_images: extra_images,
    date: record.Dated,
    lieu_exposition: record.ObjLocation?.LocationString,
    expose: record.filterexpose?.filterexpose == 'expose', // A tester
    numero_gestion: record.ObjectNumber2,
    numero_inventaire: record.ObjectNumber,
    description: record.Description,
    usage: record.Creditline,
    // 2. Détail de l'oeuvre
    materiaux_techniques: record.Medium,
    dimensions: record.Dimensions,
    signature: record.Signed,
    inscription: record.Inscribed,
    anciens_numeros
  };
}

function getImageURLFromImage2Field(image2: string): string {
    if (image2 == null) {
      image2 = 'noimage/pas-dimage-white.png';
    } else if (image2.startsWith('Icono\\iconotheque\\')) {
      image2 = image2.replace('Icono\\iconotheque\\', 'img/iconotheque\\');
    } else if (image2.startsWith('\\vm-iconopat\\ICONOTHEQUE\\')) {
      image2 = image2.replace('\\vm-iconopat\\ICONOTHEQUE\\', 'img/ICONOTHEQUE\\');
    } else if (image2.startsWith('Icono\\iconomedia\\')) {
      image2 = image2.replace('Icono\\iconomedia\\', 'img/iconomedia\\');
    } else if (image2.startsWith('Objets\\')) {
      image2 = image2.replace('Objets\\', 'img/media\\');
    } else {
      image2 = 'noimage/pas-dimage-white.png';
    }
    return `https://collections.quaibranly.fr/ccImageProxy.ashx?filename=${image2}`;
}
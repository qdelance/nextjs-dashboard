import { Artwork } from "@/app/lib/definitions-collcon";

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

    // gruik
    let image2: string;
    if (record.source == 'icono') {
      image2 = record.IImages?.image2 ?? 'noimage/pas-dimage-white.png';
      if (image2.startsWith('Icono\\iconotheque\\')) {
        image2 = image2.replace('Icono\\iconotheque\\', 'img/iconotheque\\');
      } else if (image2.startsWith('\\vm-iconopat\\ICONOTHEQUE\\')) {
        image2 = image2.replace('\\vm-iconopat\\ICONOTHEQUE\\', 'img/ICONOTHEQUE\\');
      } else if (image2.startsWith('Icono\\iconomedia\\')) {
        image2 = image2.replace('Icono\\iconomedia\\', 'img/iconomedia\\');
      }
    } else {
      image2 = record.Image?.image2 ?? 'noimage/pas-dimage-white.png';
      if (image2.startsWith('Objets\\')) {
        image2 = image2.replace('Objets\\', 'img/media\\');
      }
    }
    let url = `https://collections.quaibranly.fr/ccImageProxy.ashx?filename=${image2}`;

    const artwork: Artwork = {
      id: record.ccObjectID,
      object_number2: record.ObjectNumber2,
      object_number_unparsed: record.ObjectNumberUnparsed ?? null,
      title: record.SortTitle,
      description: record.Description,
      classification: record.Classification,
      source: record.source,
      image2,
      img_url: url,
    };

    return artwork;

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
    const response = await fetch(`https://collections.quaibranly.fr/ccProxy.ashx?action=get&command=search&query=or(/Record/source=objects;/Record/source=icono)&range=${start}-${end}&responseformat=json`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log('QDE fetchFilteredArtworks', data);

    const artworks: Artwork[] = data.records.record.map((item: any) => {
      const record = item.data.Record;

      // gruik
      let image2: string;
      if (record.source == 'icono') {
        image2 = record.IImages?.image2 ?? 'noimage/pas-dimage-white.png';
        if (image2.startsWith('Icono\\iconotheque\\')) {
          image2 = image2.replace('Icono\\iconotheque\\', 'img/iconotheque\\');
        } else if (image2.startsWith('\\vm-iconopat\\ICONOTHEQUE\\')) {
          image2 = image2.replace('\\vm-iconopat\\ICONOTHEQUE\\', 'img/ICONOTHEQUE\\');
        } else if (image2.startsWith('Icono\\iconomedia\\')) {
          image2 = image2.replace('Icono\\iconomedia\\', 'img/iconomedia\\');
        }
      } else {
        image2 = record.Image?.image2 ?? 'noimage/pas-dimage-white.png';
        if (image2.startsWith('Objets\\')) {
          image2 = image2.replace('Objets\\', 'img/media\\');
        }
      }

      let url = `https://collections.quaibranly.fr/ccImageProxy.ashx?filename=${image2}`;

      return {
        id: record.ccObjectID,
        object_number2: record.ObjectNumber2,
        object_number_unparsed: record.ObjectNumberUnparsed ?? null,
        title: record.SortTitle,
        description: record.Descripton,
        classification: record.Classification,
        source: record.source,
        image2,
        img_url: url
    }});
    return artworks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

// 10 items per page in SWAPI API
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

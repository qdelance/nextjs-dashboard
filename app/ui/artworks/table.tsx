import { fetchFilteredArtworks } from '@/app/lib/data-collcon';
import Link from "next/link";

export default async function Table({
  currentPage,
  count,
}: {
  currentPage: number;
  count: number;
}) {
  const artworks = await fetchFilteredArtworks(currentPage);

  return (
    <>
    <p>{count} résultats</p>
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {artworks?.map((artwork) => (
              <div
                key={artwork.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{artwork.titles[0].type} : {artwork.titles[0].title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{artwork.source}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {artwork.numero_inventaire}
                    </p>
                    <p>{artwork.classification}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Image
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Source
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  N° inventaire
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  N° gestion
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Classification
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {artworks?.map((artwork) => (
                <tr
                  key={artwork.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/artworks/${artwork.id}`}
                        className="rounded-md border p-2 hover:bg-gray-100"
                      ><p>{artwork.titles[0].type} : {artwork.titles[0].title}</p>
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {artwork.image2}
                    <img
                      src={`${artwork.img_url}&width=200`}
                      className=""
                      width={200}
                      height={200}
                      alt="Artwork main picture"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {artwork.source}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {artwork.numero_inventaire}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {artwork.numero_gestion}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {artwork.classification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

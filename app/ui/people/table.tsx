import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredPeople } from '@/app/lib/data-swapi';

export default async function Table({
  currentPage,
}: {
  currentPage: number;
}) {
  const people = await fetchFilteredPeople(currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {people?.map((person: any) => (
              <div
                key={person.name}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{person.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{person.birth_year}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {person.gender}
                    </p>
                    <p>{formatDateToLocal(person.created)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Birthyear
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Gender
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {people?.map((person: any) => (
                <tr
                  key={person.name}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{person.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {person.birth_year}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {person.gender}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(person.created)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

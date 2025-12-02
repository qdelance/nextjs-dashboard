export async function fetchFilteredPeople(
  currentPage: number,
) {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log('QDE fetchPeoplePages', data);
    return data.results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

// 10 items per page in SWAPI API
const ITEMS_PER_PAGE = 10;
export async function fetchPeoplePages() {
  try {
    const response = await fetch(`https://swapi.dev/api/people/`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log('QDE fetchPeoplePages', data);
    return Math.ceil(data.count / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

/*export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}*/


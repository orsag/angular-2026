import { http, HttpResponse, delay } from 'msw';

// 1. Separate the data for better maintainability
export const MOCK_VANS = [
  {
    id: 1,
    brand: 'Mitsubishi',
    model: 'Delica D:5',
    cargoCapacity: 800,
    category: '4WD MPV',
    seats: 7,
  },
  {
    id: 2,
    brand: 'Renault',
    model: 'Trafic Combi',
    cargoCapacity: 1000,
    category: 'Van',
    seats: 9,
  },
  {
    id: 3,
    brand: 'Dacia',
    model: 'Jogger',
    cargoCapacity: 708,
    category: 'Wagon',
    seats: 7,
  },
  {
    id: 4,
    brand: 'Toyota',
    model: 'Proace City Verso L2',
    cargoCapacity: 1050,
    category: 'Van',
    seats: 7,
  },
  {
    id: 5,
    brand: 'Volkswagen',
    model: 'Multivan T7',
    cargoCapacity: 763,
    category: 'Premium MPV',
    seats: 7,
  },
  {
    id: 6,
    brand: 'Mercedes-Benz',
    model: 'V-Class',
    cargoCapacity: 1030,
    category: 'Premium MPV',
    seats: 8,
  },
  { id: 7, brand: 'Ford', model: 'Tourneo Custom', cargoCapacity: 1200, category: 'Van', seats: 9 },
  {
    id: 8,
    brand: 'Hyundai',
    model: 'Staria',
    cargoCapacity: 831,
    category: 'Premium MPV',
    seats: 7,
  },
  {
    id: 9,
    brand: 'Citroen',
    model: 'Berlingo XL',
    cargoCapacity: 1050,
    category: 'Van',
    seats: 7,
  },
  {
    id: 10,
    brand: 'Nissan',
    model: 'Serena e-Power',
    cargoCapacity: 601,
    category: 'JDM MPV',
    seats: 7,
  },
  {
    id: 11,
    brand: 'Honda',
    model: 'Stepwgn Spada',
    cargoCapacity: 750,
    category: 'JDM MPV',
    seats: 8,
  },
  {
    id: 12,
    brand: 'Toyota',
    model: 'Alphard',
    cargoCapacity: 610,
    category: 'Premium MPV',
    seats: 7,
  },
];

export const handlers = [
  // NEW ENDPOINT: Get everything
  http.get('/api/vans/all', async () => {
    await delay(600); // Realistic feel
    return HttpResponse.json(MOCK_VANS);
  }),

  // EXISTING ENDPOINT: Search/Filter
  http.get('/api/vans', async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('q')?.toLowerCase() || '';

    // 2. Simulate real network latency (e.g., 500ms)
    await delay(500);

    // 3. Logic to filter by brand OR model
    const filteredVans = MOCK_VANS.filter(
      (van) =>
        van.brand.toLowerCase().includes(searchTerm) ||
        van.model.toLowerCase().includes(searchTerm),
    );

    // 4. Return the response
    return HttpResponse.json(filteredVans);
  }),
];

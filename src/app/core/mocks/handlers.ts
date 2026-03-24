import { http, HttpResponse, delay } from 'msw';
import { VanVehicle } from '@types';

// 1. Separate the data for better maintainability
export let MOCK_VANS = [
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
    category: 'Luxury Van',
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
    category: 'Luxury MPV',
    seats: 8,
  },
  { id: 7, brand: 'Ford', model: 'Tourneo Custom', cargoCapacity: 1200, category: 'Van', seats: 9 },
  {
    id: 8,
    brand: 'Hyundai',
    model: 'Staria',
    cargoCapacity: 831,
    category: 'Luxury MPV',
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
    category: 'Luxury MPV',
    seats: 7,
  },
];

export const handlers = [
  // --- GET ALL ---
  http.get('/api/vans/all', async () => {
    await delay(300);
    return HttpResponse.json(MOCK_VANS);
  }),

  // --- POST (Create) ---
  http.post('/api/vans', async ({ request }) => {
    const newVan = (await request.json()) as VanVehicle;
    newVan.id = Math.floor(Math.random() * 10000); // Simulate DB ID generation

    MOCK_VANS.push(newVan); // "Save" to our mock DB

    return HttpResponse.json(newVan, { status: 201 });
  }),

  // --- DELETE ---
  http.delete('/api/vans/:id', async ({ params }) => {
    const { id } = params;

    // Remove from our array
    MOCK_VANS = MOCK_VANS.filter((v) => v.id !== Number(id));

    // Return 204 No Content (Standard for successful delete)
    return new HttpResponse(null, { status: 204 });
  }),

  // --- PATCH (Partial Update) ---
  http.patch('/api/vans/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<VanVehicle>;

    const index = MOCK_VANS.findIndex((v) => v.id === Number(id));
    if (index > -1) {
      MOCK_VANS[index] = { ...MOCK_VANS[index], ...updates };
      return HttpResponse.json(MOCK_VANS[index]);
    }

    return new HttpResponse(null, { status: 404 });
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

import { http, HttpResponse, delay } from 'msw';
import { VanVehicle } from '@types';
import { MOCK_VANS as INITIAL_VANS } from './mock-data';
import { User } from '@types';

let activeVans = [...INITIAL_VANS];
// Your sample mocked user
const MOCK_USER: User = {
  id: crypto.randomUUID(),
  email: 'dev@example.com',
  name: 'Your Name',
  imageUrl: 'assets/images/avatar.png',
};

// Simulated "Session Storage" in memory
let currentUser: User | null = null;

export const handlers = [
  // --- GET ALL ---
  http.get('/api/vans/all', async () => {
    await delay(300);
    return HttpResponse.json(activeVans);
  }),

  // --- GET ID ---
  http.get('/api/vans/:id', async ({ params }) => {
    const { id } = params;
    await delay(300);

    const van = activeVans.find((v) => v.id === Number(id));

    if (!van) {
      return new HttpResponse(null, { status: 404, statusText: 'Van not found' });
    }

    return HttpResponse.json(van);
  }),

  // --- POST (Create) ---
  http.post('/api/vans', async ({ request }) => {
    const newVan = (await request.json()) as VanVehicle;
    newVan.id = Math.floor(Math.random() * 10000); // Simulate DB ID generation

    activeVans.push(newVan); // "Save" to our mock DB

    return HttpResponse.json(newVan, { status: 201 });
  }),

  // --- DELETE ---
  http.delete('/api/vans/:id', async ({ params }) => {
    const { id } = params;

    // Remove from our array
    activeVans = activeVans.filter((v) => v.id !== Number(id));

    // Return 204 No Content (Standard for successful delete)
    return new HttpResponse(null, { status: 204 });
  }),

  // --- PATCH (Partial Update) ---
  http.patch('/api/vans/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<VanVehicle>;

    const index = activeVans.findIndex((v) => v.id === Number(id));
    if (index > -1) {
      activeVans[index] = { ...activeVans[index], ...updates };
      return HttpResponse.json(activeVans[index]);
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
    const filteredVans = activeVans.filter(
      (van) =>
        van.brand.toLowerCase().includes(searchTerm) ||
        van.model.toLowerCase().includes(searchTerm),
    );

    // 4. Return the response
    return HttpResponse.json(filteredVans);
  }),

  // LOGIN: Simulates a successful login
  http.post('/api/user/login', async ({ request }) => {
    const credentials = (await request.json()) as any;
    // console.log('Incoming Credentials:', credentials);

    // Simplified logic: accept any login for development
    if (credentials.email && credentials.pass) {
      currentUser = MOCK_USER;
      return HttpResponse.json(currentUser, { status: 200 });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // LOGOUT: Clears the session
  http.post('/api/user/logout', () => {
    currentUser = null;
    return new HttpResponse(null, { status: 204 });
  }),

  // GET CURRENT USER: Useful for app initialization
  http.get('/api/user/me', () => {
    if (!currentUser) {
      return new HttpResponse(null, { status: 401 });
    }
    return HttpResponse.json(currentUser);
  }),
];

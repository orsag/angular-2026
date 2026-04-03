import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { isDevMode } from '@angular/core';
import { App } from './app/app';

// async function prepareApp() {
//   if (isDevMode()) {
//     // We use a dynamic import so the mock code
//     // isn't even bundled in your production build!
//     const { worker } = await import('./app/core/mocks/browser');

//     // 'onUnhandledRequest: "bypass"' ensures that real
//     // assets (CSS, images) aren't blocked by MSW.
//     return worker.start({ onUnhandledRequest: 'bypass' });
//   }
//   return Promise.resolve();
// }

// prepareApp().then(() => {
//   bootstrapApplication(App, appConfig).catch((err) => console.error(err));
// });

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

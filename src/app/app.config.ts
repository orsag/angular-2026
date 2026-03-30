import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import {
  EVENT_MANAGER_PLUGINS,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalHttpErrorInterceptor } from './core/interceptors/global-http-error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { DebounceEventManagerPlugin } from './core/plugins/debounce-event.plugin';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([globalHttpErrorInterceptor, loadingInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark-mode',
        },
      },
    }),
    {
      provide: EVENT_MANAGER_PLUGINS,
      useClass: DebounceEventManagerPlugin,
      multi: true,
    },
  ],
};

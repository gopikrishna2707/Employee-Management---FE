import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,), provideAnimationsAsync(), provideHttpClient(withInterceptors([authInterceptor]))]
};

import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { initializeAutoConnectFactory } from '@app/core/initializer/auto-connect.initializer';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      return initializeAutoConnectFactory(
        inject(AuthenticationService),
        inject(UserService),
        inject(UserStore),
        inject(Router)
      )();
    }),
  ],
};

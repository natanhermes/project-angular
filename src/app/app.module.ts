import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { authHeaderInterceptor } from './core/interceptors/auth-header.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { exceptionInterceptor } from './core/interceptors/exception.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    CoreModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authHeaderInterceptor, loaderInterceptor, exceptionInterceptor]),
      withFetch()
    ),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

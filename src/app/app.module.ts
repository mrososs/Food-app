import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      progressBar: true,
      closeButton: true,
    }),
    SharedModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([tokenInterceptor, apiInterceptor, spinnerInterceptor]),
      withFetch()
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

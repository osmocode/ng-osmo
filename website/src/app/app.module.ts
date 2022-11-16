import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgoLayoutModule } from 'ng-osmo/layout';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgoLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'split-layout',
        loadChildren: () => import('./split-layout/split-layout.module').then(m => m.SplitLayoutModule)
      },
      { path: '**', pathMatch: 'full', redirectTo: 'split-layout'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

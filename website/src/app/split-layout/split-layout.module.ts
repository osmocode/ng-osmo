import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgoSplitLayoutModule } from "ng-osmo/split-layout";
import { SplitLayoutComponent } from "./split-layout.component";


@NgModule({
  imports: [
    CommonModule,
    NgoSplitLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: SplitLayoutComponent
      }
    ])
  ],
  declarations: [
    SplitLayoutComponent
  ]
})
export class SplitLayoutModule { }

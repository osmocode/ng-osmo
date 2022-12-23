import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgoLayoutModule } from "ng-osmo/layout";
import { LayoutComponent } from "./layout.component";


@NgModule({
  imports: [
    CommonModule,
    NgoLayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent
      }
    ])
  ],
  declarations: [
    LayoutComponent
  ]
})
export class LayoutModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgoLayoutHeaderComponent } from "./layout-header.component";
import { NgoLayoutResizerComponent } from "./layout-resizer.component";
import { NgoLayoutComponent } from "./layout.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgoLayoutComponent,
    NgoLayoutResizerComponent,
    NgoLayoutHeaderComponent
  ],
  exports: [
    NgoLayoutComponent,
    NgoLayoutResizerComponent,
    NgoLayoutHeaderComponent
  ]
})
export class NgoLayoutModule { }

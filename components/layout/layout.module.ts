import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgoLayoutResizerComponent } from "./layout-resizer.component";
import { NgoLayoutComponent } from "./layout.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgoLayoutComponent,
    NgoLayoutResizerComponent
  ],
  exports: [
    NgoLayoutComponent,
    NgoLayoutResizerComponent
  ]
})
export class NgoLayoutModule { }

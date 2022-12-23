import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgoSplitAreaDirective } from "./split-area.directive";
import { NgoSplitLayoutComponent } from "./split-layout.component";
import { NgoSplitResizerComponent } from "./split-resizer.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgoSplitLayoutComponent,
    NgoSplitAreaDirective,
    NgoSplitResizerComponent
  ],
  exports: [
    NgoSplitLayoutComponent,
    NgoSplitAreaDirective,
    NgoSplitResizerComponent
  ]
})
export class NgoSplitLayoutModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgoLayoutContainerComponent } from "./layout-container.component";
import { NgoLayoutContent } from "./layout-content.component";
import { NgoLayoutResizerComponent } from "./layout-resizer.component";
import { NgoLayoutTopContainerComponent } from "./layout-top-container.component";
import { NgoLayoutComponent } from "./layout.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgoLayoutComponent,
    NgoLayoutContainerComponent,
    NgoLayoutResizerComponent,
    NgoLayoutContent,
    NgoLayoutTopContainerComponent,
  ],
  exports: [
    NgoLayoutComponent
  ]
})
export class NgoLayoutModule { }

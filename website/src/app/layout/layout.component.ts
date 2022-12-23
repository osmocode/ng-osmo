import { Component } from "@angular/core";

@Component({
  selector: 'app-layout',
  template: `
    <ngo-layout direction="horizontal">
      <ngo-layout direction="vertical" height="20%">
        <ngo-layout width="25%">Box 1</ngo-layout>
        <ngo-layout width="25%">Box 2</ngo-layout>
        <ngo-layout direction="horizontal" width="50%">
          <ngo-layout height="50%">Box 3.1</ngo-layout>
          <ngo-layout height="50%">Box 3.2</ngo-layout>
        </ngo-layout>
      </ngo-layout>
      <ngo-layout height="80%" ngoTitle="Code"></ngo-layout>
    </ngo-layout>

    <ng-template #header>
      <ngo-layout-header ngoTitle="Settings"></ngo-layout-header>
    </ng-template>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}

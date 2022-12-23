import { Component } from "@angular/core";

@Component({
  selector: 'app-split-layout',
  template: `
  <ngo-split-layout direction="vertical">
    <ngo-split-area [size]="50">
      <ngo-split-layout direction="horizontal">
        <ngo-split-area [size]="25">
          <div class="box">Box 1</div>
        </ngo-split-area>
        <ngo-split-area [size]="25">
          <div class="box">Box 2</div>
        </ngo-split-area>
        <ngo-split-area [size]="50">
          <ngo-split-layout direction="vertical">
            <ngo-split-area [size]="50">
              <div class="box">Box 3.1</div>
            </ngo-split-area>
            <ngo-split-area [size]="50">
              <div class="box">Box 3.2</div>
            </ngo-split-area>
          </ngo-split-layout>
        </ngo-split-area>
      </ngo-split-layout>
    </ngo-split-area>
    <ngo-split-area [size]="50">
      <div class="box">Main box</div>
    </ngo-split-area>
  </ngo-split-layout>
  `,
  styleUrls: ['./split-layout.component.scss']
})
export class SplitLayoutComponent {

}

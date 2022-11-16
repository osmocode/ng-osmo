import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";


@Component({
  selector: 'ngo-layout',
  template: `
    <div>Box 1</div>
  `,
  host: {
    class: "ngo-layout"
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgoLayoutComponent { }

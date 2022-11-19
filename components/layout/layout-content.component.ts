import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";


@Component({
  selector: 'ngo-layout-content',
  exportAs: 'ngoLayoutContent',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngo-layout-content',
    '[class.ngo-layout-content-vertical]': 'direction === "vertical"',
    '[class.ngo-layout-content-horizontal]': 'direction === "horizontal"',
  }
})
export class NgoLayoutContent {

  @Input() direction!: 'vertical' | 'horizontal';
}

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";


@Component({
  selector: 'ngo-layout-header',
  exportAs: 'ngoLayoutHeader',
  template: `{{ngoTitle}}`,
  host: {
    class: 'ngo-layout-header'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgoLayoutHeaderComponent {

  @Input() ngoTitle!: string;

}

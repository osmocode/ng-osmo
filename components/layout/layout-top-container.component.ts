import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, QueryList, ViewChildren, ViewEncapsulation } from "@angular/core";
import { NgoLayoutContainerComponent } from "./layout-container.component";

@Component({
  selector: 'ngo-layout-top-container',
  exportAs: 'ngoLayoutTopContainer',
  template: `
    <ngo-layout-container [direction]="direction">
      Box 1
    </ngo-layout-container>
    <ngo-layout-container [direction]="direction">
      Box 2
    </ngo-layout-container>
    <ngo-layout-container [direction]="direction">
      Box 3
    </ngo-layout-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngo-layout-top-container',
    '[class.ngo-layout-top-container-vertical]': 'direction === "vertical"',
    '[class.ngo-layout-top-container-horizontal]': 'direction === "horizontal"'
  }
})
export class NgoLayoutTopContainerComponent implements AfterViewInit {

  @Input() direction!: 'vertical' | 'horizontal';

  @ViewChildren(NgoLayoutContainerComponent)
  containers!: QueryList<NgoLayoutContainerComponent>;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.containers.last.last = true;
    this.changeDetectorRef.markForCheck();
  }

}

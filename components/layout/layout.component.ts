import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from "@angular/core";


@Component({
  selector: 'ngo-layout',
  template: `
    <ngo-layout-top-container
      [direction]="direction"
    ></ngo-layout-top-container>
  `,
  host: {
    class: "ngo-layout",
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgoLayoutComponent implements AfterViewInit {

  @Input() direction: 'vertical' | 'horizontal' = 'vertical';

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngAfterViewInit(): void {
    this.changeDetectorRef.markForCheck();
  }

}

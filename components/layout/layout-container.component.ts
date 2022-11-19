import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnChanges, SimpleChanges, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'ngo-layout-container',
  template: `
    <ngo-layout-content
      [direction]="direction">
      <ng-content></ng-content>
    </ngo-layout-content>
    <ng-container *ngIf="!last">
      <ngo-layout-resizer
        [direction]="direction"
        (didChangeWidth)="changeWidth($event)"
        (didChangeHeight)="changeHeight($event)"
        (didChangeFinish)="updateSize()"
        ></ngo-layout-resizer>
    </ng-container>
  `,
  host: {
    class: 'ngo-layout-container',
    '[class.ngo-layout-container-last]': '!!last',
    '[class.ngo-layout-container-vertical]': 'direction === "vertical"',
    '[class.ngo-layout-container-horizontal]': 'direction === "horizontal"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgoLayoutContainerComponent implements AfterViewInit {

  @Input() last: boolean = false;
  @Input() direction!: 'vertical' | 'horizontal';
  @HostBinding('style.width') width!: string;
  @HostBinding('style.height') height!: string;

  private widthPixels: number = 0;
  private heightPixels: number = 0;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.updateSize();
  }

  updateSize() {
    this.widthPixels = this.elementRef.nativeElement.offsetWidth;
    this.heightPixels = this.elementRef.nativeElement.offsetHeight;
  }

  changeWidth(dx: number) {
    const width = ((this.widthPixels + dx) * 100) / this.elementRef.nativeElement.parentElement.offsetWidth;
    this.width = `${width}%`;
    this.changeDetectorRef.markForCheck();
  }

  changeHeight(dy: number) {
    const height = ((this.heightPixels + dy) * 100) / this.elementRef.nativeElement.parentElement.offsetHeight;
    this.height = `${height}%`;
    this.changeDetectorRef.markForCheck();
  }

}

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, QueryList, ViewEncapsulation } from "@angular/core";
import { NgoSplitAreaDirective } from "./split-area.directive";
import { NgoLayoutDirection } from "./split-layout.types";


@Component({
  selector: 'ngo-split-layout',
  exportAs: 'ngoSplitLayout',
  template: `
    <ng-content></ng-content>
    <ng-template ngFor [ngForOf]="areas" let-index="index" let-last="last">
      <ngo-split-resizer
        *ngIf="last === false"
        [size]="gutterSize"
        [direction]="direction"
        [order]="index*2+1"
        (didChangeStart)="didChangeStart()"
        (didChangeSize)="didChangeSize($event, index)"
        (didChangeFinish)="didChangeFinish(index)"
      ></ngo-split-resizer>
    </ng-template>

  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngo-split-layout',
    '[class.ngo-split-layout-vertical]': 'direction === "vertical"',
    '[class.ngo-split-layout-horizontal]': 'direction === "horizontal"'
  }
})
export class NgoSplitLayoutComponent implements AfterViewInit {

  @Input() direction!: NgoLayoutDirection;
  @Input() gutterSize: number = 8;
  @ContentChildren(NgoSplitAreaDirective) areas!: QueryList<NgoSplitAreaDirective>;

  private update: number = 0;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  get size(): number {
    const rect = (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect();
    return this.direction === 'horizontal' ? rect.width : rect.height;
  }

  get offset(): number {
    return ((this.areas.length || 1) - 1) * this.gutterSize;
  }

  ngAfterViewInit(): void {
    this.areas.forEach((area, index) => {
      area.flex = `calc( ${area.size}% - ${(area.size / 100) * this.offset}px)`;
      area.order = index*2;
    });
  }

  didChangeStart(): void {
    this.areas.forEach(area => area.eventLock());
  }

  didChangeSize(offset: number, index: number): void {
    const left = this.areas.get(index);
    const right = this.areas.get(index + 1);

    if (left && right) {
      this.update = ((offset / this.size) * 100);
      this.update = (left.size + this.update) < 0 ? -left.size : this.update;
      this.update = (right.size - this.update) < 0 ? right.size : this.update;

      left.flex = `calc( ${left.size + this.update}% - ${((left.size +  this.update) / 100) * this.offset}px)`;
      right.flex = `calc( ${right.size - this.update}% - ${((right.size -  this.update) / 100) * this.offset}px)`;
    }
  }

  didChangeFinish(index: number): void {
    const left = this.areas.get(index);
    const right = this.areas.get(index + 1);
    if (left && right) {
      left.size = left.size + this.update;
      right.size = right.size - this.update;
    }
    this.areas.forEach(area => area.eventUnlock());
  }

  updateFlex(area: NgoSplitAreaDirective, offset: number) {
    area.flex = `calc( ${area.size+offset}% - ${(area.size+offset / 100) * this.offset}px)`;
  }

}

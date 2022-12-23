import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, TemplateRef, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { NgoLayoutResizerComponent } from "./layout-resizer.component";
import { NgoLayoutDirection } from "./layout.types";

@Component({
  selector: 'ngo-layout',
  exportAs: 'ngoLayout',
  template: `
    <ngo-layout-header
      *ngIf="direction === undefined"
      [ngoTitle]="ngoTitle || 'Undefined'"
    ></ngo-layout-header>
    <ng-content style="display: none;"></ng-content>
  `,
  host: {
    class: 'ngo-layout',
    '[class.ngo-layout-container]': 'direction === undefined',
    '[class.ngo-layout-vertical]': 'direction === "vertical"',
    '[class.ngo-layout-horizontal]': 'direction === "horizontal"'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgoLayoutComponent implements AfterViewInit {

  @Input() ngoTitle?: string;
  @Input() direction!: NgoLayoutDirection;

  @ContentChildren(NgoLayoutComponent)
  containers!: QueryList<NgoLayoutComponent>;

  @HostBinding('style.width') @Input() width: string = '100%';
  @HostBinding('style.height') @Input() height: string = '100%';

  @HostBinding('style.userSelect') @Input() userSelect?: string = undefined;
  @HostBinding('style.pointerEvents') @Input() pointerEvents?: string = undefined;

  private sizeWidth: number = 0;
  private sizeHeight: number = 0;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {

    this.updateSize();

    this.containers.forEach((item, index, array) => {
      if (index < array.length - 1) {
        const resizer = item.resizable(this.direction);
        resizer.instance.didChangeStart.subscribe(() => {
          item.userSelect = 'none';
          item.pointerEvents = 'none';
          array[index+1].userSelect = 'none';
          array[index+1].pointerEvents = 'none';
          item.updateSize();
          array[index+1].updateSize();
        });
        resizer.instance.didChangeFinish.subscribe(() => {
          item.userSelect = undefined;
          item.pointerEvents = undefined;
          array[index+1].userSelect = undefined;
          array[index+1].pointerEvents = undefined;
          item.updateSize();
          array[index+1].updateSize();
        });
        resizer.instance.didChangeWidth.subscribe((dx) => {
          item.updateWidthSize(dx);
          array[index+1].updateWidthSize(-dx);
        });
        resizer.instance.didChangeHeight.subscribe((dy) => {
          item.updateHeightSize(dy);
          array[index+1].updateHeightSize(-dy);
        });
      }
    });
    this.changeDetectorRef.markForCheck();
  }

  resizable(dir: NgoLayoutDirection): ComponentRef<NgoLayoutResizerComponent> {
    const element = this.viewContainerRef.createComponent(NgoLayoutResizerComponent);
    element.instance.direction = dir;
    element.hostView.detectChanges();
    return element;
  }

  updateWidthSize(dx: number) {
    const width = ((this.sizeWidth + dx) * 100) / this.elementRef.nativeElement.parentElement.offsetWidth;
    this.width = `${width}%`;
  }

  updateHeightSize(dy: number) {
    const height = ((this.sizeHeight + dy) * 100) / this.elementRef.nativeElement.parentElement.offsetHeight;
    this.height = `${height}%`;
  }

  updateSize() {
    this.sizeWidth = this.elementRef.nativeElement.offsetWidth;
    this.sizeHeight = this.elementRef.nativeElement.offsetHeight;
  }

}

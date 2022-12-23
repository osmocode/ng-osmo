import { ChangeDetectionStrategy, Component, EventEmitter, Host, HostBinding, HostListener, Input, Output, ViewEncapsulation } from "@angular/core";
import { fromEvent } from "rxjs";
import { NgoLayoutDirection } from "./split-layout.types";


@Component({
  selector: 'ngo-split-resizer',
  exportAs: 'ngoSplitResizer',
  template: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ngo-split-resizer',
    '[class.ngo-split-resizer-vertical]': 'direction === "vertical"',
    '[class.ngo-split-resizer-horizontal]': 'direction === "horizontal"'
  }
})
export class NgoSplitResizerComponent {

  private clientX: number = 0;
  private clientY: number = 0;

  @Input() direction!: NgoLayoutDirection;
  @HostBinding('style.order') @Input() order!: number;
  @HostBinding('style.flex-basis.px') @Input() size!: number;
  @Output() didChangeFinish = new EventEmitter<void>();
  @Output() didChangeStart = new EventEmitter<void>();
  @Output() didChangeSize = new EventEmitter<number>();
  @HostListener('mousedown', ['$event'])
  mouseDown(event: MouseEvent) {
    this.didChangeStart.emit();
    this.clientX = event.clientX;
    this.clientY = event.clientY;

    const move = fromEvent(document, 'mousemove').subscribe((event) => {
      this.mouseMoveHandler(event as MouseEvent);
    });

    const up = fromEvent(document, 'mouseup').subscribe((event) => {
      move.unsubscribe();
      up.unsubscribe();
      this.didChangeFinish.emit();
    });
  }

  private mouseMoveHandler(event: MouseEvent) {
    this.didChangeSize.emit(this.direction === 'horizontal' ? (event.clientX - this.clientX) : (event.clientY - this.clientY));
  }

}

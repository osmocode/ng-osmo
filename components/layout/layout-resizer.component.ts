import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewEncapsulation } from "@angular/core";
import { fromEvent } from "rxjs";
import { NgoLayoutDirection } from "./layout.types";


@Component({
  selector: 'ngo-layout-resizer',
  exportAs: 'ngoLayoutResizer',
  template: '',
  host: {
    class: 'ngo-layout-resizer',
    '[class.ngo-layout-resizer-vertical]': 'direction === "vertical"',
    '[class.ngo-layout-resizer-horizontal]': 'direction === "horizontal"'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgoLayoutResizerComponent {

  @Input() direction!: NgoLayoutDirection;
  @Output() didChangeWidth = new EventEmitter<number>();
  @Output() didChangeHeight = new EventEmitter<number>();
  @Output() didChangeFinish = new EventEmitter<void>();
  @Output() didChangeStart = new EventEmitter<void>();

  private clientX: number = 0;
  private clientY: number = 0;

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
    if (this.direction === 'vertical') {
      this.didChangeWidth.emit(event.clientX - this.clientX);
    } else {
      this.didChangeHeight.emit(event.clientY - this.clientY);
    }
  }

}

import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from "@angular/core";
import { NgoLayoutDirection } from "./split-layout.types";

@Directive({
  selector: 'ngo-split-area, [ngo-split-area]',
  exportAs: 'ngoSplitArea',
  host: {
    class: 'ngo-split-area',
  },
})
export class NgoSplitAreaDirective {

  @HostBinding('style.userSelect') private _userSelect?: string = undefined;
  @HostBinding('style.pointerEvents') private _pointerEvents?: string = undefined;
  @HostBinding('style.flex-basis') private _flex!: string;
  @HostBinding('style.order') private _order!: number;
  @Input() size!: number;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly elementRef: ElementRef
  ) { }

  set order(value: number) {
    this._order = value;
    this.changeDetectorRef.detectChanges();
  }

  get order(): number {
    return this._order;
  }

  set flex(value: string) {
    this._flex = value;
    this.changeDetectorRef.markForCheck();
  }

  public getPixelSize(dir: NgoLayoutDirection): number {
    const rect = (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect();
    return dir === 'horizontal' ? rect.width : rect.height;
  }

  public eventLock() {
    this._userSelect = 'none';
    this._pointerEvents = 'none';
  }

  public eventUnlock() {
    this._userSelect = undefined;
    this._pointerEvents = undefined;
  }

}

import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({ selector: "[scratchText]" })
export class ScratchTextDirective {
  constructor(private _hostElement: ElementRef) {}

  @HostListener("click", ["$event"])
  onClick(): void {
    const classList: DOMTokenList = this._hostElement.nativeElement.classList;

    if (classList.contains("scratched")) {
      classList.remove("scratched");
    } else {
      classList.add("scratched");
    }
  }
}

import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ScratchTextDirective } from "./scratch-text.directive";
import { Component } from "@angular/core";

@Component({
  selector: "test",
  template: `
    <p scratchText id="text">Some text</p>
  `
})
export class TestComponent {}

describe("ScratchTextDirective", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ScratchTextDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("FUNCTIONALITY TESTS", () => {
    it("should add a class scratched to the text on click if it is not scratched", () => {
      const paragraph = fixture.debugElement.nativeElement.querySelector(
        "#text"
      );

      paragraph.click();

      expect(paragraph.classList).toContain("scratched");
    });

    it("should remove the class scratched of the text on click if it is scratched already", () => {
      const paragraph = fixture.debugElement.nativeElement.querySelector(
        "#text"
      );

      paragraph.click();

      paragraph.click();

      expect(paragraph.classList).not.toContain("scratched");
    });
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsComponent } from "./products.component";
import { ErrorMessagePipe } from "@shared/pipes";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductsService } from "@shared/services";
import { MockProductsService } from "@shared/mock-library/services";
import { provideMockStore } from "@ngrx/store/testing";

describe("ProductsComponent", () => {
  // Component
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  // Helpers
  const selectElement = (selector: string): HTMLElement =>
    fixture.nativeElement.querySelector(selector);

  const selectElements = (selector: string): HTMLCollection =>
    fixture.nativeElement.querySelectorAll(selector);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductsComponent, ErrorMessagePipe],
      providers: [
        {
          provide: ProductsService,
          useClass: MockProductsService
        },
        provideMockStore()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Component init
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("UI ELEMENTS", () => {
    it("should have a logout button with text Logout", () => {
      expect(selectElement("#logout-button").textContent).toBe("Logout");
    });

    describe("INPUTS", () => {
      it("should have an input for product name with a label", () => {
        expect(selectElement("#product-name")).toBeTruthy();
        expect(selectElement("#product-name-label").textContent).toBe(
          "Product Name"
        );
      });

      it("should display an eror that the field is required if the product name input is empty and dirty", () => {
        expect(selectElement("#product-name-error")).toBeFalsy();

        component.productsForm.get("name").markAsDirty();

        fixture.detectChanges();

        expect(selectElement("#product-name-error").textContent).toBe(
          "The field is required."
        );
      });

      it("should have an input for product quantity with a label", () => {
        expect(selectElement("#product-quantity")).toBeTruthy();
        expect(selectElement("#product-quantity-label").textContent).toBe(
          "Quantity"
        );
      });

      it("should display an eror that the field is required if the product name input is empty and dirty", () => {
        expect(selectElement("#product-quantity-error")).toBeFalsy();

        component.productsForm.get("quantity").markAsDirty();

        fixture.detectChanges();

        expect(selectElement("#product-quantity-error").textContent).toBe(
          "The field is required."
        );
      });
    });

    describe("SUBMIT BUTTON", () => {
      it("should have a submit button with text Add Product", () => {
        expect(selectElement("#add-product-button").textContent);
        expect(
          selectElement("#add-product-button").attributes.getNamedItem("type")
            .value
        ).toBe("submit");
      });

      it("should disable the submit button initially", () => {
        expect(
          selectElement("#add-product-button").attributes.getNamedItem(
            "disabled"
          )
        ).toBeTruthy();
      });

      it("should enable the submit button if the form is valid", () => {
        component.productsForm.get("name").setValue("test-product");
        component.productsForm.get("quantity").setValue(2);
        fixture.detectChanges();

        expect(
          selectElement("#add-product-button").attributes.getNamedItem(
            "disabled"
          )
        ).toBeFalsy();
      });

      it("should disable the submit button if the form is not valid", () => {
        component.productsForm.get("name").setValue("test-product");
        fixture.detectChanges();

        expect(
          selectElement("#add-product-button").attributes.getNamedItem(
            "disabled"
          )
        ).toBeTruthy();
      });
    });

    describe("PRODUCTS LIST", () => {
      it("should a have title", () => {
        expect(selectElement("#shopping-list-title").textContent).toEqual(
          "Shopping List"
        );
      });

      it("should have a list item for each product with label", () => {
        expect(component.products.length).toBe(1);
        expect(selectElements("#shopping-list li").length).toBe(1);
        component.products.push({
          id: "1",
          name: "another product",
          quantity: 1
        });
        fixture.detectChanges();
        expect(selectElements("#shopping-list li").length).toBe(2);
      });
    });
  });
});

import { async, TestBed } from "@angular/core/testing";
import { ErrorMessagePipe } from "./error-message.pipe";

describe("ErrorMessagePipe", () => {
  let pipe: ErrorMessagePipe;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessagePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    pipe = new ErrorMessagePipe();
  });

  it("should return the proper error message based on the inputted error name", () => {
    expect(pipe.transform("required", null)).toEqual("The field is required.");
    expect(pipe.transform("max", 25)).toEqual("Enter a number less than 25");
    expect(pipe.transform("error that does not exist", 25)).toEqual(
      "The value you entered is invalid."
    );
  });
});

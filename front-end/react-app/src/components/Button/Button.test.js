import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import { buttonColors } from "./ButtonStyles";

const buttonText = "Add";

test("button displays text", () => {
  const { getByText } = render(<Button text={buttonText} />);

  expect(getByText(buttonText)).toBeTruthy();
});

test("button triggers the callback on click", () => {
  const clickHandler = jest.fn();
  const { getByText } = render(
    <Button text={buttonText} onClick={clickHandler} />
  );

  userEvent.click(getByText(buttonText));

  expect(clickHandler).toHaveBeenCalledTimes(1);
});

test("button cannot be clicked when disabled", () => {
  const clickHandler = jest.fn();
  const { getByText } = render(
    <Button text={buttonText} onClick={clickHandler} isDisabled={true} />
  );

  const button = getByText(buttonText);

  userEvent.click(button);

  expect(clickHandler).not.toHaveBeenCalled();
  expect(button).toHaveStyleRule("background", buttonColors.disabled, {
    modifier: ":disabled"
  });
  expect(button).toHaveStyleRule(
    "border",
    `1px solid ${buttonColors.disabled}`,
    { modifier: ":disabled" }
  );
});

test("button should have different appearance based on its type", () => {
  const buttonType = "primary";

  const { getByText, rerender } = render(
    <Button type={buttonType} text={buttonText} onClick={() => {}} />
  );

  const button = getByText(buttonText);

  expect(button).toHaveStyleRule("background", buttonColors.primary);
  expect(button).toHaveStyleRule("border", `1px solid ${buttonColors.primary}`);

  rerender(<Button text={buttonText} onClick={() => {}} />);

  expect(button).toHaveStyleRule("background", buttonColors.default);
});

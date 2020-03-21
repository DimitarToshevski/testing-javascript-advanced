import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./InputField";

test("input field has label", () => {
  const labelText = "Name";
  const { getByLabelText } = render(
    <InputField name="name" label={labelText} />
  );

  expect(getByLabelText(labelText)).toBeTruthy();
});

test("input has default value", () => {
  const personName = "John";
  const labelText = "Name";
  const { getByLabelText } = render(
    <InputField name="name" label={labelText} value={personName} />
  );

  expect(getByLabelText(labelText).value).toEqual(personName);
});

test("input has correct type", () => {
  const labelText = "Quantity";
  const { getByLabelText } = render(
    <InputField name="quantity" label={labelText} type="number" />
  );

  expect(getByLabelText(labelText).type).toBe("number");
});

test("change handler is called when typing into the input field", () => {
  const labelText = "Name";
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <InputField name="name" label={labelText} onChange={changeHandler} />
  );

  userEvent.type(getByLabelText(labelText), "Mary");

  expect(changeHandler).toHaveBeenCalled();
});

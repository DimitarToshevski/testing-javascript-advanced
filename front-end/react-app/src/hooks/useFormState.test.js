import { renderHook, act } from "@testing-library/react-hooks";
import { useFormState } from "./useFormState";

const [nameField, quantityField] = ["name", "quantity"];

test("useFormState should set initial state", () => {
  const initialState = {
    [nameField]: "Ice cream",
    [quantityField]: "5"
  };
  const { result } = renderHook(() => useFormState(initialState));
  const { formState } = result.current;

  expect(formState).toEqual(initialState);
});

test("useFormState updates form state on change", () => {
  const initialState = { [nameField]: "", [quantityField]: "" };
  const name = "Bread";
  const quantity = 1;

  const { result } = renderHook(() => useFormState(initialState));

  act(() => {
    const { handleChange } = result.current;

    handleChange({ target: { id: nameField, value: name } });
  });

  const { formState } = result.current;

  expect(formState).toEqual({ ...initialState, name });

  act(() => {
    const { handleChange } = result.current;

    handleChange({ target: { id: quantityField, value: quantity } });
  });

  const { formState: newState } = result.current;

  expect(newState).toEqual({ name, quantity });
});

test("useFormState should reset form state", () => {
  const initialQuantity = "6";
  const newQuantity = "12";

  const { result } = renderHook(() =>
    useFormState({
      [nameField]: "Eggs",
      [quantityField]: initialQuantity
    })
  );

  act(() => {
    const { handleChange } = result.current;

    handleChange({ target: { id: quantityField, value: newQuantity } });
  });

  const { formState } = result.current;

  expect(formState.quantity).toEqual(newQuantity);

  act(() => {
    const { resetForm } = result.current;

    resetForm();
  });

  const { formState: resetState } = result.current;
  expect(resetState.quantity).toEqual(initialQuantity);
});

test("useFormState should update entire form state", () => {
  const initialState = {
    [nameField]: "Bananas",
    [quantityField]: "7"
  };
  const updatedState = {
    [nameField]: "Oranges",
    [quantityField]: "10"
  };

  const { result } = renderHook(() => useFormState(initialState));

  act(() => {
    const { updateFormState } = result.current;

    updateFormState(updatedState);
  });

  const { formState } = result.current;

  expect(formState).toEqual(updatedState);
});

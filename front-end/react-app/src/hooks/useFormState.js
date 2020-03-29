import { useState } from "react";

export const useFormState = initialState => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = e => {
    const field = e.target;

    setFormState({
      ...formState,
      [field.id]: field.value
    });
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  const updateFormState = newState => {
    setFormState(newState);
  };

  return { formState, handleChange, resetForm, updateFormState } ;
};

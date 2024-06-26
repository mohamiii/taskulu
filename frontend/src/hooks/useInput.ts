import { useState } from "react";

export function useInput(defaultValue: any, validationFunction: any) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const [firstTry, setFirstTry] = useState(true);

  const [didEdit, setDidEdit] = useState(false);

  const invalidValueError = validationFunction(enteredValue);

  function handleInputChange(event: any) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    // Does not interrupt if first input blur is empty
    if (firstTry && enteredValue.length > 0) {
      setDidEdit(true);
      setFirstTry(false);
    } else {
      !firstTry && setDidEdit(true);
    }
  }

  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    Error: didEdit && invalidValueError,
  };
}

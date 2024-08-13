import { useCallback, useState } from "react";

export type ValuesProps = {
  [key: string]: any;
};

export type ErrorsProps = {
  [key: string]: string | null;
};

type ValidatorsProps = {
  [key: string]: (value: any) => string | null;
};

const useValidation = (
  validators: ValidatorsProps,
  initialValues?: ValuesProps,
) => {
  const [values, setValues] = useState<ValuesProps>(initialValues ?? {});
  const [errors, setErrors] = useState<ErrorsProps>({});

  const validateField = useCallback(
    (name: string, value: any) => {
      if (validators[name]) {
        const error = validators[name](value);
        setErrors((prev) => ({ ...prev, [name]: error }));
        return error;
      }
      return null;
    },
    [validators],
  );

  const validateForm = useCallback((): boolean => {
    const updatedErrors: ErrorsProps = {};
    let validity = true;

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        updatedErrors[key] = error;
        validity = false;
      }
    });
    setErrors(updatedErrors);
    return validity;
  }, [values, validateField]);

  const handleChange = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        validateField(name, value);
      }
    },
    [errors, validateField],
  );

  return {
    values,
    setValues,
    validateField,
    errors,
    setErrors,
    handleChange,
    validateForm,
  };
};

export default useValidation;
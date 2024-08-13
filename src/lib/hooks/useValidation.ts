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

    const recursiveValidate = (values: any, path = "") => {
      Object.keys(values).forEach((key) => {
        const fieldPath = path ? `${path}.${key}` : key;
        const value = values[key];

        if (typeof value === "object" && value !== null) {
          recursiveValidate(value, fieldPath);
        } else {
          const error = validateField(fieldPath, value);
          if (error) {
            updatedErrors[fieldPath] = error;
            validity = false;
          }
        }
      });
    };

    recursiveValidate(values);
    setErrors(updatedErrors);
    return validity;
  }, [values, validateField]);

  const handleChange = useCallback(
    (name: string, value: any) => {
      setValues((prev) => {
        const keys = name.split(".");
        const lastKey = keys.pop()!;
        let nestedObj = prev;

        keys.forEach((key) => {
          if (!nestedObj[key]) nestedObj[key] = {};
          nestedObj = nestedObj[key];
        });

        nestedObj[lastKey] = value;

        return { ...prev };
      });

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

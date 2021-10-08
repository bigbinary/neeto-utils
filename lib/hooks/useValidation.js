import { useState, useEffect } from "react";

import validate from "validate.js";
import * as R from "ramda";

validate.validators.array = (arrayItems, itemConstraints) => {
  const arrayItemErrors = arrayItems.reduce((errors, item, index) => {
    const error = validate(item, itemConstraints);
    if (error) errors[index] = error;

    return errors;
  }, {});

  return R.isEmpty(arrayItemErrors) ? null : { errors: arrayItemErrors };
};

validate.validators.object = (objectItems, itemConstraints) => {
  const error = validate(objectItems, itemConstraints);

  return error ? { errors: error } : null;
};

class Validator {
  constructor(constraints) {
    this.constraints = constraints;

    this.validator = validate;
    this.validator.options = { fullMessages: false };
    this.validator.validators.presence.options = { allowEmpty: false };
  }

  validateState(payload, vldtnSchema = null) {
    let schema = vldtnSchema || this.constraints;
    const errors = this.validator(payload, schema) || {};

    return {
      isValid: R.isEmpty(errors),
      errors: errors,
    };
  }

  validateField(name, value) {
    return this.validator.single(value, this.constraints[name]);
  }
}

const useValidation = (
  validationSchema,
  formStateValues,
  serverErrors = ""
) => {
  const [errors, setErrors] = useState(serverErrors);
  const [isValidating, setIsValidating] = useState(false);
  const [scrollToDirty, setScrollToDirty] = useState(false);
  const validator = new Validator(validationSchema);

  useEffect(() => {
    if (scrollToDirty) {
      setScrollToDirty(false);

      let errorElement = document.querySelector("span.error");
      if (errorElement) {
        errorElement.parentElement.scrollIntoView();
      }
    }
  }, [scrollToDirty]);

  useEffect(() => {
    setErrors(serverErrors);
  }, [serverErrors]);

  const handleFormSubmit = (event, successCallback) => {
    event.preventDefault();

    if (!isValidating) setIsValidating(true);

    const form = validator.validateState(formStateValues);
    setErrors(form.errors);
    if (form.isValid) {
      successCallback(formStateValues);
    } else {
      setScrollToDirty(true);
    }
  };

  const validateField = (
    name,
    value,
    forceValidate = false,
    successCallback = null
  ) => {
    if (!isValidating && !forceValidate) return;

    const newErrors = validator.validateField(name, value);
    setErrors({ ...errors, [name]: newErrors });

    if (successCallback && R.not(newErrors)) successCallback({ [name]: value });

    if (!isValidating && forceValidate) setIsValidating(true);
  };

  const validateObject = (obj) => {
    if (!isValidating) return;

    let newSchema = R.pick(R.keys(obj), validationSchema);
    const form = validator.validateState(obj, newSchema);

    let newErrors = R.omit(R.keys(obj), errors);
    setErrors({ ...newErrors, ...form.errors });
  };

  const validateFieldWithDependency = (name, object) => {
    if (!isValidating) return;

    let newSchema = R.pick(R.keys(object), validationSchema);
    const form = validator.validateState(object, newSchema);
    let newErrors = {
      ...errors,
      [name]: undefined,
      ...form.errors,
    };
    setErrors(newErrors);
  };

  const getNestedErrors = (key, index = null) => {
    if (errors[key] && errors[key][0] && errors[key][0].errors) {
      const errs = errors[key][0].errors;
      return R.isNil(index) ? errs : R.pathOr({}, [index], errs);
    }

    return {};
  };

  const resetValidation = () => {
    setIsValidating(false);
    setErrors(serverErrors);
  };

  const validateForm = () => {
    if (!isValidating) setIsValidating(true);

    const form = validator.validateState(formStateValues);
    setErrors(form.errors);

    return form.isValid;
  };

  return {
    errors,
    validateField,
    handleFormSubmit,
    validateObject,
    getNestedErrors,
    resetValidation,
    validateFieldWithDependency,
    validateForm,
  };
};

export default useValidation;

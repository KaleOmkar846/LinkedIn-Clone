import { useState } from 'react';

/**
 * Custom hook for form state management
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const setError = (name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const setAllErrors = (errorObj) => {
    setErrors(errorObj);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  const setSubmitting = (value) => {
    setIsSubmitting(value);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleInputChange,
    setError,
    setAllErrors,
    setSubmitting,
    resetForm,
  };
};

import * as validators from 'calidators';
import { useReducer, useMemo, createContext } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { invariant, warning } from './utils';

function validateConfigSchema(config) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  if (typeof config === 'function') {
    config = config({});
  }

  invariant(
    typeof config === 'object',
    `useValidation should be called with an object or a function returning an object. You passed a ${typeof config}.`,
  );

  invariant(
    typeof config.fields === 'object',
    'useValidation requires a `field` prop with an object containing the fields and their validators. Please refer to the documentation on usage: https://link.to/docs',
  );

  invariant(
    Object.values(config.fields).every(field => typeof field === 'object'),
    "useValidation requires that the `field` object only contains objects. It looks like yours isn't. Please refer to the documentation on usage: https://link.to/docs",
  );

  for (let fieldName in config.fields) {
    const fieldsConfig = config.fields[fieldName];
    for (let validatorName in fieldsConfig) {
      if (['initialValue'].includes(validatorName)) {
        continue;
      }
      invariant(
        validators[validatorName],
        `useValidation requires all validators specified to be a part of the \`calidators\` library. "${validatorName}" is not a valid validator (specified on the ${fieldName} field). Please refer to the documentation for a complete list of available validators: https://github.com/selbekk/calidators`,
      );
    }
  }

  warning(
    ['always', 'blur', 'submit', undefined].includes(config.showError),
    'useValidation received an unsupported value in the `showError` prop. Valid values are "always", "blur" or "submit".',
  );

  // And so on
}

function validateField(fieldValue = '', fieldConfig) {
  const specialProps = ['initialValue'];
  for (let validatorName in fieldConfig) {
    if (specialProps.includes(validatorName)) {
      continue;
    }
    let validatorConfig = fieldConfig[validatorName];
    if (typeof validatorConfig === 'string') {
      validatorConfig = { message: validatorConfig };
    }
    const configuredValidator = validators[validatorName](validatorConfig);
    const errorMessage = configuredValidator(fieldValue);

    if (errorMessage) {
      return errorMessage;
    }
  }
  return null;
}

function validateFields(fieldValues, fieldConfigs) {
  const errors = {};
  for (let fieldName in fieldConfigs) {
    const fieldConfig = fieldConfigs[fieldName];
    const fieldValue = fieldValues[fieldName];

    errors[fieldName] = validateField(fieldValue, fieldConfig);
  }
  return errors;
}

function getInitialState(config) {
  if (typeof config === 'function') {
    config = config({});
  }
  const initialValues = {};
  const initialBlurred = {};
  for (let fieldName in config.fields) {
    initialValues[fieldName] = config.fields[fieldName].initialValue || '';
    initialBlurred[fieldName] = false;
  }
  const initialErrors = validateFields(initialValues, config.fields);
  return {
    values: initialValues,
    errors: initialErrors,
    blurred: initialBlurred,
    submitted: false,
  };
}

function validationReducer(state, action) {
  switch (action.type) {
    case 'change':
      const values = { ...state.values, ...action.payload };
      return {
        ...state,
        values,
      };
    case 'submit':
      return { ...state, submitted: true };
    case 'validate':
      return { ...state, errors: action.payload };
    case 'blur':
      const blurred = {
        ...state.blurred,
        [action.payload]: true,
      };
      return { ...state, blurred };
    default:
      throw new Error('Unknown action type');
  }
}

function getErrors(state, config) {
  if (config.showErrors === 'always') {
    return state.errors;
  }
  if (config.showErrors === 'blur') {
    return Object.entries(state.blurred)
      .filter(([, blurred]) => blurred)
      .reduce((acc, [name]) => ({ ...acc, [name]: state.errors[name] }), {});
  }
  return state.submitted ? state.errors : {};
}

export const ValidationContext = createContext({});

export const ValidationProvider = props => {
  const context = useValidation(props.config);
  const memoizedContext = useMemo(() => context, [context]);
  return (
    <ValidationContext.Provider value={memoizedContext}>
      {props.children}
    </ValidationContext.Provider>
  );
};

const useValidation = config => {
  validateConfigSchema(config);

  const [state, dispatch] = useReducer(
    validationReducer,
    getInitialState(config),
  );

  if (typeof config === 'function') {
    config = config(state.values);
  }

  useDeepCompareEffect(() => {
    const errors = validateFields(state.values, config.fields);
    dispatch({ type: 'validate', payload: errors });
  }, [state.values, config.fields]);

  const errors = useMemo(() => getErrors(state, config), [state, config]);

  const isFormValid = useMemo(
    () => Object.values(errors).every(error => error === null),
    [errors],
  );
  return {
    errors,
    submitted: state.submitted,
    isFormValid,
    getFormProps: () => ({
      onSubmit: e => {
        e.preventDefault();
        dispatch({ type: 'submit' });
        if (config.onSubmit) {
          config.onSubmit({ ...state, isFormValid });
        }
      },
    }),
    getFieldProps: (fieldName, overrides = {}) => ({
      onChange: e => {
        const { value } = e.target;
        if (!config.fields[fieldName]) {
          return;
        }
        dispatch({
          type: 'change',
          payload: { [fieldName]: value },
        });
        if (overrides.onChange) {
          overrides.onChange(e);
        }
      },
      onBlur: e => {
        dispatch({ type: 'blur', payload: fieldName });
        if (overrides.onBlur) {
          overrides.onBlur(e);
        }
      },
      name: overrides.name || fieldName,
      value: state.values[fieldName] || '',
    }),
  };
};

export default useValidation;

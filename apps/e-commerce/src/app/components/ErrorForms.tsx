import { message } from 'antd';

import { FormInstance } from 'antd';

export const checkFormErrors = (form: FormInstance) => {
  const errorFields = form.getFieldsError();
  const hasErrors = errorFields.some(({ errors }) => errors.length > 0);

  if (hasErrors) {
    // Show all errors in a notification
    const errorMessages = errorFields
      .filter(({ errors }) => errors.length > 0)
      .map(({ name, errors }) => `${name.join('.')}: ${errors[0]}`)
      .join('\n');

    message.error(
      <div>
        <p>Please fix the following errors:</p>
        <pre>{errorMessages}</pre>
      </div>
    );
  }

  return hasErrors;
};

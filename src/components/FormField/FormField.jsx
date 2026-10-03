import { FieldWrapper, FieldHint } from '../../styles/Form.styles';

function FormField({
  id,
  label,
  as = 'input',
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  hint = '',
}) {
  const Element = as;

  return (
    <FieldWrapper>
      <label htmlFor={id}>{label}</label>
      <Element
        id={id}
        name={id}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {hint && <FieldHint>{hint}</FieldHint>}
    </FieldWrapper>
  );
}

export default FormField;

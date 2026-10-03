import { StyledButton } from './Button.styles';

function Button({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

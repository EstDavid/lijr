const InputField = ({ label, type, value, onChange, required }) => {
  const displayedLabel = label
    .split('-')
    .slice(1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="signup-login-input">
      <label htmlFor={label}>{displayedLabel}</label>
      <input
        type={type}
        id={label}
        value={value}
        placeholder={displayedLabel}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

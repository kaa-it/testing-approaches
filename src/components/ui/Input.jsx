import React from "react";

const Input = React.forwardRef(
  ({ error = "", value = "", className, ...props }, ref) => {
    return (
      <label className="popup__label">
        <input className={`popup__input ${className}`} ref={ref} {...props} value={value}/>
        <span className="popup__error" id="place-name-error">
          {error || ""}
        </span>
      </label>
    );
  }
);

export default Input;

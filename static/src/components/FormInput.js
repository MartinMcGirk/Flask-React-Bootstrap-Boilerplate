import React from 'react'

const FormInput = ({
    fieldId,
    label,
    placeholder,
    value,
    onFieldChange,
    smallText,
    inputType='text',
    classExtras = ''
}) => (
    <div className={`form-group ${classExtras}`}>
        <label htmlFor={`${fieldId}Field`}>{label}</label>
        <input
            type={inputType}
            className="form-control"
            id={`${fieldId}Field`}
            placeholder={placeholder}
            value={value}
            onChange={onFieldChange}
        />
        {smallText && <small id="emailHelp" className="form-text text-muted">{smallText}</small>}
    </div>
);

export { FormInput }
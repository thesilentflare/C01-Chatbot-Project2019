import React from 'react';

const TextInput = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-input">
            <input type="text" className={formControl} {...props} />
        </div>
    );
}
export default TextInput;

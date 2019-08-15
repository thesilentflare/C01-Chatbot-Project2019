import React from 'react';
import './Slider.css'

const Slider = props => {

    let formControl = "form-control";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

    return (
        <div className="form-group">
        <div className="text">Use IBM Watson</div>
          <label class="switch">
            <input type="checkbox" className={formControl} {...props}/>
            <span className="slider round"/>
          </label>
        </div>
    );
}
export default Slider;

import React from 'react'

const RadioItem = ({position}) => {
    return (
        <div class="radio-item">
            <input type="radio" name={position} id={position} />
            <label htmlFor={position}>{position}</label>
        </div>
    );
}

export default RadioItem;
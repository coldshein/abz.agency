import React from 'react'

const RadioItem = ({position, position_id, onChange}) => {
    return (
        <div className="radio-item">
            <input type="radio" name="position" id={position_id} value={position_id} onChange={onChange} />
            <label htmlFor={position_id}>{position}</label>
        </div>
    );
}

export default RadioItem;
import React from 'react'

const GetItem = ({email, name, phone, position, photo}) => {


    return (
        <div className="get-item">
            <div className="item-img">
                <img src={photo} alt="" />
            </div>
            <p className="item-name">{name}</p>
            <p className="item-position">{position}</p>
            <p className="item-email">{email}</p>
            <p className="item-phone">{phone}</p>
        </div>
    );
}

export default GetItem;
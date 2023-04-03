import React from 'react'

const GetItem = ({email, name, phone, position, photo}) => {


    return (
        <div className="get-item">
            <div className="item-img">
                <img src={photo} alt="" />
            </div>
            <p className="item-name" title={name}>{name}</p>
            <p className="item-position">{position}</p>
            <a href={`mailto:${email}`}className="item-email" title={email}>{email}</a>
            <a href={`tel:${phone}`} className="item-phone">{phone}</a>
        </div>
    );
}

export default GetItem;
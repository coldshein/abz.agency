import React from 'react'
import { useDispatch, useSelector, getState } from 'react-redux';
import { getPositions, getToken, getUsers, postUser, reset } from '../redux/userSlice';
import { useReset } from '@reduxjs/toolkit'
import RadioItem from './RadioItem';
import axios from 'axios';
import SuccessBlock from './SuccessBlock';
import Loader from './Loader';
import { Formik, Field, ErrorMessage, Form } from 'formik';


const PostSection = () => {
    const [photo, setPhoto] = React.useState(null);
    const [fileName, setFileName] = React.useState("Upload your photo");

    const [position, setPosition] = React.useState(null);

    const [isRegisterSuccessInfo, setIsRegisterSuccessInfo] = React.useState(false);

    const { positions, signUp } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    React.useEffect(() => {

        dispatch(getToken());
        dispatch(getPositions());
        setIsRegisterSuccessInfo(false);

        if (signUp === 'fulfilled') {
            setIsRegisterSuccessInfo(true);
            dispatch(getUsers(1));
        }

    }, [signUp])


    const getFileName = (e) => {
        const file = e.currentTarget.value.split("");
        file.splice(0, 12);
        setFileName(file.join(""));
        setPhoto(e.currentTarget.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    if (signUp === 'pending') {
        return <Loader />
    }

    const validateName = value => {
        let error;
        if (!value) {
            error = null;
        } else if (!/^[aA-zZ]{2,60}$/i.test(value)) {
            error = 'Username should contain 2-60 characters';
        }
        return error;
    };

    const validateEmail = value => {
        let error;
        if (!value) {
            error = null;
        } else if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(value)) {
            error = 'User email, must be a valid email according to RFC2822';
        }
        return error;
    };

    const validatePhone = value => {
        let error;
        if (!value) {
            error = '38 (XXX) XXX - XX - XX';
        } else if (!/[\+]{0,1}380([0-9]{9})$/i.test(value)) {
            error = 'Number should start with code of Ukraine +380';
        }
        return error;
    };

    const validatePosition = value => {
        let error;
        if (!value) {
            error = 'Please, select your position';
        }
        return error;
    }

    return (
        <section className="post-request">
            <div className="post-requset__inner">
                {
                    signUp === 'fulfilled' ? (
                        <SuccessBlock />
                    ) : (

                        <>
                            <h1 className="section-title">Working with POST request</h1>
                            <div className="mini-container">
                                <Formik
                                    initialValues={
                                        {
                                            name: '',
                                            email: '',
                                            phone: '',
                                            position: '',
                                            photo: null,
                                        }
                                    }
                                    onSubmit={(values) => {
                                        const formData = new FormData();

                                        formData.append('name', values.name)
                                        formData.append('position_id', values.position)
                                        formData.append('phone', values.phone)
                                        formData.append('email', values.email)
                                        formData.append('photo', values.photo);

                                        dispatch(postUser(formData));
                                    }}
                                >
                                    {({ values, errors, touched, isValid, handleChange, setFieldValue }) => (
                                        <Form autoComplete='false'>
                                            <div className={`input-block ${errors.name && touched.name ? `false-validate` : ``}`}>

                                                <Field type="text" name="name" validate={validateName} className="input-text" placeholder=" " />
                                                <label htmlFor="name">Name</label>
                                                <ErrorMessage name="name" component="div" className='error-message' />
                                            </div>
                                            <div className={`input-block ${errors.email && touched.email ? `false-validate` : ``}`}>

                                                <Field type="email" name="email" validate={validateEmail} className="input-text" placeholder=" " />
                                                <label htmlFor="email">Email</label>
                                                <ErrorMessage name="email" component="div" className='error-message' />
                                            </div>
                                            <div className={`input-block ${errors.phone && touched.phone ? `false-validate` : ``}`}>

                                                <Field type="tel" name="phone" validate={validatePhone} className="input-text" placeholder=" " />
                                                <label htmlFor="phone">Phone</label>
                                                <ErrorMessage name="phone" component="div" className='error-message' />
                                            </div>
                                            <div className="radio-block">
                                                <p>Select your position </p>
                                                {
                                                    positions && positions.map((item) => (
                                                        <RadioItem
                                                            key={item.id}
                                                            position={item.name}
                                                            position_id={item.id}
                                                            setFieldValue={setFieldValue}
                                                            validate={validatePosition}
                                                            required />
                                                    ))
                                                }
                                            </div>
                                            <div className="image-block">
                                                <label htmlFor="file">
                                                    <input type="file" id="file" accept="image/jpg" size={5242880} required />
                                                    <div className="button-file">Upload</div>
                                                    <span className="file-text">{fileName}</span>
                                                </label>
                                            </div>

                                            <button type="submit" disabled={!isValid || false} className="yellow-btn">
                                                Submit
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </>
                    )

                }

            </div>
        </section >
    );
}

export default PostSection;

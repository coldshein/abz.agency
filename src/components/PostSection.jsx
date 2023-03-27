import React, { useRef } from 'react'
import { useDispatch, useSelector, getState } from 'react-redux';
import { getPositions, getToken, getUsers, postUser, reset } from '../redux/userSlice';
import { useReset } from '@reduxjs/toolkit'
import RadioItem from './RadioItem';
import axios from 'axios';
import SuccessBlock from './SuccessBlock';
import Loader from './Loader';
import { Formik, Field, ErrorMessage, Form } from 'formik';


const PostSection = ({signUpBlock}) => {

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


    if (signUp === 'pending') {
        return <Loader />
    }

    const validateName = value => {
        let error;
        if (!value) {
            error = 'Username should contain 2-60 characters';
        } else if (!/^[aA-zZ]{2,60}$/i.test(value)) {
            error = 'Username should contain 2-60 characters';
        }
        return error;
    };

    const validateEmail = value => {
        let error;
        if (!value) {
            error = 'User email, must be a valid email according to RFC2822';
        } else if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(value)) {
            error = 'User email, must be a valid email according to RFC2822';
        }
        return error;
    };

    const validatePhone = value => {
        let error;
        if (!value) {
            error = '38 (XXX) XXX - XX - XX';
        } else if (value.length > 13) {
            error = 'Too many numbers'
        
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

    const validatePhoto = (value) => {
        let error;
      
        if (!value) {
          error = 'Please select an image.';
        } else if (value.size > 5 * 1024 * 1024) {
          error = 'Selected image should be less than 5 MB.';
        }
      
        return error;
      };

     
    return (
        <section className="post-request" ref={signUpBlock}>
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
                                            photo: '',
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
                                    {({ values, errors, touched, isValid, handleChange, setFieldValue, handleBlur }) => (
                                        <Form>
                                            <div className={`input-block ${errors.name && touched.name ? `false-validate` : ``}`}>

                                                <Field
                                                    type="text"
                                                    name="name"
                                                    validate={validateName}
                                                    className="input-text"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder=" " />
                                                <label htmlFor="name">Name</label>
                                                <ErrorMessage name="name" component="div" className='error-message' />
                                            </div>
                                            <div className={`input-block ${errors.email && touched.email ? `false-validate` : ``}`}>

                                                <Field
                                                    type="email"
                                                    name="email"
                                                    validate={validateEmail}
                                                    className="input-text"
                                                    placeholder=" "
                                                />
                                                <label htmlFor="email">Email</label>
                                                <ErrorMessage name="email" component="div" className='error-message' />
                                            </div>
                                            <div className={`input-block ${errors.phone && touched.phone ? `false-validate` : ``}`}>

                                                <Field
                                                    type="tel"
                                                    name="phone"
                                                    validate={validatePhone}
                                                    className="input-text"
                                                    placeholder=" "
                                                />
                                                <label htmlFor="phone">Phone</label>
                                                <ErrorMessage name="phone" component="div" className='error-message' />
                                            </div>
                                            <div className={`radio-block ${errors.position && touched.position ? `false-validate` : ``}`}>
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
                                                <ErrorMessage name="position" className='error-message' component="div"/>
                                            </div>
                                            <div className={`image-block ${errors.photo && touched.photo ? `false-validate` : ``}`}>
                                                <label htmlFor="file">
                                                    <Field
                                                        type="file"
                                                        id="photo"
                                                        name="photo"
                                                        accept="image/jpeg"
                                                        value=""
                                                        validate={validatePhoto}
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files[0];
                                                            setFieldValue("photo", file);
                                                        }}
                                                    />
                                                    <div className="button-file">Upload</div>
                                                   <span className="file-text">{!values.photo.name ? 'Upload your photo' : values.photo.name }</span>
                                                   <ErrorMessage name='photo' component="div" className='error-message'/>
                                                </label>
                                                
                                            </div>

                                            <button type="submit" disabled={!isValid} className="yellow-btn">
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

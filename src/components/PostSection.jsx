import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPositions, getToken, getUserById, setUsers, getUsers } from '../redux/userSlice';
import RadioItem from './RadioItem';
import axios from 'axios';
import SuccessBlock from './SuccessBlock';


const PostSection = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [photo, setPhoto] = React.useState(null);
    const [position, setPosition] = React.useState('');
    const [fileName, setFileName] = React.useState("Upload your photo");
    const [isRegisterSuccessInfo, setIsRegisterSuccessInfo] = React.useState(false);


    const { positions, token} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getPositions());
        dispatch(getToken());
        setIsRegisterSuccessInfo(false);
        if (isRegisterSuccessInfo?.success) {
            dispatch(getUsers(1));
            resetInput();
        }
    }, [isRegisterSuccessInfo])


    const getFileName = (e) => {
        const file = e.currentTarget.value.split("");
        file.splice(0, 12);
        setFileName(file.join(""));
        setPhoto(e.currentTarget.value);
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            default:
                break;
        }
    };
    const postUser = async (formData) => {
        const requestOptions = {
            method: "POST",
            body: formData,
            headers: { Token: token },
        };

        try {
            const res = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', requestOptions);
            const data = await res.json();
            setIsRegisterSuccessInfo(data);
            console.log("data: ", data);

        } catch (err) {
            console.log("error");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        let fileField = document.querySelector('input[type="file"]');
        formData.append('name', name)
        formData.append('position_id', position)
        formData.append('phone', phone)
        formData.append('email', email)
        formData.append('photo', fileField.files[0]);
        await postUser(formData);
    }

    const resetInput = () => {
        setEmail('')
        setName('')
        setPhone('')
        setPosition('')
        setFileName('Upload your photo');
    }


    return (
        <section className="post-request">
            <div className="post-requset__inner">
                {
                    isRegisterSuccessInfo ? (
                        <SuccessBlock />
                    ) : (
                        <>
                            <h1 className="section-title">Working with POST request {name} {email} {phone}</h1>
                            <div className="mini-container">
                                <form action="" autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="input-block">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder=" "
                                            onChange={handleInputChange}
                                            value={name}
                                            pattern="^[A-Za-z]{2,60}"
                                            title="Username should contain 2-60 characters"
                                            required
                                        />
                                        <label htmlFor="name">Your name</label>
                                        <span>Username should contain 2-60 characters</span>
                                    </div>
                                    <div className="input-block">
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder=" "
                                            onChange={handleInputChange}
                                            value={email}
                                            minLength="2"
                                            maxLength="60"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}"
                                            title="User email, must be a valid email according to RFC2822"
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                        <span>User email, must be a valid email according to RFC2822</span>
                                    </div>
                                    <div className="input-block false-validation">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            placeholder=" "
                                            onChange={handleInputChange}
                                            value={phone}
                                            pattern="[\+]{0,1}380([0-9]{9})$"
                                            title="User phone number. Number should start with code of Ukraine +380"
                                            required
                                        />
                                        <label htmlFor="phone">Phone</label>
                                        <span>+38 (XXX) XXX - XX - XX</span>
                                    </div>
                                    <div className="radio-block">
                                        <p>Select your position </p>
                                        {
                                            positions && positions.map((item) => (
                                                <RadioItem
                                                    key={item.id}
                                                    position={item.name}
                                                    position_id={item.id}
                                                    onChange={(event) => setPosition(event.target.value)}
                                                    required />
                                            ))
                                        }
                                    </div>
                                    <div className="image-block">
                                        <label htmlFor="file">
                                            <input type="file" id="file" onChange={getFileName} accept="image/jpg" size={5242880} required />
                                            <div className="button-file">Upload</div>
                                            <span className="file-text">{fileName}</span>
                                        </label>
                                    </div>
                                    <button className="yellow-btn" type='submit'>Sing up</button>
                                </form>
                            </div>
                        </>
                    )
                }

            </div>
        </section>
    );
}

export default PostSection;
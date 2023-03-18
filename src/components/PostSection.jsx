import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from '../redux/userSlice';
import RadioItem from './RadioItem';

const PostSection = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const {positions} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getPositions());
        console.log(positions)
    },[])
    if(!positions){
        return 'loading';
    }

    

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

    return (
        <section class="post-request">
            <div class="post-requset__inner">
                <h1 class="section-title">Working with POST request {name} {email} {phone}</h1>
                <div class="mini-container">
                    <div class="input-block">
                        <input type="text" name="name" id="name" placeholder=" " onChange={handleInputChange} value={name}/>
                        <label for="name">Your name</label>
                        <span>Username should contain 2-60 characters</span>
                    </div>
                    <div class="input-block">
                        <input type="text" name="email" id="email" placeholder=" " onChange={handleInputChange} value={email}/>
                        <label for="email">Email</label>
                        <span>User email, must be a valid email according to RFC2822</span>
                    </div>
                    <div class="input-block false-validation">
                        <input type="phone" name="phone" id="phone" placeholder=" " onChange={handleInputChange} value={phone}/>
                        <label for="phone">Phone</label>
                        <span>+38 (XXX) XXX - XX - XX</span>
                    </div>
                    <div class="radio-block">
                        <p>Select your position </p>
                       {
                        positions.map((item) => (
                            <RadioItem key={item.id} position={item.name}/>
                        ))
                       }
                    </div>
                    <div class="image-block">
                        <label for="file">
                            <input type="file" id="file" />
                            <div class="button-file">Upload</div>
                            <span class="file-text">Upload your photo</span>
                        </label>
                    </div>
                    <button className="yellow-btn" disabled>Sing up</button>
                </div>
            </div>
        </section>
    );
}

export default PostSection;
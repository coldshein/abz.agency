import React from 'react'
import { useDispatch, useSelector, getState } from 'react-redux';
import { getUsers, setPage } from '../redux/userSlice';
import GetItem from './GetItem';
import Loader from './Loader';

const GetSection = ({usersBlock}) => {
    const dispatch = useDispatch();
    const { users, page, isLoading } = useSelector((state) => state.user);
    React.useEffect(() => {
        dispatch(getUsers(page));
    }, [page])
    
    const handleShowMore = () => {
        dispatch(setPage())
    }

    return (
        <section className="get-request" ref={usersBlock}>
            <div className="container">
                <div className="get-request__inner">
                    <h1 className="section-title">Working with GET request</h1>
                    {
                        isLoading === 'pending' ? <Loader /> : (
                            <div className="get-block">
                                {
                                    users.map((user, index) => (
                                        <GetItem
                                            key={user.id}
                                            {...user}
                                        />
                                    ))
                                }

                            </div>
                        )
                    }
                   {
                    page < 32 ?  <button className="yellow-btn center" onClick={handleShowMore}>Show more</button> : null
                   }
                </div>
            </div>
        </section>
    );
}

export default GetSection;
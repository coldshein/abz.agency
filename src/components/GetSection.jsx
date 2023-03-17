import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setPage } from '../redux/userSlice';
import GetItem from './GetItem';

const GetSection = () => {
    const dispatch = useDispatch();
    const {users, page} = useSelector((state) => state.user);
    React.useEffect(() => {
        dispatch(getUsers(page));

    }, [page])

    const handleShowMore = () => {
        dispatch(setPage())
    }
    
    return (
        <section className="get-request">
            <div className="container">
                <div className="get-request__inner">
                    <h1 className="section-title">Working with GET request</h1>
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
                    <button className="yellow-btn center" onClick={handleShowMore}>Show more</button>
                </div>
            </div>
        </section>
    );
}

export default GetSection;
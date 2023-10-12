import { useEffect } from 'react';
import './ScrollCard.css';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../../../store/session';

const ScrollCard = ({ post }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.session.users[post?.user_id])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className="post-card">
        <h4>{user?.username}</h4>
        <img src={post.content} />
        </div>
    );
};
export default ScrollCard;
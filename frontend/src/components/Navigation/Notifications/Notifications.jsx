import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchUserNotifs } from '../../../store/notifs'
import './Notifications.css'


function Notifications() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userNotifs = useSelector((state) => state.notifs[user.id])

    useEffect(() => {
        dispatch(fetchUserNotifs(user.id))
    }, [dispatch, user.id])

    return (
        <div id="notif-page">
            {userNotifs ? (
                userNotifs.map((notif) => (
                <div id="notif-container">
                    <p>{notif.created_date}</p>
                    <h1>{notif.message}</h1>
                </div>
            ))
            ) : (
                <>
                    <h1>No Notifications.</h1>
                </>
            )}
        </div>
    )
}

export default Notifications;
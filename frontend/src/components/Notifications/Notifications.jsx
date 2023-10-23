import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchUserNotifs } from '../../store/notifs'
import { getAllUsers } from "../../store/session";
import NotifComponent from "./NotifComponent";
import './Notifications.css'


function Notifications() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const userNotifs = useSelector((state) => state.notifs[user.id])

    useEffect(() => {
        dispatch(fetchUserNotifs(user.id));
        dispatch(getAllUsers());
    }, [dispatch, user.id])

    if (!user) return <Redirect to="/" />;

    return (
        <div id="notif-page">
            {userNotifs ? (
                userNotifs.map((notif) => (
                <NotifComponent notif={notif} key={notif.id} />
            ))
            ) : (
                <div>
                    <h1 id="no-notifs-yet">No Notifications.</h1>
                </div>
            )}
        </div>
    )
}

export default Notifications;
import React from 'react';

function NotifComponent({ notif }) {

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

  return (
    <div id="notif-container">
        <h1>{formatDate(notif.created_date)}</h1>
    </div>
  );
}

export default NotifComponent;
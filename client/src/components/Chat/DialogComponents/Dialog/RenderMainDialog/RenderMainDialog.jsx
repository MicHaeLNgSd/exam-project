import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import styles from './RenderMainDialog.module.sass';

const RenderMainDialog = ({ userId, messages, messagesEnd }) => {
  const messagesArray = [];
  let currentTime = moment();
  messages.forEach((message, i) => {
    const { createdAt, sender, body } = message;
    if (!currentTime.isSame(createdAt, 'date')) {
      messagesArray.push(
        <div key={createdAt} className={styles.date}>
          {moment(createdAt).format('MMMM DD, YYYY')}
        </div>
      );
      currentTime = moment(createdAt);
    }
    messagesArray.push(
      <div
        key={i}
        className={classNames(
          userId === sender ? styles.ownMessage : styles.message
        )}
      >
        <span>{body}</span>
        <span className={styles.messageTime}>
          {moment(createdAt).format('HH:mm')}
        </span>
      </div>
    );
  });
  messagesArray.push(<div key={'messagesEnd'} ref={messagesEnd} />);
  return <div className={styles.messageList}>{messagesArray}</div>;
};

export default RenderMainDialog;

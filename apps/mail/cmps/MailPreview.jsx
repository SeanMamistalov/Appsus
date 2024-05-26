const { useState } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onMarkAsRead, onRemove }) {
  const [isRead, setIsRead] = useState(mail.isRead);

  const handleClick = () => {
    if (!isRead) {
      setIsRead(true);
      onMarkAsRead(mail.id);
    }
  };

  return (
    <div className={`email-item ${isRead ? 'read' : 'unread'}`}>
      <Link
        to={`/mail/${mail.id}`}
        className="mail-preview"
        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', width: '100%' }}
        onClick={handleClick}
      >
        <div>
          <span className="email-sender">{mail.from}</span>
          <span className="email-subject">
            {mail.subject.length > 50 ? mail.subject.substring(0, 47) + '...' : mail.subject}
          </span>
        </div>
        <div>
          <span className="email-time">
            {new Date(mail.sentAt).toLocaleTimeString()}
          </span>
        </div>
      </Link>
      <div className="email-actions">
        <button className="icon" onClick={() => onRemove(mail.id)}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}
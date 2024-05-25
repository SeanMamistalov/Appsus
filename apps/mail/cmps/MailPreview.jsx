const { useState } = React
const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onMarkAsRead }) {
  const [isRead, setIsRead] = useState(mail.isRead);

  const handleClick = () => {
    if (!isRead) {
      setIsRead(true);
      onMarkAsRead(mail.id); 
    }
  };

  return (
    <Link
      to={`/mail/${mail.id}`}
      className={`email-item ${isRead ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <span className="email-sender">{mail.from}</span>
      <span className="email-subject">
        {mail.subject.length > 50 ? mail.subject.substring(0, 47) + '...' : mail.subject}
      </span>
      <span className="email-time">
        {new Date(mail.sentAt).toLocaleTimeString()}
      </span>
    </Link>
  );
}
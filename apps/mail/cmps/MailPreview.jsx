const { useState } = React
const { Link } = ReactRouterDOM
export function MailPreview({ mail, onMarkAsRead, onRemove, onToggleStarred }) {
  if (!mail) return null;

  const [isRead, setIsRead] = useState(mail.isRead);
  const [isStarred, setIsStarred] = useState(mail.starred);

  const handleClick = () => {
    if (!isRead) {
      setIsRead(true);
      onMarkAsRead(mail.id);
    }
  };

  const handleToggleStarred = (e) => {
    e.stopPropagation(); 
    setIsStarred(!isStarred);
    // onToggleStarred(mail.id);
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
            {mail.subject ? (mail.subject.length > 50 ? mail.subject.substring(0, 47) + '...' : mail.subject) : ''}
          </span>
          <span className="email-text">
            {mail.text ? (mail.text.substring(0, 100)) : ''}
          </span>
        </div>
        <div>
          <span className="email-time">
            {mail.sentAt ? (new Date(mail.sentAt).toLocaleTimeString()) : ''}
          </span>
        </div>
      </Link>
      <div className="email-actions">
        <button className={`icon star-icon ${isStarred ? 'yellow' : ''}`} onClick={handleToggleStarred}>
          <span className="material-icons">{isStarred ? 'star' : 'star_outline'}</span>
        </button>
        <button className="icon" onClick={() => onRemove(mail.id)}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}
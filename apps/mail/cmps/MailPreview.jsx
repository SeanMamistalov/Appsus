const { useState } = React;
const { Link } = ReactRouterDOM;
export function MailPreview({ mail, onMarkAsRead, onRemove, onToggleStarred }) {
  if (!mail) return null;

  const [isRead, setIsRead] = useState(mail.isRead);
  const [isStarred, setIsStarred] = useState(mail.isStarred);

  const handleClick = () => {
    if (!isRead) {
      setIsRead(true);
      onMarkAsRead(mail.id);
    }
  };

  const handleToggleStarred = (e) => {
    e.stopPropagation();
    setIsStarred((prev) => !prev);
    onToggleStarred(mail.id);
  };

  const formattedDate = mail.sentAt ? new Date(mail.sentAt).toLocaleDateString() : '';

  return (
    <div className={`email-row ${isRead ? 'read' : 'unread'}`} onClick={handleClick}>
      <div className="email-from-content">
        <div className="email-side-icons-container">
          <input onClick={(e) => e.stopPropagation()} className='checkbox-input' type="checkbox" />
          <span onClick={handleToggleStarred}>
            <i className={`fa-star ${isStarred ? 'fa-solid starred' : 'fa-regular'}`}></i>
          </span>
        </div>
        <span className={`email-from-txt ${isRead ? 'read' : 'unread'}`}>{mail.from}</span>
      </div>
      <Link
        to={`/mail/${mail.id}`}
        className="email-body"
        style={{ textDecoration: 'none', flex: 2, display: 'flex', alignItems: 'center' }}
      >
        <span className={isRead ? 'read' : 'unread'}>
          {mail.subject}
          <span className="makaf">-</span>
        </span>
        <span className="email-body-txt">{mail.text ? mail.text.substring(0, 100) : ''}</span>
      </Link>
      <span className={`email-row-date ${isRead ? 'read' : 'unread'}`}>{formattedDate}</span>
      <div className={`email-icons-container ${isRead ? 'read' : 'unread'}`}>
        <span>
          {isRead ? 
            <i title="Mark as unread" className="fa-regular fa-envelope email-row-icon"></i> : 
            <i title="Mark as read" className="fa-regular fa-envelope-open email-row-icon"></i>
          }
        </span>
        <i 
          onClick={(e) => { e.stopPropagation(); onRemove(mail.id); }} 
          title="Delete email" 
          className="fa-regular fa-trash-can email-row-icon">
        </i>
      </div>
    </div>
  );
}
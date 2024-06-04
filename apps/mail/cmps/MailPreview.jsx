const { useState } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onMarkAsRead, onRemove, onToggleStarred }) {
  if (!mail) return null;

  const [isRead, setIsRead] = useState(mail.isRead);
  const [isStarred, setIsStarred] = useState(mail.starred);

  const handlePreviewClick = () => {
    if (!isRead) {
      setIsRead(true);
      onMarkAsRead(mail.id);
    }
  };

  const handleToggleStarred = (e) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
    onToggleStarred(mail.id);
  };

  const formattedDate = mail.sentAt ? new Date(mail.sentAt).toLocaleDateString() : '';

  return (
    <Link
      to={`/mail/${mail.id}`}
      className={`email-row ${isRead ? 'read' : 'unread'}`}
      style={{ textDecoration: 'none' }}
      onClick={handlePreviewClick}
    >
      <div className="email-from-content">
        <div className="email-side-icons-container">
          <input onClick={(e) => e.stopPropagation()} className='checkbox-input' type="checkbox" />
          <span onClick={handleToggleStarred}>
            <i className={`fa-solid fa-star ${isStarred ? 'starred' : 'unstarred'}`}></i>
          </span>
        </div>
        <span className={`email-from-txt ${isRead ? 'read' : 'unread'}`}>{mail.from}</span>
      </div>
      <div className="email-body" style={{ flex: 2 }}>
        <span className={isRead ? 'read' : 'unread'}>
          {mail.subject}
          <span className="makaf">-</span>
        </span>
        <span className="email-body-txt">{mail.text ? mail.text.substring(0, 100) : ''}</span>
      </div>
      <span className={`email-row-date ${isRead ? 'read' : 'unread'}`}>{formattedDate}</span>
      <div className={`email-icons-container ${isRead ? 'read' : 'unread'}`}>
        <span onClick={(e) => { e.stopPropagation(); handlePreviewClick(); }}>
          {isRead ? 
            <i title="Mark as unread" className="fa-regular fa-envelope email-row-icon"></i> : 
            <i title="Mark as read" className="fa-regular fa-envelope-open email-row-icon"></i>
          }
        </span>
        <i onClick={(e) => { e.stopPropagation(); onRemove(mail.id); }} title="Delete email" className="fa-regular fa-trash-can email-row-icon"></i>
      </div>
    </Link>
  );
}

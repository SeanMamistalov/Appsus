import { MailList } from '../cmps/MailList.jsx';

export function MailStarred({ mails, onRemove, onMarkAsRead, onToggleStarred }) {
  const starredMails = mails.filter(mail => mail.starred);

  return (
    <MailList
      mails={starredMails}
      onRemove={onRemove}
      onMarkAsRead={onMarkAsRead}
      onToggleStarred={onToggleStarred}
    />
  );
}

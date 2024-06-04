import { MailList } from '../cmps/MailList.jsx';

export function MailInbox({ mails, onRemove, onMarkAsRead, onToggleStarred }) {
  const inboxMails = mails.filter(mail => !mail.trash && !mail.draft);

  return (
    <MailList
      mails={inboxMails}
      onRemove={onRemove}
      onMarkAsRead={onMarkAsRead}
      onToggleStarred={onToggleStarred}
    />
  );
}

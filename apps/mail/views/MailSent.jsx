import { MailList } from '../cmps/MailList.jsx';

export function MailSent({ mails, onRemove }) {
  const sentMails = mails.filter(mail => mail.sent);

  return (
    <MailList
      mails={sentMails}
      onRemove={onRemove}
    />
  );
}

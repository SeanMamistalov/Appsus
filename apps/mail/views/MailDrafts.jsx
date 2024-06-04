import { MailList } from '../cmps/MailList.jsx';

export function MailDrafts({ mails, onRemove }) {
  const draftMails = mails.filter(mail => mail.draft);

  return (
    <MailList
      mails={draftMails}
      onRemove={onRemove}
    />
  );
}

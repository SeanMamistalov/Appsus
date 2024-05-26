import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({ mails, onRemove, onMarkAsRead }) {
  if (!mails) {
    return <div>Loading...</div>;
  }

  if (mails.length === 0) {
    return <div>No mails to display</div>;
  }

  return (
    <section className="mail-list">
      <ul>
        {mails.map((mail) => (
          <li key={mail.id}>
            <MailPreview mail={mail} onMarkAsRead={onMarkAsRead} onRemove={onRemove} />
          </li>
        ))}
      </ul>
    </section>
  );
}

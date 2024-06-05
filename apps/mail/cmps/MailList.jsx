import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({ mails, onRemove, onMarkAsRead, onToggleStarred }) {
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
<MailPreview
          key={mail.id}
          mail={mail}
          onRemove={onRemove}
          onMarkAsRead={onMarkAsRead}
          onToggleStarred={onToggleStarred}
        />
      </li>
        ))}
      </ul>
    </section>
  );
}

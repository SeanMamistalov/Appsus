import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailList({ mails, onRemove }) {
    if (!mails) {
        return <div className="loading">Loading...</div>;
    }

    if (mails.length === 0) {
        return <div className="no-mails">No mails to display</div>;
    }

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className="mail-item">
                        <MailPreview mail={mail} />
                        <button className="remove-btn" onClick={() => onRemove(mail.id)}>X</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
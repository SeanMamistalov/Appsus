import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailList({ mails, onRemove }) {
    if (!mails || mails.length === 0) {
        return <div>No mails to display</div>;
    }

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id}>
                        <MailPreview mail={mail} />
                        <button onClick={() => onRemove(mail.id)}>X</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
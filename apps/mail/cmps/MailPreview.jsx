export function MailPreview({ mail }) {
    return (
        <div className="email-item">
            <span className="email-sender">{mail.from}</span>
            <span className="email-subject">{mail.subject}</span>
            <span className="email-time">{new Date(mail.sentAt).toLocaleTimeString()}</span>
        </div>
    );
}

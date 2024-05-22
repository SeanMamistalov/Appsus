export function MailPreview({ mail }) {
    return (
        <article className="email-preview">
            <p>From: {mail.from}</p>
            <p>Subject: {mail.subject}</p>
            <p>Body: {mail.body}</p>
        </article>
    );
}

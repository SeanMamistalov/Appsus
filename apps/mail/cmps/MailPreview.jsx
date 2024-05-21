export function MailPreview({ mail }) {
    return (
        <article className="email-preview">
            <p>{mail.from}</p>
            <p>{mail.subject} - {mail.body}</p>
            <p>{mail.sentAt}</p>
        </article>
    )
}
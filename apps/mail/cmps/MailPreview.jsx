// export function MailPreview({ mail }) {
//     return (
//         <article className="email-preview">
//             <p>From: {mail.from}</p>
//             <p>Subject: {mail.subject}</p>
//             <p>Body: {mail.body}</p>
//         </article>
//     );
// }

export function MailPreview({ mail }) {
    return (
        <article className="email-preview">
            <div className="email-header">
                <div className="email-sender">{mail.from}</div>
                <div className="email-time">{formatTime(mail.sentAt)}</div>
            </div>
            <div className="email-details">
                <div className="email-subject">{mail.subject}</div>
                <div className="email-body">{mail.body}</div>
            </div>
        </article>
    );
}

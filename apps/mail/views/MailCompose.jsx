const { useState } = React
import { emailService } from "../services/mail.service.js"

export function EmailCompose({ onEmailSent }) {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newEmail = { to, subject, body, id: Date.now(), isRead: false, starred: false, sentAt: new Date() };
      emailService.sendEmail(newEmail).then(() => {
        onEmailSent(newEmail);
        setTo('');
        setSubject('');
        setBody('');
      });
    };
  
    return (
      <section className="email-compose">
        <h2>New Message</h2>
        <form onSubmit={handleSubmit}>
          <label>
            To:
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
          <label>
            Body:
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </section>
    );
  }
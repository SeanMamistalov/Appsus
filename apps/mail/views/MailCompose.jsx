const { useState } = React;

export function EmailCompose({ onEmailSent, onCloseCompose }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmail = {
      id: Date.now().toString(),
      sender: 'me@example.com',
      to,
      subject,
      body,
      sentAt: new Date(),
      isRead: false,
      starred: false
    };
    onEmailSent(newEmail);
    setTo('');
    setSubject('');
    setBody('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'to') setTo(value);
    if (name === 'subject') setSubject(value);
    if (name === 'body') setBody(value);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onCloseCompose();
  };

  return (
    <section className="compose-modal-container">
      <div className="compose-header">
        <p>New Message</p>
        <span><i onClick={handleClose} className="fa-solid fa-x"></i></span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          required
          onChange={handleChange}
          type="email"
          name="to"
          value={to}
          placeholder="To"
          className="compose-input"
        />
        <div className='line'></div>
        <input
          required
          onChange={handleChange}
          type="text"
          name="subject"
          value={subject}
          placeholder="Subject"
          className="compose-input"
        />
        <div className='line'></div>
        <textarea
          required
          onChange={handleChange}
          name="body"
          value={body}
          className="compose-body"
          placeholder=""
        />
        <div className="form-lower-buttons">
          <button type="submit">Send</button>
          <i onClick={handleClose} className="fa-regular fa-trash-can delete-compose-icon"></i>
        </div>
      </form>
    </section>
  );
}

export function MailIndex() {
  return (
    <div>
      <header>
        <span className="material-icons">menu</span>
        <img className="gmail-logo" src="assets/img/gmail_logo.png" alt="gmail-logo" />
      </header>
      <div className="sidebar-gmail">
        <div className="sidebar-item inbox">
          <span className="material-icons">inbox</span> Inbox
        </div>
        <div className="sidebar-item starred">
          <span className="material-icons">star</span> Starred
        </div>
        <div className="sidebar-item sent">
          <span className="material-icons">send</span> Sent
        </div>
        <div className="sidebar-item trash">
          <span className="material-icons">delete</span> Trash
        </div>
        <div className="sidebar-item drafts">
          <span className="material-icons">drafts</span> Drafts
        </div>
      </div>
      <main>
        <h2>Inbox</h2>
        <div className="email-item">
          <div className="email-sender">John Doe</div>
          <div className="email-subject">Meeting Reminder</div>
          <div className="email-time">10:00 AM</div>
        </div>
        <div className="email-item">
          <div className="email-sender">Jane Smith</div>
          <div className="email-subject">Project Updates</div>
          <div className="email-time">Yesterday</div>
        </div>
      </main>
      <section>
        <h2>Trash</h2>
      </section>
      <section>
        <h2>Drafts</h2>
      </section>
    </div>
  );
}

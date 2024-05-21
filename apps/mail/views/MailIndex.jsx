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
    </div>
  );
}

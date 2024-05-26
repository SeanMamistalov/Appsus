const { useState, useEffect } = React;
const { useSearchParams } = ReactRouterDOM;
const { NavLink } = ReactRouterDOM
import { emailService } from "../services/mail.service.js";
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js";
import { MailList } from "../cmps/MailList.jsx";


function getFilterFromSearchParams(searchParams) {
  const filter = {};
  for (const [key, value] of searchParams.entries()) {
    filter[key] = value;
  }
  return filter;
}

export function MailIndex() {
  const [mails, setMails] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(getFilterFromSearchParams(searchParams));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSearchParams(filterBy);
    emailService
      .query(filterBy)
      .then((mails) => setMails(mails))
      .catch((err) => showErrorMsg('Failed to fetch notes'));
  }, [filterBy, setSearchParams]);

  function onSetFilterBy(newFilter) {
    setFilterBy(newFilter);
  }

  function removeMail(mailId) {
    emailService
      .remove(mailId)
      .then(() => {
        setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId));
        showSuccessMsg(`mail ${mailId} removed successfully!`);
      })
      .catch((err) => {
        showErrorMsg('Failed to remove mail');
      });
  }

  function markAsRead(mailId) {
    emailService
      .markAsRead(mailId)
      .then(() => {
        setMails((prevMails) => {
          return prevMails.map((mail) => {
            if (mail.id === mailId) {
              return { ...mail, isRead: true };
            }
            return mail;
          });
        });
      })
      .then(() => {
        const unreadMailsCount = mails.filter((mail) => !mail.isRead).length;
        console.log('Unread mails count:', unreadMailsCount);
      })
      .catch((err) => showErrorMsg('Failed to mark mail as read'));
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const unreadMailsCount = mails.filter((mail) => !mail.isRead).length;

  return (
    <section className={`mail-index ${isSidebarOpen ? 'sidebar-open' : ''}`}>
    <span className="material-icons menu-icon" onClick={toggleSidebar}>menu</span>
    <nav className="sidebar-gmail">
      <img className="gmail-logo" src="assets/img/gmail_logo.png" alt="gmail-logo" />
        <NavLink className={({ isActive }) => `sidebar-item inbox${isActive ? ' active' : ''}`} to="/mail/inbox">
          <span className="material-icons">inbox</span> Inbox {unreadMailsCount > 0 && `(${unreadMailsCount})`}
        </NavLink>
        <NavLink className={({ isActive }) => "sidebar-item starred" + (isActive ? " active" : "")} to="/mail/starred">
          <span className="material-icons">star</span> Starred
        </NavLink>
        <NavLink className={({ isActive }) => "sidebar-item sent" + (isActive ? " active" : "")} to="/mail/sentEmails">
          <span className="material-icons">send</span> Sent
        </NavLink>
        <NavLink className={({ isActive }) => "sidebar-item trash" + (isActive ? " active" : "")} to="/mail/trash">
          <span className="material-icons">delete</span> Trash
        </NavLink>
        <NavLink className={({ isActive }) => "sidebar-item drafts" + (isActive ? " active" : "")} to="/mail/drafts">
          <span className="material-icons">drafts</span> Drafts
        </NavLink>
      </nav>
      <MailList mails={mails} onRemove={removeMail} onMarkAsRead={markAsRead} />
    </section>
  );
}
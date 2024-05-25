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
  const [filterBy, setFilterBy] = useState(
    getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(filterBy);
    emailService
      .query(filterBy)
      .then((mails) => setMails(mails))
      .catch((err) => showErrorMsg("Failed to fetch notes"));
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
        showErrorMsg("Failed to remove mail");
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
      .catch((err) => showErrorMsg("Failed to mark mail as read"));
  }

//   return (
//     <section className="mail-index">
//       <MailSidebar />
//       <MailList mails={mails} onRemove={removeMail} onMarkAsRead={markAsRead} />
//     </section>
    
//   );
// }

return (
  <section className="mail-index">
      <nav className="sidebar-gmail">
      <span className="material-icons">menu</span>
      <img className="gmail-logo" src="assets/img/gmail_logo.png" alt="gmail-logo" />
          <NavLink 
              className={({ isActive }) => "sidebar-item inbox" + (isActive ? " active" : "")} 
              to="/mail/inbox">
              <span className="material-icons">inbox</span> Inbox
          </NavLink>
          <NavLink 
              className={({ isActive }) => "sidebar-item starred" + (isActive ? " active" : "")} 
              to="/mail/starred">
              <span className="material-icons">star</span> Starred
          </NavLink>
          <NavLink 
              className={({ isActive }) => "sidebar-item sent" + (isActive ? " active" : "")} 
              to="/mail/sentEmails">
              <span className="material-icons">send</span> Sent
          </NavLink>
          <NavLink 
              className={({ isActive }) => "sidebar-item trash" + (isActive ? " active" : "")} 
              to="/mail/trash">
              <span className="material-icons">delete</span> Trash
          </NavLink>
          <NavLink 
              className={({ isActive }) => "sidebar-item drafts" + (isActive ? " active" : "")} 
              to="/mail/drafts">
              <span className="material-icons">drafts</span> Drafts
          </NavLink>
      </nav>
      <MailList mails={mails} onRemove={removeMail} onMarkAsRead={markAsRead} />
  </section>
)
}


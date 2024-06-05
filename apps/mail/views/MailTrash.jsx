// const { useState, useEffect } = React;
// import { MailList } from '../cmps/MailList.jsx';
// import { emailService } from "../services/mail.service.js";
// import { showErrorMsg } from "../../../services/event-bus.service.js";


// export function MailTrash({ onRemove }) {
//   const [trashMails, setTrashMails] = useState([]);

//   useEffect(() => {
//     fetchTrashedMails();
//   }, []);

//   const fetchTrashedMails = () => {
//     emailService
//       .query({ status: "trash" }) // Fetch trashed mails
//       .then((mails) => setTrashMails(mails))
//       .catch((err) => console.error("Error fetching trashed mails:", err));
//   };

//   const handleRemove = (mailId) => {
//     emailService
//       .remove(mailId) // Remove mail
//       .then(() => {
//         // After removing the mail, fetch updated trashed mails
//         fetchTrashedMails();
//         showSuccessMsg(`Mail ${mailId} removed successfully!`);
//       })
//       .catch((err) => showErrorMsg("Failed to remove mail"));
//   };

//   return (
//     <MailList
//       mails={trashMails}
//       onRemove={handleRemove}
//     />
//   );
// }

const { useState, useEffect } = React

import { emailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

export function MailTrash() {
    const [trashedMails, setTrashedMails] = useState([]);
  
    useEffect(() => {
      emailService.query({ status: 'trash', isTrashed: true })
        .then(mails => setTrashedMails(mails))
        .catch(err => showErrorMsg('Failed to fetch trashed mails'));
    }, []);
  
    function restoreMail(mailId) {
      emailService.get(mailId)
        .then(mail => {
          mail.isTrashed = false;
          return emailService.save(mail);
        })
        .then(() => {
          setTrashedMails(prevMails => prevMails.filter(mail => mail.id !== mailId));
          showSuccessMsg(`Mail ${mailId} restored successfully!`);
        })
        .catch(err => showErrorMsg('Failed to restore mail'));
    }
  
    function deleteMailPermanently(mailId) {
      emailService.deletePermanently(mailId)
        .then(() => {
          setTrashedMails(prevMails => prevMails.filter(mail => mail.id !== mailId));
          showSuccessMsg(`Mail ${mailId} deleted permanently!`);
        })
        .catch(err => showErrorMsg('Failed to delete mail'));
    }
  
    return (
      <section className="mail-index-container">
        <div className="mail-list-container">
          {trashedMails.length === 0 ? (
            <div className="empty-mail-message">No mails in the trash</div>
          ) : (
            <ul className="mail-list">
              {trashedMails.map(mail => (
                <li key={mail.id} className="mail-trash-item">
                  <h3>{mail.subject}</h3>
                  <p>{mail.body}</p>
                  <div className="buttons-container">
                    <button className="icon-button" onClick={() => restoreMail(mail.id)}>
                      <span className="material-icons icon">restore</span>
                    </button>
                    <button className="icon-button" onClick={() => deleteMailPermanently(mail.id)}>
                      <span className="material-icons icon">delete_forever</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }
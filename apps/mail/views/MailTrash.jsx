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

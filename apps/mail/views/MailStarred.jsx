// import { MailList } from '../cmps/MailList.jsx';
// import { emailService } from '../services/mail.service.js';
// import { MailIndex } from '../views/MailIndex.jsx';
// export function MailStarred({ mails, onRemove, onMarkAsRead, onToggleStarred }) {
//   const toggleStarred = (mailId) => {
//     const updatedMails = mails.map(mail => {
//       if (mail.id === mailId) {
//         return { ...mail, isStarred: !mail.isStarred };
//       }
//       return mail;
//     });

//     onToggleStarred(updatedMails);

//     emailService.toggleStarred(mailId)
//       .then(() => {
//       })
//       .catch(err => {
//         onToggleStarred(mails);
//         console.error('Failed to toggle starred status:', err);
//       });
//   };

//   return (
//     <MailList
//       mails={mails}
//       onRemove={onRemove}
//       onMarkAsRead={onMarkAsRead}
//       onToggleStarred={toggleStarred} 
//     />
//   );
// }

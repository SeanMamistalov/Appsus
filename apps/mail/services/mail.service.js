import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js"
const MAIL_KEY = 'emailDB';

_createMails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    setMailSort,
    getEmptyMail,
    _createMails,
    getFilterFromSearchParams,
  };

  function query(filterBy) {
    return storageService.query(MAIL_KEY)
      .then(mails => {
        if (filterBy.status) {
          switch (filterBy.status) {
            case 'inbox':
              mails = mails.filter(mail => mail.to === gLoggedinUser.email);
              break;
            case 'sent':
              mails = mails.filter(mail => mail.from === gLoggedinUser.email && mail.sentAt !== 0);
              break;
            case 'draft':
              mails = mails.filter(mail => mail.from === gLoggedinUser.email && !mail.removedAt);
              break;
            case 'starred':
              mails = mails.filter(mail => mail.isStarred);
              break;
          }
        }
        return mails
    })
    .catch(err => {
      console.error('Error querying mails:', err);
      throw err; 
  });
}

function getFilterFromSearchParams(searchParams) {
  const filterBy = {};
  if (searchParams.has('status')) filterBy.status = searchParams.get('status');
  return filterBy;
}


  function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
  }
  
  function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
  }
  
  function save(mail) {
    if (mail.id) {
      return storageService.put(MAIL_KEY, mail)
    } else {
      return storageService.post(MAIL_KEY, mail)
    }
  }

  function getEmptyMail(subject = '', body = '', to = '') {
    return {
      id: '',
      subject,
      body,
      isRead: true,
      isStarred: false,
      sentAt: 0,
      removedAt: null,
      from: gLoggedinUser.email,
      to
    }
  }

  function getDefaultFilter() {
    return {
      status: '',
      txt: '',
      readStat: 'all',
      isStarred: '',
      labels: []
    }
  }

  
function setMailSort(mails, sortBy = {}) {
    if (sortBy.sentAt !== undefined) {
        mails => mails.sort((m1, m2) => (m1.sentAt - m2.sentAt) * sortBy.sentAt)
    } else if (sortBy.subject !== undefined) {
        mails => mails.sort((m1, m2) => m1.subject.localeCompare(m2.subject) * sortBy.subject)
  
    }
  }

  function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY);
    if (!mails || !mails.length) {
        mails = [];
        for (let i = 0; i < 5; i++) {
            const newMail = {
                id: utilService.makeId(6),
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(50),
                isRead: false,
                sentAt: utilService.randomPastTime(),
                removedAt: null,
                from: `Daniel&Sean${i}@CodingAcademy.com`,
                to: 'Sean&Daniel@Appsus.com'
            };
            mails.push(newMail);
        }
        utilService.saveToStorage(MAIL_KEY, mails); // Save all mails at once
    }
    return mails;
}

//   function _createMails(){
//     let mails = utilService.loadFromStorage(MAIL_KEY)
//     if (!mails || !mails.length) {
//       mails = []
//         for (let i = 0; i < 5; i++) {
//         const mails = [
//       {
//         id: 'e101',
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometime',
//         isRead: false,
//         sentAt: 1551133930594,
//         removedAt: null,
//         from: 'momo@momo.com',
//         to: 'user@appsus.com'
//       },
  
//       {
//           id: 'e102',
//           subject: 'Miss xoxo!',
//           body: 'Would love to catch up sometime',
//           isRead: false,
//           sentAt: 1551154930594,
//           removedAt: null,
//           from: 'momo@momo.com',
//           to: 'user@appsus.com'
//         },
//         {
//           id: 'e103',
//           subject: 'You the best!',
//           body: 'Would love to catch up sometime',
//           isRead: false,
//           sentAt: 1551133930522,
//           removedAt: null,
//           from: 'momo@momo.com',
//           to: 'user@appsus.com'
//         },
//         {
//           id: 'e104',
//           subject: 'No you!',
//           body: 'Would love to catch up sometime',
//           isRead: false,
//           sentAt: 1551133930114,
//           removedAt: null,
//           from: 'momo@momo.com',
//           to: 'user@appsus.com'
//         },
//         {
//           id: 'e105',
//           subject: 'Love you!',
//           body: 'Would love to catch up sometime',
//           isRead: false,
//           sentAt: 1551155660594,
//           removedAt: null,
//           from: 'momo@momo.com',
//           to: 'user@appsus.com'
//         },
//         {
//           id: 'e106',
//           subject: 'Miss your mom!',
//           body: 'Would love to catch up sometime',
//           isRead: false,
//           sentAt: 1551133970594,
//           removedAt: null,
//           from: 'momo@momo.com',
//           to: 'user@appsus.com'
//         },
//         {
//           id: 'e107',
//           subject: 'Miss your dad!',
//           body: 'Would love to catch up sometime',
//           isRead: false,
//           sentAt: 1551133934394,
//           removedAt: null,
//           from: 'momo@momo.com',
//           to: 'user@appsus.com'
//         },
//     ];
//     mails.forEach(mail => {
//       save(mail);
//     });
  
//     return mails;
//   }
// }
//   const gLoggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Seniel Appsus'
//   };

//   const criteria = {
//     status: 'inbox',
//     txt: 'Miss',
//     isRead: false,
//     isStared: true,
//     labels: ['important', 'romantic']
//   };
// }

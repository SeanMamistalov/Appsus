import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";
const MAIL_KEY = "emailDB";

_createMails();
const emails = [];
export const emailService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  setMailSort,
  getEmptyMail,
  _createMails,
  _setNextPrevMailId,
  getFilterFromSearchParams,
  markAsRead,
  getById,
  getEmails,
  sendEmail,
  deletePermanently,
};

function getEmails() {
  return storageService.query(MAIL_KEY);
}
function sendEmail(email) {
  emails.push(email);
  return Promise.resolve(email);
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => {
    mail = _setNextPrevMailId(mail);
    return mail;
  });
}

function getById(mailId) {
  const mails = utilService.loadFromStorage("MAIL_KEY") || [];
  const mail = mails.find((mail) => mail.id === mailId);
  console.log("Fetched mail:", mail);

  return Promise.resolve(mail);
}

function query(filterBy) {
  return storageService
    .query(MAIL_KEY)
    .then((mails) => {
      if (filterBy.status) {
        switch (filterBy.status) {
          // case "inbox":
          //   mails = mails.filter((mail) => mail.to === gLoggedinUser.email);
          //   break;
          // case "sent":
          //   mails = mails.filter(
          //     (mail) => mail.from === gLoggedinUser.email && mail.sentAt !== 0
          //   );
          //   break;
          // case "draft":
          //   mails = mails.filter(
          //     (mail) => mail.from === gLoggedinUser.email && !mail.removedAt
          //   );
          //   break;
        case "trash":
          mails = mails.filter((mail) => mail.isTrashed === filterBy.isTrashed)
          break;
          case "starred":
            mails = mails.filter((mail) => mail.isStarred);
            break;
        }
      }
      console.log('mails', mails);
      return mails;
    })
    .catch((err) => {
      console.error("Error querying mails:", err);
      throw err;
    });
}


function markAsRead(mailId) {
  let mails = utilService.loadFromStorage("MAIL_KEY") || [];
  const mail = mails.find((mail) => mail.id === mailId);
  if (mail) {
    mail.isRead = true;
    utilService.saveToStorage("MAIL_KEY", mails);
  }
  return Promise.resolve(mail);
}

function getFilterFromSearchParams(searchParams) {
  const filterBy = {};
  if (searchParams.has("status")) filterBy.status = searchParams.get("status");
  return filterBy;
}

function remove(mailId) {
  return storageService.get(MAIL_KEY, mailId).then(mail => {
    mail.isTrashed = true;
    return storageService.put(MAIL_KEY, mail);
  });
}

function save(mail) {
  if (!mail) return
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail);
  } else {
    return storageService.post(MAIL_KEY, mail);
  }
}

function deletePermanently(mailId) {
  return storageService.remove(MAIL_KEY, mailId);
}


function getEmptyMail(subject = "", body = "", to = "") {
  return {
    id: "",
    subject,
    body,
    isRead: true,
    isStarred: false,
    sentAt: 0,
    removedAt: null,
    from: gLoggedinUser.email,
    to,
  };
}

function getDefaultFilter() {
  return {
    status: "",
    txt: "",
    readStat: "all",
    isStarred: "",
    labels: [],
  };
}

function setMailSort(mails, sortBy = {}) {
  if (sortBy.sentAt !== undefined) {
    (mails) => mails.sort((m1, m2) => (m1.sentAt - m2.sentAt) * sortBy.sentAt);
  } else if (sortBy.subject !== undefined) {
    (mails) =>
      mails.sort(
        (m1, m2) => m1.subject.localeCompare(m2.subject) * sortBy.subject
      );
  }
}

function _setNextPrevMailId(mail) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id);
    if (mailIdx === -1) {
      throw new Error("Mail not found");
    }
    const nextMail = mails[(mailIdx + 1) % mails.length];
    const prevMail = mails[(mailIdx - 1 + mails.length) % mails.length];
    mail.nextMailId = nextMail.id;
    mail.prevMailId = prevMail.id;
    return mail;
  });
}

// function _createMails() {
//   let mails = utilService.loadFromStorage(MAIL_KEY);
//   if (!mails || !mails.length) {
//     mails = [];
//     for (let i = 0; i < 5; i++) {
//       const newMail = {
//         id: utilService.makeId(6),
//         subject: utilService.makeLorem(2),
//         body: utilService.makeLorem(50),
//         isRead: false,
//         sentAt: utilService.randomPastTime(),
//         removedAt: null,
//         from: `AppsusUser${i}@gmail.com`,
//         to: "AppsusReceive@Appsus.com",
//       };
//       mails.push(newMail);
//     }
//     utilService.saveToStorage(MAIL_KEY, mails);
//   }
//   return mails;
// }


function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {

      mails = [{
          id: 'e101',
          subject: 'Miss you!',
          body: 'Would love to catch up sometimes',
          isRead: false,
          isStarred: false,
          sentAt: 1551133930594,
          removedAt: null,
          from: 'momo@momo.com',
          to: 'user@appsus.com',
          labels: []
      }, {
          id: 'e102',
          subject: 'Happy to see you!',
          body: 'I was so happy to see you yesterday at the club would like to meet.',
          isRead: false,
          isStarred: false,
          sentAt: 1521133930594,
          removedAt: null,
          from: 'MamistalovSean@gmail.com',
          to: 'user@appsus.com',
          labels: []
      }, {
          id: 'e103',
          subject: 'Gift!',
          body: 'Hello, you have a secret gift waiting for you in this email',
          isRead: false,
          isStarred: false,
          sentAt: 1351133932594,
          removedAt: null,
          from: 'DanielYacovi@gmail.com',
          to: 'user@appsus.com',
          labels: []
      },
      {
          id: 'e104',
          subject: 'Miss you!',
          body: 'Would love to catch up sometimes',
          isRead: false,
          isStarred: false,
          sentAt: 1531133933594,
          removedAt: null,
          from: 'vickypolatov@gmail.com',
          to: 'user@appsus.com',
          labels: []
      },
      {
          id: 'e105',
          subject: 'Coding Academy OctEve2023-4!',
          body: 'Coding is life',
          isRead: false,
          isStarred: false,
          sentAt: 1251122930594,
          removedAt: null,
          from: 'YaronBiton@gmail.com',
          to: 'user@appsus.com',
          labels: []
      },
      {
          id: 'e106',
          subject: 'Appsus',
          body: 'I believe my app is the best!',
          isRead: false,
          isStarred: false,
          sentAt: 1651122933594,
          removedAt: null,
          from: 'user@appsus.com',
          to: 'CodingAcademy@gmail.com',
          labels: []
      },
      {
          id: 'e107',
          subject: 'Hey hey',
          body: 'what is goin on? ',
          isRead: false,
          isStarred: false,
          sentAt: 1622323930594,
          removedAt: null,
          from: 'user@appsus.com',
          to: 'reut@yahoo.com',
          labels: []
      }, {
          id: 'e108',
          subject: 'Are we good enough?',
          body: 'I believe you are good enough',
          isRead: false,
          isStarred: false,
          sentAt: 1422322230294,
          removedAt: null,
          from: 'good@appsus.com',
          to: 'user@appsus.com',
          labels: []
      }, {
          id: 'e109',
          subject: 'Wow what a react project!',
          body: 'Amazing project Sean and Daniel!',
          isRead: false,
          isStarred: false,
          sentAt: 1622322930222,
          removedAt: null,
          from: 'reactMaker@appsus.com',
          to: 'user@appsus.com',
          labels: []
      }, {
          id: 'e110',
          subject: 'Timeline',
          body: 'How are you Sean ? hows goin on with the sprint?',
          isRead: false,
          isStarred: false,
          sentAt: 1622444430222,
          removedAt: null,
          from: 'WhoIsIt@gmail.com',
          to: 'user@appsus.com',
          labels: []
      },
      {
          id: 'e111',
          subject: 'Thanks for applying!',
          body: 'Thanks for applying, you are overqualified for us.',
          isRead: false,
          isStarred: false,
          sentAt: 1655544430222,
          removedAt: null,
          from: 'FantasyJob@Fantasy.com',
          to: 'user@appsus.com',
          labels: []
      },


      ]

      utilService.saveToStorage(MAIL_KEY, mails)
  }

}

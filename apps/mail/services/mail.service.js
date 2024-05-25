import { storageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";
const MAIL_KEY = "emailDB";

_createMails();

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
};

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
          case "inbox":
            mails = mails.filter((mail) => mail.to === gLoggedinUser.email);
            break;
          case "sent":
            mails = mails.filter(
              (mail) => mail.from === gLoggedinUser.email && mail.sentAt !== 0
            );
            break;
          case "draft":
            mails = mails.filter(
              (mail) => mail.from === gLoggedinUser.email && !mail.removedAt
            );
            break;
          case "starred":
            mails = mails.filter((mail) => mail.isStarred);
            break;
        }
      }
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
  return storageService.remove(MAIL_KEY, mailId);
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail);
  } else {
    return storageService.post(MAIL_KEY, mail);
  }
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
        from: `AppsusUser${i}@gmail.com`,
        to: "AppsusReceive@Appsus.com",
      };
      mails.push(newMail);
    }
    utilService.saveToStorage(MAIL_KEY, mails);
  }
  return mails;
}

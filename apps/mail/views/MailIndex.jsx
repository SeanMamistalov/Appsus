// const { useEffect, useState } = React
// import { MailPreview } from '../apps/mail/cmps/MailPreview.jsx'
// import { emailService } from '../apps/mail/services/mail.service.js'

export function MailIndex() {
    // const [mails, setMails] = useState([])

    // useEffect(() => {
    //     emailService.createMails()

    //     emailService.query({ status: 'inbox' })
    //         .then(fetchedMails => {
    //             setMails(fetchedMails)
    //         })
    // }, [])

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
            {/* <div className="mail-list">
                {mails.map(mail => (
                    <MailPreview key={mail.id} mail={mail} />
                ))}
            </div> */}
        </div>
    )
}

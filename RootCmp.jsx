const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { EmailDetails } from "./apps/mail/views/MailDetails.jsx";
import { MailInbox } from "./apps/mail/views/MailInbox.jsx"
import { MailSent } from "./apps/mail/views/MailSent.jsx"
import { MailStarred } from "./apps/mail/views/MailStarred.jsx"
import { MailTrash } from "./apps/mail/views/MailTrash.jsx"
import { MailDrafts } from "./apps/mail/views/MailDrafts.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { Trash } from "./apps/note/views/Trash.jsx"
import { Archive } from "./apps/note/views/Archives.jsx"
import { NoteList } from "./apps/note/views/NoteList.jsx"
import { Reminders } from "./apps/note/views/Reminders.jsx"
import { EditLabels } from "./apps/note/views/Editlabels.jsx"
import { BookIndex } from "./apps/missBooks/views/BookIndex.jsx"
import { BookDetails } from "./apps/missBooks/views/BookDetails.jsx"
import { BookEdit } from "./apps/missBooks/views/BookEdit.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/inbox" element={<MailIndex />} />
                <Route path="/mail/starred" element={<MailStarred />} />
                <Route path="/mail/sent" element={<MailSent />} />
                <Route path="/mail/trash" element={<MailTrash />} />
                <Route path="/mail/drafts" element={<MailDrafts />} />
                <Route path="/mail/:mailId" element={<EmailDetails />} />
                <Route path="/note" element={<NoteIndex />} >
                <Route index element={<Navigate to="/note/noteList" />} />
                    <Route path="/note/noteList" element={<NoteList />}/>
                    <Route path="/note/reminders" element={<Reminders />}/>
                    <Route path="/note/editLabels" element={<EditLabels />}/>
                    <Route path="/note/archives" element={<Archive />}/>
                    <Route path="/note/trash" element={<Trash />}/>
                </Route>
                <Route path="*" element={<Navigate to="/mail/inbox" />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/edit/" element={<BookEdit />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
            </Routes>
        </section>
    </Router>
}
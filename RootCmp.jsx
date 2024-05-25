const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"

import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { Trash } from "./apps/note/views/Trash.jsx"
import { Archives } from "./apps/note/views/Archives.jsx"
import { NoteList } from "./apps/note/views/NoteList.jsx"
import { Reminders } from "./apps/note/views/Reminders.jsx"
import { EditLabels } from "./apps/note/views/Editlabels.jsx"

import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { EmailDetails } from "./apps/mail/views/MailDetails.jsx";
import { MailStarred } from "./apps/mail/views/Starred.jsx"
import { MailSent } from "./apps/mail/views/Sent.jsx"
import { MailTrash } from "./apps/mail/views/Trash.jsx"
import { MailDrafts } from "./apps/mail/views/Drafts.jsx"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<EmailDetails />} />
                <Route path="/mail/inbox" element={<MailIndex />}/>
                <Route path="/mail/starred" element={<MailStarred />}/>
                <Route path="/mail/sent" element={<MailSent />}/>
                <Route path="/mail/trash" element={<MailTrash />}/>
                <Route path="/mail/drafts" element={<MailDrafts />}/>

                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/noteList" element={<NoteList />}/>
                    <Route path="/note/reminders" element={<Reminders />}/>
                    <Route path="/note/editLabels" element={<EditLabels />}/>
                    <Route path="/note/archives" element={<Archives />}/>
                    <Route path="/note/trash" element={<Trash />}/>
                </Route>
            </Routes>
        </section>
    </Router>
}

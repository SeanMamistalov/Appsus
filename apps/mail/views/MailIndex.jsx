const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM
import { emailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailSidebar } from './MailSidebar.jsx'

function getFilterFromSearchParams(searchParams) {
    const filter = {};
    for (const [key, value] of searchParams.entries()) {
        filter[key] = value;
    }
    return filter;
}

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(getFilterFromSearchParams(searchParams));
    useEffect(() => {
        setSearchParams(filterBy)
        emailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => showErrorMsg('Failed to fetch notes'))
    }, [filterBy, setSearchParams])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function removeMail(mailId) {
        emailService.remove(mailId)
            .then(() => {
                setNotes(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`mail ${mailId} removed successfully!`)
            })
            .catch(err => {
                showErrorMsg('Failed to remove mail')
            })
    }

    return (
        <section>
            <MailSidebar/>
            <MailList mails={mails} onRemove={removeMail} />
        </section>
    )
 }

const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;
const { Link } = ReactRouterDOM;

import { emailService } from "../services/mail.service.js";
import { MailIndex } from "../views/MailIndex.jsx";

export function EmailDetails({ removeMail }) {
  const [mail, setMail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    emailService.get(params.mailId)
      .then((mail) => {
        setMail(mail);
      })
      .catch(() => {
        alert("Couldn't get mail...");
        navigate("/mail");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.mailId, navigate]);

  if (isLoading) return <h3>Loading...</h3>;

  function getFormattedDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  return (
    <section className="email-details-container">
      <div className="icons-container">
        <Link to="/mail">
          <i title="Go back to inbox" className="fa-solid fa-arrow-left email-details-icon"></i>
        </Link>
        <i
          title="Delete email"
          className="fa-regular fa-trash-can email-details-icon"
          onClick={() => {
            removeMail(mail.id);
            navigate("/mail");
          }}
        ></i>
      </div>

      <h2 className="email-subject">{mail.subject}</h2>
      <div className="date-and-from-container">
        <h3>{mail.from}</h3>
        <span>{getFormattedDate(mail.sentAt)}</span>
      </div>
      <span className="to-txt">
        <span>to </span>
        {mail.to}
      </span>
      <hr />
      <p>{mail.body}</p>
    </section>
  );
}
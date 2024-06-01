const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;
const { Link } = ReactRouterDOM;

import { emailService } from "../services/mail.service.js";

export function EmailDetails() {
  const [mail, setMail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    emailService
      .get(params.mailId)
      .then((mail) => {
        setMail(mail);
      })
      .catch(() => {
        alert("Couldn`t get mail...");
        navigate("/mail");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.mailId]);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <section className="mail-details">
      <Link to="/mail">
        <button>X</button>
      </Link>
      <p>{mail.body}</p>
      <section className="actions">
        <Link to={`/mail/${mail.prevMailId}`}>
          <button>Prev</button>
        </Link>
        <Link to={`/mail/${mail.nextMailId}`}>
          <button>Next</button>
        </Link>
      </section>
    </section>
  );
}

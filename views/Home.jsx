const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home-view">
      <div className="hero">
        <h1>Welcome to Appsus!</h1>
        <p>We are here to provide you with top-notch development services.</p>
        <Link to="/mail"><button className="btn">Mail</button></Link>
        <Link to="/note"><button className="btn">Notes</button></Link>
        <Link to="/book"><button className="btn">Books</button></Link>
      </div>
    </section>
  );
}

const { Link } = ReactRouterDOM

export function Home() {
  return (
    <section className="home-view">
      <div className="hero">
      <img src="assets/img/horse-logo.jpg" alt="Horse Logo" className="logo" /> 
        <h1>Welcome to Appsus!</h1>
        <p>We are here to provide you with top-notch applications.</p>
        <Link to="/mail"><button className="btn">Mail</button></Link>
        <Link to="/note"><button className="btn">Notes</button></Link>
        <Link to="/book"><button className="btn">Books</button></Link>
      </div>
    </section>
  );
}
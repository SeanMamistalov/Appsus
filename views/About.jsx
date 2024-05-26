export function About() {
    return (
      <section className="about-view">
        <h1>About Us</h1>
  
        <div className="content">
          <p>
            This website was developed by <br>
            </br> <span>Sean Mamistalov & Daniel Yacovi</span>. <br></br>
            We are students in "Coding Academy".
          </p>
  
            <div className="teammate-sean">
              <h4>Sean Mamistalov</h4>
              <p>Email: seanmamistalov@gmail.com</p>
              <p>Github: <a href="https://github.com/SeanMamistalov">SeanMamistalov</a></p>
            </div>
            <div className="teammate-daniel">
              <h4>Daniel Yacovi</h4>
              <p>Email: danielyacovi@gmail.com</p>
              <p>Github: <a href="https://github.com/DanielYacovi">DanielYacovi</a></p>
            </div>
        </div>
      </section>
    );
  }
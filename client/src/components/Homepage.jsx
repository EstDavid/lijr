import { Link } from 'react-router-dom';

const Homepage = () => {
  const lines = [...Array(10).keys()];
  return (
    <div id="homepage">
      <div id="homepage-body">
        <div id="homepage-text">
          <div id="homepage-text-header">
            <div id="homepage-logo">LJ</div>
            <div>
              <h1 id="homepage-text-logo">LIJR</h1>
              <div>
                {'Journal Jour Life'.split(' ').map((word, index) => (
                  <h2 className="homepage-text-tagline" key={index}>
                    {word}
                  </h2>
                ))}
              </div>
            </div>
          </div>
          <div id="homepage-text-descriptions"></div>
        </div>
        <div id="journal-container">
          <div id="journal-outline">
            <div className="journal-pages journal-pages-left">
              {lines.map((line) => (
                <div className="journal-line" key={line}></div>
              ))}
              <button className="journal-button">
                <Link to="/login">Login</Link>
              </button>
            </div>
            <div className="journal-pages journal-pages-right">
              {lines.map((line) => (
                <div className="journal-line" key={line}></div>
              ))}
              <button className="journal-button">
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

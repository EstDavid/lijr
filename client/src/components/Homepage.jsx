import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faBullseye,
  faCompass,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

const Feature = ({ icon, title, description }) => {
  return (
    <div className="journal-page-feature">
      <div>
        <FontAwesomeIcon icon={icon} />
        <h2>{title}</h2>
      </div>
      <h3>{description}</h3>
    </div>
  );
};

const Homepage = () => {
  const lines = [...Array(10).keys()];

  const features = [
    {
      icon: faCompass,
      title: 'Life GPS',
      description:
        "Track your life's journey with LIJR. Set goals and track your progress."
    },
    {
      icon: faBrain,
      title: 'Clear your mind',
      description:
        'Write down your thoughts and feelings. LIJR is your personal journal'
    },
    {
      icon: faHeart,
      title: 'Track your emotions',
      description: 'Lijr allows you to track and connect with your emotions.'
    },
    {
      icon: faBullseye,
      title: 'Support your growth',
      description: 'Track your goals and find what motivates you.'
    }
  ];

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
          <div id="homepage-text-buttons">
            <button className="journal-button button-login">
              <Link to="/login">Login</Link>
            </button>
            <button className="journal-button button-signup">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
        <div id="journal-container">
          <div id="journal-outline">
            <div className="journal-pages journal-pages-left">
              {lines.map((line) => (
                <div className="journal-line" key={line}></div>
              ))}
              <div className="journal-page-box">
                {features.slice(0, 2).map((feature, index) => (
                  <Feature key={index} {...feature} />
                ))}
              </div>
            </div>
            <div className="journal-pages journal-pages-right">
              {lines.map((line) => (
                <div className="journal-line" key={line}></div>
              ))}
              <div className="journal-page-box">
                {features.slice(2).map((feature, index) => (
                  <Feature key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

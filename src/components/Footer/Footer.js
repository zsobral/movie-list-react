import React from 'react';
import { Github } from 'react-feather';

import './Footer.css';
import tmdbLogo from '../../assets/tmdb-logo.png';

function Footer () {

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <a href="https://github.com/zsobral/movie-list-react" target="_blank" rel="noopener noreferrer" >
          <Github size={40} />
        </a>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" >
          <img src={tmdbLogo} alt="the movie db attribution" />
        </a>
      </footer>
    </div>
  );
}

export default Footer;

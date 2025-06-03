import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Comdaily Brand Analyzer</div>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/new-analysis">New Analysis</Link>
        <Link to="/saved-analyses">Saved Analyses</Link>
      </div>
    </nav>
  );
}

export default NavBar;
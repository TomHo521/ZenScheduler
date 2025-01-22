import React from 'react';
import TopBar from './TopBar';
import './Layout.css';

const Layout = ({ children, title }) => {
  return (
    <div className="layout">
      <TopBar title={title} />
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
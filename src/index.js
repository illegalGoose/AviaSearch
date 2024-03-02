import React from 'react';
import ReactDOM from 'react-dom/client';
import Filters from './components/Filters';
import SearchResults from './components/SearchResults';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Filters />
    <div style={{display: 'grid', width: '40%'}}><SearchResults /></div>
  </React.StrictMode>
);

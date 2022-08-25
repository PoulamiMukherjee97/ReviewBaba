import React from 'react';
import RouteComponent from './routes/RouteComponent';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return <div>
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>

  </div>;

}

export default App;
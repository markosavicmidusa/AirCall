import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import BodyComp from './BodyComp.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <BodyComp />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;

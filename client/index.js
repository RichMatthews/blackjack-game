import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';

class Component extends React.Component{
  render(){
    return (
      <Game />
      )
  };
};

ReactDOM.render(<Component />,
    document.getElementById('content'));

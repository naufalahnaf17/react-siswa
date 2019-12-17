import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Component/Login';
import Main from './Component/Main';
import User from './Component/User/User';

if (localStorage.getItem('your-key')) {
  ReactDOM.render(<Main />,document.getElementById('main'));
  ReactDOM.render(<User />,document.getElementById('user'));
}else {
  ReactDOM.render(<Login />, document.getElementById('loginForm'));
}

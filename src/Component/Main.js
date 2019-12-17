import React,{Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router} from "react-router-dom";
import Menu from '../Component/Menu/Menu';
import MenuPath from '../Component/Menu/MenuPath';

class Main extends Component{

  render(){
    return (
      <Router>
        <aside className="left-sidebar">
        <div className="scroll-sidebar">
            <nav id="nav" className="sidebar-nav">
                <ul id="sidebar-nav">

                  {/*Untuk Menu*/}
                  <div id="menu">
                    <Menu />
                  </div>
                  {/*Untuk Content*/}

                </ul>
            </nav>
        </div>
      </aside>

      <div className="page-wrapper">
      <div className="container-fluid">

        {/*Untuk Content*/}
        <div id="path-content">
          <MenuPath />
        </div>
        {/*Untuk Content*/}

        </div>
      </div>
      </Router>
    );
  }

}

export default Main;

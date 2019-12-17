import React,{Component} from 'react'

class User extends Component{
  render(){

    return(
      <div className="User-Container mt-2">
        <li className="nav-item dropdown u-pro">
            <a className="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="asset_elite/images/users/1.jpg" alt="user" className=""></img>
              <span className="hidden-md-down ml-2">User Nama
                <i className="fa fa-angle-down"></i>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right animated flipInY">
                <button href="#" className="dropdown-item"><i className="ti-user"></i> My Profile</button>
                <a href="#" className="dropdown-item"><i className="ti-wallet"></i> My Balance</a>
                <a href="#" className="dropdown-item"><i className="ti-email"></i> Inbox</a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item"><i className="ti-settings"></i> Account Setting</a>
                <div className="dropdown-divider"></div>
                <a href="#"  className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a>
            </div>
        </li>
      </div>
    );

  }
}

export default User

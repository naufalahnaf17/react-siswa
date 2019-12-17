import React,{Component} from 'react'
import axios from 'axios'

class User extends Component{

  constructor(props){
    super(props)
    this.state = {
      imageURL : ''
    }
  }

  componentDidMount(){
    console.warn = console.error = () => {};
  }

  UNSAFE_componentWillMount(){
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then(response => {
      this.setState({ imageURL: response.data.message });
    })
    .catch(error => {
      console.log(error);
    });
  }

  btnLogout(e){
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
    this.props.history.push('/');
  }

  render(){

    return(
      <div className="User-Container mt-2">
        <li className="nav-item dropdown u-pro">
            <a className="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src={this.state.imageURL} alt="user" className=""></img>
              <span className="hidden-md-down ml-2">{localStorage.getItem('name')}
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
                <button onClick={this.btnLogout.bind(this)} href="#" className="dropdown-item"><i className="fa fa-power-off"></i> Logout</button>
            </div>
        </li>
      </div>
    );

  }
}

export default User

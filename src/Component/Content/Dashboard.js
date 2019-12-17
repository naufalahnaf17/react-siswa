import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Dashboard extends Component{

  constructor(props){
    super(props)
    this.btnLogout = this.btnLogout.bind(this)
  }

  btnLogout(event){
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
    this.props.history.push('/');
  }

  render(){
    return(
      <div className="Container">
        <div class="card">
          <div class="card-header">
            <button onClick={this.btnLogout} className="btn btn-danger">Logout</button>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <h1>Kamu Berada Di Dashboard</h1>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }

}

export default Dashboard;

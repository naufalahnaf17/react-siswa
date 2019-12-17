import React,{Component} from 'react';
import $ from 'jquery';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Main';
import '../Css/Login.css';
import 'bootstrap/dist/css/bootstrap.css';

class Login extends Component{

  state = {
    nis : '',
    password : ''
  }

  constructor(props){
    super(props)
    this.getNis = this.getNis.bind(this)
    this.getPassword = this.getPassword.bind(this)
    this.btnLogin = this.btnLogin.bind(this)
  }

  componentWillMount(){
    if (localStorage.getItem('your-key')) {
      ReactDOM.render(<Main />, document.getElementById('root'));
    }
  }

  componentDidMount(){
    this.setState({
        nis: '',
        password: ''
    })
    $('#loading').hide()
  }

  getNis(event){
    event.preventDefault()
    this.setState({
      nis : event.target.value
    })
  }

  getPassword(event){
    event.preventDefault()
    this.setState({
      password : event.target.value
    })
  }

  getChecked(){

    if (localStorage.getItem('your-key')) {
      this.props.history.push('/');
      window.location.reload()
    }else {
      alert('Login Gagal , Harap Login Kembali')
      return false;
    }

  }

  btnLogin(event){
    event.preventDefault()

    if (this.state.nis === "" || this.state.password === "") {
      alert('Isi Dulu Yang Kosong')
      return false;
    }else {
      $('#loading').show()

      axios({
          method : 'post',
          url : 'https://laravel.simkug.com/siswa-api/public/api/login',
          data : {
            nis : this.state.nis,
            password : this.state.password
          }
      }).then((response) => {
        localStorage.setItem('your-key' , response.data.success.token)

        // Request Details
        axios({
          method : 'post',
          url : 'https://laravel.simkug.com/siswa-api/public/api/details',
          headers : {
            'Authorization' : 'Bearer' + ' ' + response.data.success.token
          }
        }).then((response) => {

          $('#loading').css('display','none')
          $('#loading').hide()

          localStorage.setItem('name' , response.data.success.name)
          localStorage.setItem('kode_menu' , response.data.success.kode_menu)
          localStorage.setItem('url_photo' , response.data.success.url_photo)

          window.location.reload()

        })

      }).catch((error) => {
        alert('Nis Atau Password Salah')
      })

    }

  }

  render(){
    return(

      <div className="AppContainer">
        <center>
        <form style={{ width:400 , height:300 , margin : 150}}>
          <div className="form-group">
            <label style={{ float: 'left' }} htmlFor="exampleInputEmail1">Nis</label>
            <input onChange={this.getNis} type="text" className="form-control" placeholder="Masukan Nis"></input>
          </div>
          <div className="form-group">
            <label style={{ float: 'left' }} htmlFor="exampleInputPassword1">Password</label>
            <input onChange={this.getPassword} type="password" className="form-control" placeholder="Masukan Password"></input>
          </div>
          <div id="loading" className="loader"></div>
          <button onClick={this.btnLogin} style={{ float: 'left' }} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </center>
      </div>

    );
  }
}

export default Login;

import React,{Component} from 'react';
import Dashboard from './Dashboard';
import Dua from '../Dua';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import $ from 'jquery';

// Import DOM Menu Siswa
import DataJenis from './Siswa/DataJenis';
import DataJurusan from './Siswa/DataJurusan';
import Pembayaran from './Siswa/Pembayaran';
import Siswa from './Siswa/Siswa';
import Tagihan from './Siswa/Tagihan';
import LaporanSaldo from './Siswa/LaporanSaldo';
import LaporanTagihan from './Siswa/LaporanTagihan';
import LaporanPembayaran from './Siswa/LaporanPembayaran';

class SiswaPath extends Component{
  render(){
    return (
      <div className="mt-3 Container">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/data-jenis">
            <DataJenis />
          </Route>
          <Route path="/data-jurusan">
            <DataJurusan />
          </Route>
          <Route path="/siswa">
            <Siswa />
          </Route>
          <Route path="/tagihan">
            <Tagihan />
          </Route>
          <Route path="/pembayaran">
            <Pembayaran />
          </Route>
          <Route path="/laporan-saldo">
            <LaporanSaldo />
          </Route>
          <Route path="/laporan-tagihan">
            <LaporanTagihan />
          </Route>
          <Route path="/laporan-pembayaran">
            <LaporanPembayaran />
          </Route>
        </Switch>
      </div>
    );
  }
}

class AdminPath extends Component{

  render(){
    return (
      <div className="mt-3 Container">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/satu">
            <Dashboard />
          </Route>
          <Route path="/dua">
            <Dua />
          </Route>
        </Switch>
      </div>
    );
  }
}

class SiswaMenu extends Component{

  state = {
    menu_satu : [],
    menu_dua : [],
    menu_tiga : []
  }

  constructor(props){
    super(props)
    this.getMenuSiswa = this.getMenuSiswa.bind(this)
    this.openMenuSatu = this.openMenuSatu.bind(this)
    this.openMenuDua = this.openMenuDua.bind(this)
    this.openMenuTiga = this.openMenuTiga.bind(this)
  }

  componentWillMount(){
    this.getMenuSiswa()
  }

  componentDidMount(){
    console.log('ok')
  }

  getMenuSiswa(){

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/menu/SISWA',
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        menu_satu : response.data.MenuSatu,
        menu_dua : response.data.MenuDua,
        menu_tiga : response.data.MenuTiga
      })

    })

  }

  openMenuSatu(){
    $('#list-1').toggle();
  }

  openMenuDua(){
    $('#list-2').toggle();
  }

  openMenuTiga(){
    $('#list-3').toggle();
  }

  render(){
    const {menu_satu,menu_dua,menu_tiga} = this.state
    return(
      <div>

      <li>
        <a class="waves-effect waves-dark" aria-expanded="false">
          <Link to="/"><span class="hide-menu">Dashboard</span></Link>
        </a>
      </li>

      <li id="menu-1" onClick={this.openMenuSatu}> <a class="has-arrow waves-effect waves-dark" aria-expanded="false"><i class="icon-notebook"></i><span class="hide-menu">Master Data</span></a>
          <ul id="list-1" aria-expanded="false" class="collapse">
          {menu_satu.map(mSatu => (
            <Link to={"/" + mSatu.nama.split(' ').join('-').toLowerCase()}><li key={mSatu.kode_menu}> {mSatu.nama} </li></Link>
          ))}
          </ul>
      </li>

      <li id="menu-1" onClick={this.openMenuDua}> <a class="has-arrow waves-effect waves-dark" aria-expanded="false"><i class="icon-notebook"></i><span class="hide-menu">Transaksi</span></a>
          <ul id="list-2" aria-expanded="false" class="collapse">
          {menu_dua.map(mDua => (
            <Link to={"/" + mDua.nama.split(' ').join('-').toLowerCase()}><li key={mDua.kode_menu}> {mDua.nama} </li></Link>
          ))}
          </ul>
      </li>

      <li id="menu-1" onClick={this.openMenuTiga}> <a class="has-arrow waves-effect waves-dark" aria-expanded="false"><i class="icon-notebook"></i><span class="hide-menu">Laporan</span></a>
          <ul id="list-3" aria-expanded="false" class="collapse">
          {menu_tiga.map(mTiga => (
            <Link to={"/" + mTiga.nama.split(' ').join('-').toLowerCase()}><li key={mTiga.kode_menu}> {mTiga.nama} </li></Link>
          ))}
          </ul>
      </li>

      </div>
    );
  }
}

class AdminMenu extends Component{
  render(){
    return(
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/satu">Dashboard</Link>
        </li>
        <li>
          <Link to="/dua">Dua</Link>
        </li>
      </ul>
    );
  }
}

class Main extends Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    $('#inti').hide()
  }

  componentDidMount(){
    $('#inti').show()
  }

  render(){
    return (
      <Router>

      <div id="inti" className="preloader">
          <div className="loader">
              <div className="loader__figure"></div>
              <p className="loader__label">Elite admin</p>
          </div>
      </div>

      <div id="main-wrapper">
          <header className="topbar">
              <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                  <div className="navbar-header bg-blue">
                      <a className="navbar-brand">
                          <b>
                              <img src="asset_elite/images/logo-icon.png" alt="homepage" className="dark-logo" />
                              <img src="asset_elite/images/logo-light-icon.png" alt="homepage" className="light-logo" />
                          </b>
                          <span>
                           <img src="asset_elite/images/logo-text.png" alt="homepage" className="dark-logo" />
                           <img src="asset_elite/images/logo-light-text.png" className="light-logo" alt="homepage" />
                         </span>
                       </a>
                  </div>
                  <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                          <li className="nav-item"> <a className="nav-link nav-toggler d-block d-md-none waves-effect waves-dark" href="javascript:void(0)"><i className="ti-menu"></i></a> </li>
                          <li className="nav-item"> <a className="nav-link sidebartoggler d-none d-lg-block d-md-block waves-effect waves-dark" href="javascript:void(0)"><i className="icon-menu"></i></a> </li>
                          <li className="nav-item">
                              <form className="mt-3 app-search d-none d-md-block d-lg-block">
                                  <input type="text" className="form-control" placeholder="Search & enter"></input>
                              </form>
                          </li>
                      </ul>


                      <ul className="navbar-nav my-lg-0">
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="ti-email"></i>
                                  <div className="notify"> <span className="heartbit"></span> <span className="point"></span> </div>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right mailbox scale-up">
                                  <ul>
                                      <li>
                                          <div className="drop-title">Notifications</div>
                                      </li>
                                      <li>
                                          <div className="message-center">
                                              <a href="javascript:void(0)">
                                                  <div className="btn btn-danger btn-circle"><i className="fa fa-link"></i></div>
                                                  <div className="mail-contnet">
                                                      <h6>React JS</h6> <span className="mail-desc">Integrate Elite Admin Dengan React</span></div>
                                              </a>
                                          </div>
                                      </li>
                                      <li>
                                          <a className="nav-link text-center link" href="javascript:void(0);"> <strong>Check all notifications</strong> <i className="fa fa-angle-right"></i> </a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="nav-item dropdown u-pro">
                              <a className="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              </a>
                              <div className="dropdown-menu dropdown-menu-right animated flipInY">
                                  <a href="{{ url('my-profile') }}" className="dropdown-item"><i className="ti-user"></i> My Profile</a>
                                  <a href="javascript:void(0)" className="dropdown-item"><i className="ti-wallet"></i> My Balance</a>
                                  <a href="javascript:void(0)" className="dropdown-item"><i className="ti-email"></i> Inbox</a>
                                  <div className="dropdown-divider"></div>
                                  <a href="javascript:void(0)" className="dropdown-item"><i className="ti-settings"></i> Account Setting</a>
                                  <div className="dropdown-divider"></div>
                                  <a href="{{url('/logout')}}"  className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a>
                              </div>
                          </li>
                          <li className="nav-item right-side-toggle"> <a className="nav-link  waves-effect waves-light" href="javascript:void(0)"><i className="ti-settings"></i></a></li>
                      </ul>
                  </div>
              </nav>
          </header>

          {/*==========================================================================================*/}
          {/*==========================================================================================*/}
          {/*==========================================================================================*/}
          {/*===================Diatas Adalah Inisialisasi Component Client Elite======================*/}
          {/*==========================================================================================*/}
          {/*==========================================================================================*/}
          {/*==========================================================================================*/}
          {/*==========================================================================================*/}

          {/*Ini Adalah Content Yang Akan Di Jadikan Dinamis*/}

          <aside className="left-sidebar">
          <div className="scroll-sidebar">
              <nav id="nav" className="sidebar-nav">
                  <ul id="sidebar-nav">

                    {/*Untuk Menu*/}
                    <div id="menu">
                      {1<2 ? <SiswaMenu /> : <AdminMenu />}
                    </div>
                    {/*Untuk Content*/}

                  </ul>
              </nav>
          </div>
        </aside>

        <div className="page-wrapper">
        <div className="container-fluid">

          {/*Untuk Content*/}
          <div id="Content">
            {localStorage.getItem('your-key') ? <SiswaPath /> : <AdminPath />}
          </div>
          {/*Untuk Content*/}

          </div>
        </div>
      </div>

      {/*Ini Adalah Content Yang Akan Di Jadikan Dinamis*/}


      </Router>
    );
  }

}

export default Main;

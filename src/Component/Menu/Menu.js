import React,{Component} from 'react'
import {Link} from "react-router-dom"
import { Media } from 'reactstrap'
import axios from 'axios'
import $ from 'jquery'

class Menu extends Component{

  constructor(props){
    super(props)

    // Atur State Awal
    this.state = {
      menu_satu : [],
      menu_dua : [],
      menu_tiga : []
    }

  }

  UNSAFE_componentWillMount(){
    this.getMenuSiswa()
  }

  componentDidMount(){
    console.warn = console.error = () => {};
  }

  getMenuSiswa(){

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/menu/SISWA',
      headers : {
        'Authorization' : 'Bearer' + localStorage.getItem('key')
      }
    }).then((response) => {

      this.setState({
        menu_satu : response.data.MenuSatu,
        menu_dua : response.data.MenuDua,
        menu_tiga : response.data.MenuTiga
      })

    })

  }

  openMenuSatu(e){
    e.preventDefault()
    $('#list-1').toggle()
  }

  openMenuDua(e){
    e.preventDefault()
    $('#list-2').toggle()
  }

  openMenuTiga(e){
    e.preventDefault()
    $('#list-3').toggle()
  }

  render(){
    const {menu_satu,menu_dua,menu_tiga} = this.state
    return(
      <div className="AppContainer">
      <li>
        <Media className="waves-effect waves-dark" aria-expanded="false">
          <Link to="/"><span className="hide-menu">Dashboard</span></Link>
        </Media>
      </li>

      <li id="menu-1" onClick={this.openMenuSatu.bind(this)}> <a className="has-arrow waves-effect waves-dark" aria-expanded="false"><i className="icon-notebook"></i><span className="hide-menu">Master Data</span></a>
          <ul id="list-1" aria-expanded="false" className="collapse">
          {menu_satu.map(mSatu => (
            <Link key={mSatu.kode_menu} to={"/" + mSatu.nama.split(' ').join('-').toLowerCase()}>
              <li key={mSatu.kode_menu}> {mSatu.nama} </li>
            </Link>
          ))}
          </ul>
      </li>

      <li id="menu-2" onClick={this.openMenuDua.bind(this)}> <a className="has-arrow waves-effect waves-dark" aria-expanded="false"><i className="icon-notebook"></i><span className="hide-menu">Transaksi</span></a>
          <ul id="list-2" aria-expanded="false" className="collapse">
          {menu_dua.map(mDua => (
            <Link key={mDua.kode_menu} to={"/" + mDua.nama.split(' ').join('-').toLowerCase()}>
              <li key={mDua.kode_menu}> {mDua.nama} </li>
            </Link>
          ))}
          </ul>
      </li>

      <li id="menu-3" onClick={this.openMenuTiga.bind(this)}> <a className="has-arrow waves-effect waves-dark" aria-expanded="false"><i className="icon-notebook"></i><span className="hide-menu">Laporan</span></a>
          <ul id="list-3" aria-expanded="false" className="collapse">
          {menu_tiga.map(mTiga => (
            <Link key={mTiga.kode_menu} to={"/" + mTiga.nama.split(' ').join('-').toLowerCase()}>
              <li key={mTiga.kode_menu}> {mTiga.nama} </li>
            </Link>
          ))}
          </ul>
      </li>

      </div>
    );
  }
}

export default Menu

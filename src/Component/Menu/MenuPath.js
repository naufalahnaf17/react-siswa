import React,{Component} from 'react'
import {Switch,Route} from "react-router-dom";

// Import Semua File Yang Di Butuhkan
// Semua File Harus Di Masukan Manual Karen Map Tidak Berfungsi
// Setelah Import Langsung Masukin Class Yang Sudah Di Panggil Tadi Ke Dalam Path (Bisa Siswa / Admin / Sekolah)
import DataJenis from '../../Component/Content/DataJenis'
import Dashboard from '../../Component/Content/Dashboard'
import Siswa from '../../Component/Content/Siswa'
import Tagihan from '../../Component/Content/Tagihan'

class PathJikaSiswa extends Component{
  render(){
    return(
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/data-jenis">
          <DataJenis />
        </Route>
        <Route path="/data-jurusan">

        </Route>
        <Route path="/siswa">
          <Siswa />
        </Route>
        <Route path="/tagihan">
          <Tagihan />
        </Route>
        <Route path="/pembayaran">

        </Route>
        <Route path="/laporan-tagihan">

        </Route>
        <Route path="/laporan-pembayaran">

        </Route>
        <Route path="/laporan-saldo">

        </Route>
      </Switch>
    );
  }
}

class MenuPath extends Component{

  render(){
    return(
      <PathJikaSiswa />
    );
  }
}

export default MenuPath

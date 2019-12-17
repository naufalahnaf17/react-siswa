import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import $ from 'jquery';

function RowInput(){
  return(
    <tbody>
    <tr id="input-1">
      <td><input id="jen-tag-1" type="text" className="form-control" placeholder="Jenis Tagihan"></input></td>
      <td><input id="nilai-tag-1" type="text" className="form-control" placeholder="Nilai tagihan"></input></td>
    </tr>
    <tr id="input-2">
      <td><input id="jen-tag-2" type="text" className="form-control" placeholder="Jenis Tagihan"></input></td>
      <td><input id="nilai-tag-2" type="text" className="form-control" placeholder="Nilai tagihan"></input></td>
    </tr>
    <tr id="input-3">
      <td><input id="jen-tag-3" type="text" className="form-control" placeholder="Jenis Tagihan"></input></td>
      <td><input id="nilai-tag-3" type="text" className="form-control" placeholder="Nilai tagihan"></input></td>
    </tr>
    <tr id="input-4">
      <td><input id="jen-tag-4" type="text" className="form-control" placeholder="Jenis Tagihan"></input></td>
      <td><input id="nilai-tag-4" type="text" className="form-control" placeholder="Nilai tagihan"></input></td>
    </tr>
    <tr id="input-5">
      <td><input id="jen-tag-5" type="text" className="form-control" placeholder="Jenis Tagihan"></input></td>
      <td><input id="nilai-tag-5" type="text" className="form-control" placeholder="Nilai tagihan"></input></td>
    </tr>
    <tr id="input-6">
      <td><input id="jen-tag-6" type="text" className="form-control" placeholder="Jenis Tagihan"></input></td>
      <td><input id="nilai-tag-6" type="text" className="form-control" placeholder="Nilai tagihan"></input></td>
    </tr>
    </tbody>
  );
}

class Tagihan extends Component{

  state = {
    tagihan : [],
    next_url : '',
    prev_url : '',
    current_no_tagihan : '',
    angka : 1
  }
  constructor(props){
    super(props)
    this.getTagihan = this.getTagihan.bind(this)
  }
  componentDidMount(){
    $('#btnKembali').hide()
    $('#TagihanForm').hide()
    $('#btnEditData').hide()
    $('#btnAddData').hide()

    $('#input-2').hide()
    $('#input-3').hide()
    $('#input-4').hide()
    $('#input-5').hide()
    $('#input-6').hide()

    if (this.state.next_url === "" && this.state.prev_url === "") {
      $('#pagination').hide()
    }else {
      $('#pagination').hide()
    }

  }
  componentWillMount(){
    this.getTagihan()
  }
  getTagihan(){

    this.setState({
      tagihan: [],
      next_url : '',
      prev_url : ''
    })

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/tagihan-m',
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        tagihan : response.data.value.data,
        next_url : response.data.value.next_page_url,
        prev_url : response.data.value.prev_page_url
      })

    })

  }
  btnTambah(event){
    event.preventDefault()
    $('#TagihanForm').show()
    $('#TagihanTable').hide()
    $('#search-sort').hide()
    $('#btnTambah').hide()
    $('#btnAddData').show()
    $('#btnKembali').show()
  }
  btnKembali(event){
    event.preventDefault()
    $('#TagihanForm').hide()
    $('#TagihanTable').show()
    $('#search-sort').show()
    $('#btnTambah').show()
    $('#btnAddData').hide()
    $('#btnEditData').hide()
    $('#btnKembali').hide()

    // Menghapus Value Pada Input
    $('#no_tagihan').val("")
    $('#nim').val("")
    $('#tanggal').val("")
    $('#keterangan').val("")
    $('#periode').val("")

  }
  AddStore(event){
    event.preventDefault()

    // Inisialisasi Variable
    var value_no_tagihan = $('#no_tagihan').val()
    var value_nim = $('#nim').val()
    var value_tanggal = $('#tanggal').val()
    var value_keterangan = $('#keterangan').val()
    var value_periode = $('#periode').val()

    axios({
      method : 'post',
      url : 'https://laravel.simkug.com/siswa-api/public/api/tagihan-m',
      data : {
        no_tagihan : value_no_tagihan,
        nim : value_nim,
        tanggal : value_tanggal,
        keterangan : value_keterangan,
        periode : value_periode
      },
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {
      alert('Berhasil Tambah Data')
      this.btnKembali(event)
      this.getTagihan()
    }).catch((error) => {
      alert('Terjadi Kesalahan Saat Tambah Data')
      this.btnKembali(event)
      this.getTagihan()
    })

  }
  hapusData(event){
    event.preventDefault()

    axios({
      method : 'delete',
      url : 'https://laravel.simkug.com/siswa-api/public/api/tagihan-m/' + event.target.value,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {
      this.getTagihan()
    }).catch((error) => {
      alert('Terjadi Kesalahan Saat Menghapus Data')
      this.getTagihan()
    })

  }
  toEdit(event){
    event.preventDefault()

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/tagihan-m/data-edit/' + event.target.value,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      $('#TagihanForm').show()
      $('#TagihanTable').hide()
      $('#search-sort').hide()
      $('#btnTambah').hide()
      $('#btnAddData').hide()
      $('#btnEditData').show()
      $('#btnKembali').show()

      $('#no_tagihan').val(response.data.no_tagihan)

      this.setState({
        current_no_tagihan : response.data.no_tagihan
      })

      $('#nim').val(response.data.nim)
      $('#tanggal').val(response.data.tanggal)
      $('#keterangan').val(response.data.keterangan)
      $('#periode').val(response.data.periode)

    })

  }
  EditStore(event){
    event.preventDefault()

    // Inisialisasi Variable
    var value_no_tagihan = $('#no_tagihan').val()
    var value_nim = $('#nim').val()
    var value_tanggal = $('#tanggal').val()
    var value_keterangan = $('#keterangan').val()
    var value_periode = $('#periode').val()

    axios({
      method : 'put',
      url : 'https://laravel.simkug.com/siswa-api/public/api/tagihan-m/' + this.state.current_no_tagihan,
      data : {
        no_tagihan : value_no_tagihan,
        nim : value_nim,
        tanggal : value_tanggal,
        keterangan : value_keterangan,
        periode : value_periode
      },
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {
      alert('Berhasil Edit Data')
      this.btnKembali(event)
      this.getTagihan()
    }).catch((error) => {
      alert('Terjadi Kesalahan Saat Edit Data')
      this.btnKembali(event)
      this.getTagihan()
    })

  }
  sortData(event){

    event.preventDefault()
    var array = this.state.tagihan
    var clicked = true

    array.reverse(function(a, b){
      var a1= a.no_tagihan, b1= b.no_tagihan;
      if(a1== b1) return 0;
      return a1> b1? 1: -1;
    });

    this.setState({
      siswa : array
    })

  }
  search(event){
    event.preventDefault()
    var value = event.target.value

    if (value === "" || value === null) {
      this.getTagihan()
    }

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/tagihan-m/' + value,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        tagihan : response.data.value
      })

    }).catch((error) =>{

      this.setState({
        tagihan : []
      })

    })

  }
  tambahInput(event){
    event.preventDefault()

    var i = this.state.angka

    this.setState({
        angka : this.state.angka+=1
    })

    if (i >= 6) {
      alert('Batas Maksimal Saat Ini Hanya 6')
      this.setState({
        angka : 5
      })
      return false
    }else {
      $('#input-' + this.state.angka).show()
    }

  }
  kurangInput(event){
    event.preventDefault()

    var i = this.state.angka

    this.setState({
        angka : this.state.angka-=1
    })

    if (i === 0) {
      alert('Sudah Batas Minimal')
      this.setState({
        angka : 1
      })
      return false
    }else {
      $('#input-' + this.state.angka).hide()
    }

  }

  render(){
    const {tagihan,angka} = this.state
    return(
      <div className="Container">
        <div className="card">
          <div className="card-header">
            <h5 style={{ float:'left' }}>Data Tagihan</h5>
            <button id="btnTambah" onClick={this.btnTambah.bind(this)} className="btn btn-primary" style={{ float:'right' }} >Tambah Tagihan</button>
            <button id="btnKembali" onClick={this.btnKembali.bind(this)} className="btn btn-danger" style={{ float:'right' }} >Kembali</button>
            <br></br><hr></hr>

            {/*Content Sort By And Search*/}
            <div id="search-sort" className="container">
              <div className="row">
                <div className="col">
                  <p>Show
                    <select style={{ width : 100 }} className="ml-2 mr-2 custom-select">
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="15">15</option>
                    </select>
                    Entries
                  </p>
                </div>
                <div className="col">
                <div className="input-group flex-nowrap" style={{ width : 400 , float:'right' }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="addon-wrapping">Search</span>
                  </div>
                  <input onChange={this.search.bind(this)} type="text" className="form-control" placeholder="Cari Tagihan"></input>
                </div>
                </div>
              </div>
            </div>
            {/*Content Sort By And Search*/}

          </div>
          <div className="card-body">
          <table className="table table-striped" id="TagihanTable">
            <thead>
              <tr>
                <th onClick={this.sortData.bind(this)} scope="col">No Tagihan</th>
                <th onClick={this.sortData.bind(this)} scope="col">Nim</th>
                <th onClick={this.sortData.bind(this)} scope="col">Tanggal</th>
                <th onClick={this.sortData.bind(this)} scope="col">Keterangan</th>
                <th onClick={this.sortData.bind(this)} scope="col">Periode</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

              {/* Kontent Table Siswa */}
              <tbody>

                {tagihan.map(tag => (

                  <tr key={tag.no_tagihan}>
                    <td> {tag.no_tagihan} </td>
                    <td> {tag.nim} </td>
                    <td> {tag.tanggal} </td>
                    <td> {tag.keterangan} </td>
                    <td> {tag.periode} </td>
                    <td>
                      <button value={tag.no_tagihan} onClick={this.toEdit.bind(this)} className="btn btn-warning mr-1">Edit</button>
                      <button value={tag.no_tagihan} onClick={this.hapusData.bind(this)} className="btn btn-danger">Hapus</button>
                    </td>
                  </tr>

                ))}

              </tbody>
              {/* Kontent Table Siswa */}

              {/* Kontent Untuk Pagination */}
              <div id="pagination">
                <nav id="paginate-btn" style={{ margin:5 }} aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><button className="page-link" href="#">Previous</button></li>
                    <li className="page-item"><button className="page-link" href="#">Next</button></li>
                  </ul>
                </nav>
              </div>
              {/* Kontent Untuk Pagination */}

            </table>

            {/* Kontent Form Tambah Dan Edit */}
            <div id="TagihanForm">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>No Tagihan</label>
                    <input type="text" className="form-control" id="no_tagihan" placeholder="Masukan No Tagihan"></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Nim</label>
                    <input type="text" className="form-control" id="nim" placeholder="Masukan Nim"></input>
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="col">
                  <div className="form-group">
                    <label>Tanggal</label>
                    <input type="date" className="form-control" id="tanggal"></input>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Keterangan</label>
                    <input type="text" className="form-control" id="keterangan" placeholder="Keterangan Tagihan"></input>
                  </div>
                </div>
                <div className="w-100"></div>
                <div className="col">
                  <div className="form-group">
                    <label>Periode</label>
                    <input type="text" className="form-control" id="periode" placeholder="Contoh : 2019"></input>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <hr></hr>
              <div id="inputan">

                <div className="row">
                  <div className="col"><h5>Input Data Tagihan</h5></div>
                  <div className="col">
                    <button onClick={this.tambahInput.bind(this)} className="btn btn-success ml-1 mb-1" style={{ float:'right' }}>Add Row</button>
                    <button onClick={this.kurangInput.bind(this)} className="btn btn-danger" style={{ float:'right' }}>Remove Row</button>
                  </div>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Jenis Tagihan</th>
                      <th scope="col">Nilai</th>
                    </tr>
                  </thead>
                  <RowInput />
                </table>

                <button id="btnAddData" onClick={this.AddStore.bind(this)} type="submit" className="btn btn-primary">Tambah Data</button>
                <button id="btnEditData" onClick={this.EditStore.bind(this)} type="submit" className="btn btn-primary">Edit Data</button>
              </div>
            </div>
          </div>
          {/* Kontent Form Tambah Dan Edit */}

          </div>
        </div>
      </div>
    );
  }

}

export default Tagihan;

import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import axios from 'axios';

class Siswa extends Component{

  state = {
    siswa : [],
    next_url : '',
    prev_url : '',
    current_nis : ''
  }

  constructor(props){
    super(props)
    this.getSiswa = this.getSiswa.bind(this)
    this.getNextUrl = this.getNextUrl.bind(this)
    this.getPrevUrl = this.getPrevUrl.bind(this)
    this.btnTambah = this.btnTambah.bind(this)
    this.btnEdit = this.btnEdit.bind(this)
    this.btnHapus = this.btnHapus.bind(this)
    this.btnBack = this.btnBack.bind(this)
    this.tambahData = this.tambahData.bind(this)
    this.editData = this.editData.bind(this)
  }

  componentWillMount(){
    this.getSiswa()
  }

  componentDidMount(){
    $('#SiswaForm').hide()
    $('#btnKembali').hide()
    $('#btnEditData').hide()
  }

  getSiswa(){

    this.setState({
      siswa : [],
      next_url : '',
      prev_url : ''
    })

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/siswa',
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        siswa : response.data.value.data,
        next_url : response.data.value.next_page_url,
        prev_url : response.data.value.prev_page_url
      })

    })

  }

  getNextUrl(event){
    event.preventDefault()

    if (this.state.next_url === null) {
      alert('Kamu Ada Di Halaman Terakhir')
      return false;
    }

    this.setState({
      siswa : [],
      next_url : '',
      prev_url : ''
    })

    axios({
      method : 'get',
      url : this.state.next_url,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        siswa : response.data.value.data,
        next_url : response.data.value.next_page_url,
        prev_url : response.data.value.prev_page_url
      })

    })

  }

  getPrevUrl(event){
    event.preventDefault()

    if (this.state.prev_url === null) {
      alert('Kamu Ada Di Halaman Pertama')
      return false;
    }

    this.setState({
      siswa : [],
      next_url : '',
      prev_url : ''
    })

    axios({
      method : 'get',
      url : this.state.prev_url,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        siswa : response.data.value.data,
        next_url : response.data.value.next_page_url,
        prev_url : response.data.value.prev_page_url
      })

    })

  }

  btnTambah(event){
    event.preventDefault()
    $('#SiswaForm').show()
    $('#SiswaTable').hide()
    $('#btnTambah').hide()
    $('#btnKembali').show()
  }

  btnBack(event){
    event.preventDefault()
    $('#SiswaForm').hide()
    $('#SiswaTable').show()
    $('#btnTambah').show()
    $('#btnKembali').hide()
  }

  btnEdit(event){
    event.preventDefault()

    axios({
      method : 'get',
      url : 'https://laravel.simkug.com/siswa-api/public/api/siswa/' + event.target.value,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      this.setState({
        current_nis : response.data.value.data[0].nis
      })

      $('#nis').val(response.data.value.data[0].nis)
      $('#nama').val(response.data.value.data[0].nama)
      $('#kode_kelas').val(response.data.value.data[0].kode_kelas)

      $('#SiswaForm').show()
      $('#SiswaTable').hide()
      $('#btnTambah').hide()
      $('#btnAddData').hide()
      $('#btnEditData').show()
      $('#btnKembali').show()

    }).catch((error) => {
      alert('Terjadi Kesalahan Saat Mengambil Data')
      return false
    })

  }

  btnHapus(event){
    event.preventDefault()

    axios({
      method: 'delete',
      url: 'https://laravel.simkug.com/siswa-api/public/api/siswa/' + event.target.value,
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
      }).then((response) => {
        if (response.status === 200) {
          this.getSiswa();
          alert('Berhasil Menghapus Data')
        }
      }).catch((error) => {
        this.getSiswa();
        alert('Gagal Menghapus Data')
      });

  }

  tambahData(event){

    event.preventDefault()
    var value_nis = $('#nis').val()
    var value_nama = $('#nama').val()
    var value_kode_kelas = $('#kode_kelas').val()

    if (value_nis === "") {
      alert('Nis Tidak Boleh Kosong')
      return false
    }

    if (value_nama === "") {
      alert('Nama Tidak Boleh Kosong')
      return false
    }

    if (value_kode_kelas === "") {
      alert('Kode Kelas Tidak Boleh Kosong')
      return false
    }

    axios({
      method : 'post',
      url : 'https://laravel.simkug.com/siswa-api/public/api/siswa',
      data : {
        nis : value_nis,
        nama : value_nama,
        kode_kelas : value_kode_kelas
      },
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      $('#nis').val("")
      $('#nama').val("")
      $('#kode_kelas').val("")

      if (response.status === 200) {
        alert('Berhasil Tambah Data')
        $('#SiswaForm').hide()
        $('#SiswaTable').show()
        $('#btnTambah').show()
        $('#btnKembali').hide()
        this.getSiswa();
      }

    }).catch((error) => {
       $('#nis').val("")
       $('#nama').val("")
       $('#kode_kelas').val("")

       alert('Gagal Tambah Data')
       $('#SiswaForm').hide()
       $('#SiswaTable').show()
       $('#btnTambah').show()
       $('#btnKembali').hide()
       this.getSiswa()
    })

  }

  editData(event){
    event.preventDefault()
    var value_nis = $('#nis').val()
    var value_nama = $('#nama').val()
    var value_kode_kelas = $('#kode_kelas').val()

    axios({
      method : 'put',
      url : 'https://laravel.simkug.com/siswa-api/public/api/siswa/' + this.state.current_nis,
      data : {
        nis : value_nis,
        nama : value_nama,
        kode_kelas : value_kode_kelas
      },
      headers : {
        'Authorization' : 'Bearer' + ' ' + localStorage.getItem('your-key')
      }
    }).then((response) => {

      $('#nis').val("")
      $('#nama').val("")
      $('#kode_kelas').val("")

      alert('Berhasil Update Data')
      $('#SiswaForm').hide()
      $('#SiswaTable').show()
      $('#btnTambah').show()
      $('#btnAddData').show()
      $('#btnEditData').hide()
      $('#btnKembali').hide()
      this.getSiswa();

    }).catch((error) => {

      $('#nis').val("")
      $('#nama').val("")
      $('#kode_kelas').val("")

      alert('Gagal Update Data')
      $('#SiswaForm').hide()
      $('#SiswaTable').show()
      $('#btnTambah').show()
      $('#btnAddData').show()
      $('#btnEditData').hide()
      $('#btnKembali').hide()
      this.getSiswa();

    })

  }

  render(){

    const {siswa} = this.state

    return(
      <div className="Container">
        <div className="card">
          <div className="card-header">
            <h5 style={{ float:'left' }}>Data Siswa</h5>
            <button id="btnTambah" onClick={this.btnTambah} className="btn btn-primary" style={{ float:'right' }} >Tambah Siswa</button>
            <button id="btnKembali" onClick={this.btnBack} className="btn btn-danger" style={{ float:'right' }} >Kembali</button>
          </div>
          <div className="card-body">
          <table className="table table-striped" id="SiswaTable">
            <thead>
              <tr>
                <th scope="col">Nis</th>
                <th scope="col">Nama</th>
                <th scope="col">Kode Kelas</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

              {/* Kontent Table Siswa */}
              <tbody>

              {siswa.map(siswa => (
                <tr id="row-siswa" key={siswa.nis}>
                  <td>{siswa.nis}</td>
                  <td>{siswa.nama}</td>
                  <td>{siswa.kode_kelas}</td>
                  <td>
                    <button value={siswa.nis} onClick={this.btnEdit} style={{ margin:2 }} className="btn btn-warning">Edit</button>
                    <button value={siswa.nis} onClick={this.btnHapus} className="btn btn-danger">Hapus</button>
                  </td>
                </tr>
              ))}

              </tbody>
              {/* Kontent Table Siswa */}

              {/* Kontent Untuk Pagination */}
              <nav style={{ margin:5 }} aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><button onClick={this.getPrevUrl} className="page-link" href="#">Previous</button></li>
                  <li className="page-item"><button onClick={this.getNextUrl} className="page-link" href="#">Next</button></li>
                </ul>
              </nav>
              {/* Kontent Untuk Pagination */}

            </table>

            {/* Kontent Form Tambah Dan Edit */}
            <div id="SiswaForm">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Nis</label>
                  <input type="text" className="form-control" id="nis" aria-describedby="emailHelp" placeholder="Masukan Nis"></input>
                  </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Nama</label>
                  <input type="text" className="form-control" id="nama" placeholder="Masukan Nama"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Kode Kelas</label>
                  <input type="text" className="form-control" id="kode_kelas" placeholder="Masukan Kode Kelas"></input>
                </div>
                <button onClick={this.tambahData} id="btnAddData" type="submit" className="btn btn-primary">Tambah Data</button>
                <button onClick={this.editData} id="btnEditData" type="submit" className="btn btn-primary">Edit Data</button>
              </form>
            </div>
            {/* Kontent Form Tambah Dan Edit */}

          </div>
        </div>
      </div>
    );
  }

}

export default Siswa;

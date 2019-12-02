import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import axios from 'axios';

class Siswa extends Component{

  state = {
    siswa : [],
    next_url : '',
    prev_url : ''
  }

  constructor(props){
    super(props)
    this.getSiswa = this.getSiswa.bind(this)
    this.getNextUrl = this.getNextUrl.bind(this)
    this.getPrevUrl = this.getPrevUrl.bind(this)
  }

  componentWillMount(){
    this.getSiswa()
  }

  getSiswa(){

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

  render(){

    const {siswa} = this.state

    return(
      <div className="Container">
        <div className="card">
          <div className="card-header">
            <h5>Data Siswa</h5>
          </div>
          <div className="card-body">
          <table className="table table-striped">
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
                    <button style={{ margin:2 }} className="btn btn-warning">Edit</button>
                    <button className="btn btn-danger">Hapus</button>
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
          </div>
        </div>
      </div>
    );
  }

}

export default Siswa;

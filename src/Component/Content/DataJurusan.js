import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class DataJurusan extends Component{

  componentDidMount(){
    console.warn = console.error = () => {};
  }

  render(){
    return(
      <div className="Container mt-3">
        <div className="card">
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <h1>Kamu Berada Di DataJurusan</h1>
              <p>Tekan Profile Di Pojok Kanan Atas Untuk Logout</p>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }

}

export default DataJurusan;

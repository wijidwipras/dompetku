import './App.css';
import React from 'react';
import ModalCreate from './components/Modal';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      sumary: [
        {
          deskripsi: 'Menerima Gaji',
          tanggal: '1 July 2023',
          nominal: 1000000,
          category: 'IN'
        },

        {
          deskripsi: 'Beli Nasi Kucing',
          tanggal: '2 July 2023',
          nominal: 20000,
          category: 'OUT'
        },

      ]
    }

        // untuk binding secara explisit
        this.tambahItem = this.tambahItem.bind(this);
  }

  tambahItem(objek){
    let newData = [...this.state.sumary, objek]

    let dataUangIN = newData.filter( (item)=> item.category === "IN" );
    let nominalUang = dataUangIN.map((item)=> item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num)=> total + num)

    let dataUangOUT = newData.filter( (item)=> item.category === "OUT" );
    let nominalUangOUT = dataUangOUT.map((item)=> item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num)=> total + num)

    this.setState({
      pemasukanUang : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : Math.round((jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100),
      sumary : newData
    })
  }

  fnHitung(){
    let dataUangIN = this.state.sumary.filter( (item)=> item.category === "IN" );
    let nominalUang = dataUangIN.map((item)=> item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num)=> total + num)

    let dataUangOUT = this.state.sumary.filter( (item)=> item.category === "OUT" );
    let nominalUangOUT = dataUangOUT.map((item)=> item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num)=> total + num)

    this.setState({
      pemasukanUang : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : Math.round((jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100)
    })
  }

  componentDidMount(){
    this.fnHitung()
  }

  render(){
    return(
      <>
        <div className='container py-5'>

          <div className='row'>
            <div className='col-12  text-center'>
              <h1 className='fw-bold'>DOMPETKU</h1>
              <hr className='w-75 mx-auto'/>
              <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
              <span className='title-md'>Sisa uang kamu tersisa {this.state.persentaseUang}% lagi</span>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className='title-sm'>Pemasukan</span>
                <h3 className='fw-bold mt-2'>Rp. {this.state.pemasukanUang},-</h3>
                <div>
                  <span className='title-sm text-ungu'>{this.state.transaksiIN} </span><span className='title-sm'>Transaksi</span>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className="bi bi-cash"></i>
                </div>
                <span className='title-sm'>Pengeluaran</span>
                <h3 className='fw-bold mt-2'>Rp. {this.state.pengeluaranUang},-</h3>
                <div>
                  <span className='title-sm text-ungu'>{this.state.transaksiOUT}  </span><span className='title-sm'>Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4>Ringkasan Transaksi</h4>
              <div className='wrapper-button d-flex'>
                <ModalCreate action={this.tambahItem} category="IN" variant="button btn-ungu px-3 py-2 me-2" text="Pemasukan" icon="bi bi-plus-circle-fill" modalHeading="Tambahkan Pemasukan"/>
                <ModalCreate action={this.tambahItem} category="OUT" variant="button btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalHeading="Tambahkan Pengeluaran"/>
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            { this.state.sumary.map ( (sum, index) => {
              return (
                <div key={index} className='mb-3 col-12 d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                  <div className={sum.category === 'IN' ? 'icon-wrapper-in' : 'icon-wrapper-out'}>
                    <i className={sum.category === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
                  </div>
                  <div className='transaction ms-3 d-flex flex-column'>
                    <h6>{sum.deskripsi}</h6>
                    <span className='title-sm'>{sum.tanggal}</span>
                  </div>
                </div>

                <h5 className={sum.category === 'IN' ? 'text-money-in' : 'text-money-out'}>Rp. {sum.nominal},-</h5>
              </div>
              )
            }) }

          </div>
        </div>
      </>
    )
  }
}


export default App;

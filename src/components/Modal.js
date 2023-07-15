import React from 'react';
import Modal from 'react-bootstrap/Modal';

class ModalCreate extends React.Component {
    constructor (){
      super();
      this.state = {
        show: false,
        deskripsi:'',
        nominal: 0,
        tanggal: '',
        category:''
      }
  
      // untuk binding secara explisit
      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.tambahItem = this.tambahItem.bind(this);
    }
  
    handleClose(){
      this.setState({
        show: false
      })
    }
  
    handleShow(){
      this.setState({
        show: true,
        category: this.props.category
      })
    }
  
    handleChange(evt){
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
  
    tambahItem(){
      const data = {
        deskripsi:this.state.deskripsi,
        nominal: parseInt(this.state.nominal),
        tanggal: this.state.tanggal,
        category:this.state.category
      }
      const fnTambahitem = this.props.action;
      fnTambahitem(data);
      this.setState({
        show: false
      })
    }
  
    render(){
      return (
        <>
          <button onClick={this.handleShow} className={this.props.variant}>{this.props.text}<i className={this.props.icon}></i></button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.modalHeading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan deskripsi"
                name='deskripsi'
                value={this.state.deskripsi}
                onChange={this.handleChange}
                />
            </div>
  
            <div className="mb-3">
              <label className="form-label">Nominal</label>
              <input
                type="number"
                className="form-control"
                placeholder="Masukkan nominal"
                name='nominal'
                value={this.state.nominal}
                onChange={this.handleChange}
                />
            </div>
  
            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                className="form-control"
                placeholder="Masukkan tanggal"
                name='tanggal'
                value={this.state.tanggal}
                onChange={this.handleChange}
                />
            </div>
  
            <div>
              <input
                type="hidden"
                className="form-control"
                placeholder="Masukkan kategori"
                name='category'
                value={this.state.category}
                onChange={this.handleChange}
                />
            </div>
  
            </Modal.Body>
            <Modal.Footer>
              <button className={this.props.variant} onClick={this.tambahItem}>
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )
    }
  
}

export default ModalCreate;
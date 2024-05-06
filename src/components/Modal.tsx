const Modal: React.FC<any> = ({nameModal,setShowModal, showModal, children}) => {
    return (
      <div className="modal fade show" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block', }} >

      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{nameModal}</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(!showModal)} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          
        </div>
      </div>
    </div> 
    )
}

export default Modal
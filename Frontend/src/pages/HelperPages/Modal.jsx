export default function Modal({ setShowModal, title, children, handleSubmit }) {
  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog " role="document">
          {/* modal-dialog-centered" */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit( ), setShowModal(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

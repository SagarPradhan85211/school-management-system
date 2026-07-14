function Modal({ show, title, onClose, children }) {

    if (!show) return null;

    return (

        <>
            <div className="modal d-block" tabIndex="-1">

                <div className="modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">{title}</h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        <div className="modal-body">
                            {children}
                        </div>

                    </div>

                </div>

            </div>

            <div className="modal-backdrop show" />
        </>

    );

}

export default Modal;

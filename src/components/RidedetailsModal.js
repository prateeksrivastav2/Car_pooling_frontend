import  {React, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Warning = (props) => {
    // const {isVieewVisible ,hideleout, handlelogout } = props;
    const ref = useRef(null);

    useEffect(() => {
        if (1) {
            ref.current.click();
        }
    }, []);

    return (
        <div >
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#logoutModal" style={{ display: 'none' }}>
            </button>

            <div className="modal fade custom-modal" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="logoutModalTitle" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content custom-modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalTitle" style={{
                                fontFamily: 'Sacramento, cursive',
                                color: '#66BFBF',
                                lineHeight: 1,
                                fontSize: '1.625rem',
                                margin: 'auto auto 0 auto',
                                textAlign: 'center',
                                marginBottom: '2%'
                            }}>Logout Confirmation</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to logout?</p>
                            <p>This action will sign you out of your account.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Logout</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Warning;

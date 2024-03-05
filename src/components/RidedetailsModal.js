import React from 'react';

const RidedetailsModal = () => {
  return (
    <div className="modal fade" id="rideDetailsModal" tabIndex="-1" aria-labelledby="rideDetailsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="rideDetailsModalLabel">Ride Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {/* Add your ride details content here */}
            <p>Ride details content goes here...</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidedetailsModal;

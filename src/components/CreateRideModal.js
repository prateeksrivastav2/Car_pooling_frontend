// components/CreateRideModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateRide from '../components/CreateRideForm';

const CreateRideModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a Ride</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateRide />
      </Modal.Body>
    </Modal>
  );
};

export default CreateRideModal;

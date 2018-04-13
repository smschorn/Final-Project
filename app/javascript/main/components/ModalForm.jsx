import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalForm = (props) => (
  <Modal isOpen={true} toggle={props.onClose}>
    <ModalHeader toggle={props.onClose}>{props.title}</ModalHeader>
    <ModalBody>
      {props.form}
    </ModalBody>
    <ModalFooter>
      <Button type="submit" color="success" onClick={props.onSubmit}>
        {props.submitText}
      </Button>
      {' '}
      <Button color="secondary" onClick={props.onClose}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default ModalForm;

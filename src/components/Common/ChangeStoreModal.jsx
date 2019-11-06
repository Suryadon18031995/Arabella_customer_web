import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

export default function ChangeStoreModal(props = {
    showChangeStoreModal: false,
    title: '',
    storeList: [],
}) {
    return (
        <Modal show={props.showChangeStoreModal} onHide={props.handleCloseModal} className="changeStoreModal">
            <Modal.Header closeButton>
                {/* <Modal.Title> {props.title}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                <h4 />
                <p>
                    Please Choose Store{' '}
                    <select
                        name="store"
                        onChange={props.handleMethodChange}
                        value={props.selectedStoreId}
                    >
                        {props.storeList.map((option, index) => (
                            <option key={index} value={option.store_id}>
                                {option.store_name}
                            </option>
                        ))}
                        )
              </select>
                </p>
            </Modal.Body>
        </Modal>
    );
}


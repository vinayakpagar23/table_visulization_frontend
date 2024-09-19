import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TableForm from './TableForm';

const AddTable = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" size='large' onClick={showModal}>
        ADD TABLE
      </Button>
      <Modal
        open={open}
        title="Add Table Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
        ]}
      >
        <TableForm/>
      </Modal>
    </>
  );
};
export default AddTable;
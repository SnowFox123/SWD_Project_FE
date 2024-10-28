import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { ListVoucher, PutVoucher } from '../../services/staffService';
import AddVoucher from './AddVoucher';

const VoucherManager = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVoucher, setEditingVoucher] = useState(null);

    const fetchVouchers = async () => {
        try {
            const data = await ListVoucher();
            setVouchers(data.object);
        } catch (error) {
            message.error("Error fetching vouchers. Please try again.");
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const showModal = (voucher = null) => {
        setEditingVoucher(voucher);
        setIsModalVisible(true);
    };

    const handleModalClose = async (isSuccess) => {
        setIsModalVisible(false);
        setEditingVoucher(null); // Clear editing state on close
        if (isSuccess) fetchVouchers();
    };

    const handleEditVoucher = async (formData) => {
        try {
            await PutVoucher(formData);
            message.success("Voucher updated successfully!");
            handleModalClose(true); // Closes the modal and refreshes vouchers
        } catch (error) {
            message.error("Error updating voucher. Please try again.");
        }
    };

    const columns = [
        { title: 'Voucher Name', dataIndex: 'voucherName', key: 'voucherName' },
        { title: 'Expiry Date', dataIndex: 'expiredDate', key: 'expiredDate', render: date => new Date(date).toLocaleString() },
        { title: 'Discount (%)', dataIndex: 'discount', key: 'discount' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Used', dataIndex: 'used', key: 'used' },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: isActive => (
                <span
                    style={{
                        padding: '5px 10px',
                        borderRadius: '4px',
                        color: 'white',
                        backgroundColor: isActive ? 'green' : 'red'
                    }}
                >
                    {isActive ? "Active" : "Inactive"}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button onClick={() => showModal(record)}>Edit</Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 20 }}>
                Add New Voucher
            </Button>
            <Table columns={columns} dataSource={vouchers} rowKey="id" />
            <Modal title={editingVoucher ? "Edit Voucher" : "Add New Voucher"} visible={isModalVisible} footer={null} onCancel={() => handleModalClose(false)}>
                <AddVoucher
                    initialData={editingVoucher}
                    onCloseModal={handleModalClose}
                    onSubmit={editingVoucher ? handleEditVoucher : fetchVouchers}
                />
            </Modal>
        </div>
    );
};

export default VoucherManager;

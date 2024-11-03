import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, List, Spin } from 'antd';
import { ListVoucher, PutVoucher, getAllAccount, ActiveDeactiveVoucher, AssignVoucherToUser } from '../../services/staffService';
import AddVoucher from './AddVoucher';

const VoucherManager = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
    const [editingVoucher, setEditingVoucher] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const fetchVouchers = async () => {
        setIsLoading(true);
        try {
            const data = await ListVoucher();
            setVouchers(data.object || []);
        } catch (error) {
            message.error("Error fetching vouchers. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await getAllAccount();
            setUsers(data || []);
        } catch (error) {
            message.error("Error fetching users. Please try again.");
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    const showModal = (voucher = null) => {
        setEditingVoucher(voucher);
        setIsModalVisible(true);
    };

    const showAssignModal = (voucher) => {
        setSelectedVoucher(voucher);
        setIsAssignModalVisible(true);
        fetchUsers();
    };

    const handleModalClose = (isSuccess) => {
        setIsModalVisible(false);
        setEditingVoucher(null);
        if (isSuccess) fetchVouchers();
    };

    const handleAssignModalClose = () => {
        setIsAssignModalVisible(false);
        setSelectedVoucher(null);
    };

    const handleEditVoucher = async (formData) => {
        try {
            await PutVoucher(formData);
            message.success("Voucher updated successfully!");
            handleModalClose(true);
        } catch (error) {
            message.error("Error updating voucher. Please try again.");
        }
    };

    const handleAssignVoucher = async (accountId) => {
        if (!selectedVoucher) {
            message.error("Voucher not selected.");
            return;
        }

        if (selectedVoucher.quantity <= selectedVoucher.used) {
            message.warning("No more vouchers available to assign.");
            return;
        }

        const formData = {
            accountId: accountId,
            voucherId: selectedVoucher.voucherId,
        };

        try {
            await AssignVoucherToUser(formData); // Call the API to assign the voucher
            message.success("Voucher assigned successfully!");
            handleAssignModalClose(); // Close the assign modal
            fetchVouchers(); // Refresh the vouchers list
        } catch (error) {
            message.error("Error assigning voucher. Please try again.");
        }
    };

    const handleToggleVoucherStatus = async (voucherId, currentStatus) => {
        try {
            await ActiveDeactiveVoucher({ voucherId: voucherId, flag: currentStatus ? 0 : 1 });
            message.success(`Voucher ${currentStatus ? 'deactivated' : 'activated'} successfully!`);
            fetchVouchers();
        } catch (error) {
            message.error("Error toggling voucher status. Please try again.");
        }
    };

    const columns = [
        { title: 'Voucher Name', dataIndex: 'voucherName', key: 'voucherName' },
        { title: 'Expiry Date', dataIndex: 'expiredDate', key: 'expiredDate', render: date => date ? new Date(date).toLocaleString() : 'N/A' },
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
                <div>
                    <Button onClick={() => showModal(record)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button onClick={() => showAssignModal(record)} style={{ marginRight: 8 }}>Assign</Button>
                    <Button onClick={() => handleToggleVoucherStatus(record.voucherId, record.isActive)}>
                        {record.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 20 }}>
                Add New Voucher
            </Button>
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={vouchers} rowKey="id" />
            </Spin>
            <Modal title={editingVoucher ? "Edit Voucher" : "Add New Voucher"} visible={isModalVisible} footer={null} onCancel={() => handleModalClose(false)}>
                <AddVoucher
                    initialData={editingVoucher}
                    onCloseModal={handleModalClose}
                    onSubmit={editingVoucher ? handleEditVoucher : fetchVouchers}
                />
            </Modal>
            <Modal title="Assign Voucher" visible={isAssignModalVisible} footer={null} onCancel={handleAssignModalClose}>
                <List
                    itemLayout="horizontal"
                    dataSource={users.filter(user => user.roleId === 1 && !user.isBan)}
                    renderItem={user => (
                        <List.Item actions={[<Button type="link" onClick={() => handleAssignVoucher(user.accountId)}>Assign</Button>]} key={user.accountId}>
                            <List.Item.Meta title={user.accountName} description={user.accountEmail} />
                            <List.Item.Meta title={`Address: ${user.address}`} description={`Phone: ${user.phoneNumber}`} />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

export default VoucherManager;

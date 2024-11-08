import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Popconfirm, message, Tag, Modal, Descriptions, Spin, Image } from 'antd';
import { ViewReport, SetStatusReport, getToyByID } from '../../services/staffService';
import { formatCurrency } from '../../utils/currency';

const statusOrder = {
    'Pending': 'Processing',
    'Processing': 'Processed',
};

const statusColors = {
    'Pending': 'gold',
    'Processing': 'blue',
    'Processed': 'green',
};

const ViewReportPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [toyDetails, setToyDetails] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [reporterName, setReporterName] = useState('');
    const [reportDetail, setReportDetail] = useState('');

    const fetchData = useCallback(async (pageIndex = pagination.current, pageSize = pagination.pageSize) => {
        setLoading(true);
        try {
            const result = await ViewReport(pageIndex - 1, pageSize);
            setData(result.items);
            setPagination((prevPagination) => ({
                ...prevPagination,
                current: pageIndex,
                pageSize: result.pageSize,
                total: result.totalItemsCount,
            }));
        } catch (error) {
            message.error('Failed to load data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleTableChange = (newPagination) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        }));
    };

    const handleChangeStatus = async (reportId, currentStatus) => {
        const newStatus = statusOrder[currentStatus];
        try {
            await SetStatusReport(reportId, newStatus);
            message.success(`Status changed to ${newStatus}`);
            fetchData();
        } catch (error) {
            message.error('Failed to change status');
        }
    };

    const handleViewDetails = async (toyId, reporterName, reportDetail) => {
        setModalLoading(true);
        setIsModalVisible(true);
        setReporterName(reporterName);
        setReportDetail(reportDetail);
        try {
            const details = await getToyByID(toyId);
            setToyDetails(details);
        } catch (error) {
            message.error('Failed to load toy details');
        } finally {
            setModalLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setToyDetails(null);
        setReporterName('');
        setReportDetail('');
    };

    const columns = [
        {
            title: 'Report ID',
            dataIndex: 'reportId',
            key: 'reportId',
        },
        {
            title: 'Toy Id',
            dataIndex: 'toyId',
            key: 'toyId',
        },
        {
            title: 'Toy Name',
            dataIndex: 'toyName',
            key: 'toyName',
        },
        {
            title: 'Reporter Name',
            dataIndex: 'reporterName',
            key: 'reporterName',
        },
        {
            title: 'Report Detail',
            dataIndex: 'reportDetail',
            key: 'reportDetail',
        },
        {
            title: 'Report Date',
            dataIndex: 'reportDate',
            key: 'reportDate',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={statusColors[status] || 'default'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => handleViewDetails(record.toyId, record.reporterName, record.reportDetail)}>
                        View Details
                    </Button>
                    {record.status !== 'Processed' ? (
                        <Popconfirm
                            title={`Change status to ${statusOrder[record.status]}?`}
                            onConfirm={() => handleChangeStatus(record.reportId, record.status)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary">Change Status</Button>
                        </Popconfirm>
                    ) : (
                        <Button type="default" disabled>
                            Status Finalized
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.reportId}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                }}
                loading={loading}
                onChange={handleTableChange}
            />
            <Modal
                title="Toy Details"
                visible={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                {modalLoading ? (
                    <Spin />
                ) : toyDetails ? (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Image">
                            <Image src={toyDetails.imageUrl} alt={toyDetails.toyName} style={{ width: '100%', maxHeight: '300px' }} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Toy Name">{toyDetails.toyName}</Descriptions.Item>
                        <Descriptions.Item label="Description">{toyDetails.description}</Descriptions.Item>
                        <Descriptions.Item label="Category">{toyDetails.categoryName}</Descriptions.Item>
                        <Descriptions.Item label="Rental Available">{toyDetails.isRental ? 'Yes' : 'No'}</Descriptions.Item>

                        {toyDetails.isRental ? (
                            <>
                                <Descriptions.Item label="Rent Price per Day">{formatCurrency(toyDetails.rentPricePerDay)}</Descriptions.Item>
                                <Descriptions.Item label="Rent Price per Week">{formatCurrency(toyDetails.rentPricePerWeek)}</Descriptions.Item>
                                <Descriptions.Item label="Rent Price per Two Weeks">{formatCurrency(toyDetails.rentPricePerTwoWeeks)}</Descriptions.Item>
                            </>
                        ) : (
                            <Descriptions.Item label="Buy Price">{formatCurrency(toyDetails.buyPrice)}</Descriptions.Item>
                        )}

                        <Descriptions.Item label="Stock">{toyDetails.stock}</Descriptions.Item>
                        <Descriptions.Item label="Supplier">{toyDetails.supplierName}</Descriptions.Item>
                        <Descriptions.Item label="Reporter Name">{reporterName}</Descriptions.Item>
                        <Descriptions.Item label="Report Detail">{reportDetail}</Descriptions.Item>
                    </Descriptions>
                ) : (
                    <p>No details available</p>
                )}
            </Modal>
        </>
    );
};

export default ViewReportPage;

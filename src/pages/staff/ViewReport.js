import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Tag } from 'antd';
import { ViewReport, SetStatusReport } from '../../services/staffService'; // Import the API functions
import moment from 'moment'; // Use moment to format dates

const statusOrder = {
    'Pending': 'Processing',
    'Processing': 'Processed',
    // 'Processed' has no next status in the cycle
};

// Define colors for each status
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

    const fetchData = async (pageIndex, pageSize) => {
        setLoading(true);
        try {
            const result = await ViewReport(pageIndex - 1, pageSize); // Adjust for zero-based API indexing
            setData(result.items);
            setPagination({
                ...pagination,
                current: pageIndex,
                pageSize: result.pageSize,
                total: result.totalItemsCount,
            });
        } catch (error) {
            message.error('Failed to load data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, [pagination.current, pagination.pageSize]);

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
    };

    const handleChangeStatus = async (reportId, currentStatus) => {
        const newStatus = statusOrder[currentStatus];
        try {
            await SetStatusReport(reportId, newStatus);
            message.success(`Status changed to ${newStatus}`);
            fetchData(pagination.current, pagination.pageSize); // Refresh data
        } catch (error) {
            message.error('Failed to change status');
        }
    };

    const columns = [
        {
            title: 'Report ID',
            dataIndex: 'reportId',
            key: 'reportId',
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
                record.status !== 'Processed' ? (
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
                )
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.reportId} // Assuming each row has a unique reportId
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
    );
};

export default ViewReportPage;

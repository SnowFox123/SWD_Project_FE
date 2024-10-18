import React, { useEffect, useState } from 'react';
import { getAnsweredRequests, getToyByID } from '../../services/staffService';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Table, Spin, Button, Avatar, Modal, Image } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnsweredRequests = () => {
  const [answeredRequests, setAnsweredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null);

  // Fetch answered requests from the API
  const fetchAnsweredRequests = async () => {
    setLoading(true); // Set loading state before fetching
    try {
      const data = await getAnsweredRequests();
      setAnsweredRequests(data);
    } catch (error) {
      // Handle API errors
      if (error.validationErrors) {
        toast.error('Validation Errors: ' + JSON.stringify(error.validationErrors));
      } else {
        toast.error('Failed to load answered requests.');
      }
    } finally {
      setLoading(false); // Reset loading state after fetch
    }
  };

  useEffect(() => {
    fetchAnsweredRequests(); // Fetch data when the component mounts
  }, []);

  const fetchRequestDetails = async (requestId) => {
    try {
      const details = await getToyByID(requestId); // Fetch toy details by requestId
      setRequestDetails(details);
    } catch (error) {
      toast.error('Failed to load request details.');
    }
  };

  const showModal = (request) => {
    setSelectedRequest(request);
    fetchRequestDetails(request.requestId); // Fetch details for selected request
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
    setRequestDetails(null); // Reset details when modal is closed
  };

  // Render loading spinner if data is loading
  if (loading) {
    return (
      <div className="loader">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  // Define table columns
  const columns = [
    {
      title: 'STT',
      dataIndex: 'requestId',
      key: 'requestId',
    },
    {
      title: 'Create Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'For Rent',
      dataIndex: 'forRent',
      key: 'forRent',
      render: (forRent) => (
        <span>
          {forRent ? (
            <CheckOutlined style={{ color: 'green', marginRight: 5 }} />
          ) : (
            <CloseOutlined style={{ color: 'red', marginRight: 5 }} />
          )}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      render: (status) => {
        let statusText;
        let statusColor;

        switch (status) {
          case 0:
            statusText = 'Not processed yet';
            statusColor = 'grey';
            break;
          case 1:
            statusText = 'Approve';
            statusColor = 'green';
            break;
          case 2:
            statusText = 'Deny';
            statusColor = 'red';
            break;
          default:
            statusText = 'Something wrong';
            statusColor = 'orange';
            break;
        }

        return <span style={{ color: statusColor }}>{statusText}</span>;
      },
    },
    {
      title: 'Deny Reason',
      dataIndex: 'denyReason',
      key: 'denyReason',
      render: (denyReason) => <p>{denyReason || ''}</p>, // Display empty string if denyReason is null
    },
    {
      title: '',
      dataIndex: 'ViewDetail',
      key: 'ViewDetail',
      render: (text, record) => (
        <Button onClick={() => showModal(record)}>View Detail</Button>
      ),
    },
  ];

  // Render the list of answered requests
  return (
    <div className="answered-requests">
      <h1>Answered Requests</h1>
      <Table
        dataSource={answeredRequests}
        columns={columns}
        rowKey="requestId" // Unique key for each row
      />
      <Modal
        title="Request Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        className="centered-modal"
        style={{ borderRadius: '10px', overflow: 'hidden', top: '20px' }} // Make the modal rounded
        bodyStyle={{ padding: '20px', textAlign: 'center' }} // Center and style the content
      >
        {requestDetails ? (
          <div>
            {/* Avatar Image Styling */}
            <Image
              src={requestDetails.imageUrl}
              alt={requestDetails.toyName}
              shape="square"
              size={120}
              style={{
                display: 'flex',
                objectFit: 'contain',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '200px',
                margin: '0 auto 20px',
                border: '2px solid #f0f0f0',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }}
            />

            {/* Toy Details Styling */}
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
              {requestDetails.toyName}
            </p>
            <p style={{ color: '#777', fontSize: '14px', marginBottom: '15px' }}>
              {requestDetails.description}
            </p>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <p><strong>Category Name:</strong> {requestDetails.categoryName}</p>
              <p><strong>Rental:</strong> {requestDetails.isRental ? 'Rental Available' : 'Not for Rent'}</p>

              {requestDetails.isRental ? (
                <>
                  <p><strong>Rent per Day:</strong> {requestDetails.rentPricePerDay}</p>
                  <p><strong>Rent per Week:</strong> {requestDetails.rentPricePerWeek}</p>
                  <p><strong>Rent for Two Weeks:</strong> {requestDetails.rentPricePerTwoWeeks}</p>
                </>
              ) : (
                <p><strong>Buy Price:</strong> {requestDetails.buyPrice}</p>
              )}
              <p><strong>Stock:</strong> {requestDetails.stock}</p>
              <p><strong>Supplier:</strong> {requestDetails.supplierName}</p>
            </div>
          </div>
        ) : (
          <Spin tip="Loading details..." />
        )}
      </Modal>
    </div>
  );
};

export default AnsweredRequests;

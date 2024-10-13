import React, { useEffect, useState } from 'react';
import { getUnansweredRequests, getToyByID, AcceptDenyRequest } from '../services/staffService'; // Import the function to get request details
import { Table, Spin, Modal, Button, Avatar, Input } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UnansweredRequests = () => {
  const [unansweredRequests, setUnansweredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [denyReason, setDenyReason] = useState(''); // State to hold deny reason
  const [error, setError] = useState(null);
  const [requestDetails, setRequestDetails] = useState(null); // State to store details of the selected request

  // Fetch unanswered requests from the API
  const fetchUnansweredRequests = async () => {
    try {
      const data = await getUnansweredRequests();
      setUnansweredRequests(data);
    } catch (error) {
      if (error.validationErrors) {
        toast.error('Validation Errors: ' + JSON.stringify(error.validationErrors));
      } else {
        toast.error('Failed to load unanswered requests.', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnansweredRequests();
  }, []);

  // Fetch request details when the modal is opened
  const fetchRequestDetails = async (requestId) => {
    try {
      const details = await getToyByID(requestId); // Assuming this function fetches details by requestId
      setRequestDetails(details);
      console.log(requestId);
    } catch (error) {
      toast.error('Failed to load request details.');
    }
  };

  // Show modal and fetch selected request details
  const showModal = (request) => {
    setSelectedRequest(request);
    fetchRequestDetails(request.requestId); // Fetch details of the selected request
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
    setRequestDetails(null); // Reset details when modal is closed
    setDenyReason(''); // Reset deny reason when modal closes
    setError(null); // Reset error state
  };

  const handleSubmit = async (requestStatus) => {
    // Step 1: Validate input
    if (requestStatus === 2 && !denyReason) {
      // If the status is "Deny" but no reason is provided, show an error toast
      toast.error('Deny reason is required.'); // Show toast error
      setError('Deny reason is required.'); // Update state for possible UI feedback
      return; // Exit the function early
    }

    // Step 2: Prepare the request payload
    const requestData = {
      requestId: selectedRequest.requestId, // Get the request ID from the selected request
      requestStatus, // Set the request status (Accept or Deny)
      denyReason: requestStatus === 2 ? denyReason : '', // Include deny reason only if status is Deny
    };

    try {
      // Step 3: Call the API to accept or deny the request
      await AcceptDenyRequest(
        requestData.requestId,
        requestData.requestStatus,
        requestData.denyReason
      );

      // Step 4: Show success toast notification based on request status
      const message = requestStatus === 1 ? 'Request Accepted successfully!' : 'Request Denied successfully!';
      toast.success(message); // Show success message
      handleModalClose(); // Close the modal after processing
      fetchUnansweredRequests(); // Refresh the list of unanswered requests
    } catch (err) {
      // Step 5: Handle any errors that occur during the API call
      const errorMessage = err.message || 'Unknown error occurred while processing the request.';
      toast.error(`Error: ${errorMessage}`); // Show error toast with message
    }
  };


  // Define columns for the table
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
    // {
    //   title: 'Deny Reason',
    //   dataIndex: 'denyReason',
    //   key: 'denyReason',
    //   render: (denyReason) => (
    //     <span>
    //       {denyReason ? (
    //         <p>{denyReason}</p>
    //       ) : (
    //         <CloseOutlined style={{ color: 'red', marginRight: 5 }} />
    //       )}
    //     </span>
    //   ),
    // },
    {
      title: '',
      dataIndex: 'ViewDetail',
      key: 'ViewDetail',
      render: (text, record) => (
        <Button onClick={() => showModal(record)}>View Detail</Button>
      ),
    },
  ];

  // Render loading spinner if data is still loading
  if (loading) {
    return (
      <div className="loader">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  // Render the main component
  return (
    <div className="unanswered-requests">
      <h1>Unanswered Requests</h1>
      <Table
        dataSource={unansweredRequests}
        columns={columns}
        rowKey="requestId"
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
            <Avatar
              src={requestDetails.imageUrl}
              alt={requestDetails.toyName}
              shape="square"
              size={120}
              style={{
                display: 'flex',
                objectFit: 'cover', // đảm bảo hình ảnh không bị cắt xén
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 20px',
                border: '2px solid #f0f0f0',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
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

            {/* Deny Reason Input Field */}
            <div style={{ marginBottom: '20px' }}>
              <Input.TextArea
                rows={4}
                value={denyReason}
                onChange={(e) => {
                  setDenyReason(e.target.value);
                  setError(null); // Clear error when typing
                }}
                placeholder="Reason for denial (if applicable)"
                style={{ resize: 'none' }} // Prevent resizing
              />
              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
              <Button
                type="danger"
                style={{
                  borderRadius: '5px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ff4d4f',
                  borderColor: '#ff4d4f',
                  marginRight: '10px'
                }}
                onClick={() => handleSubmit(2)} // Deny request
              // disabled={!denyReason} // Disable button if no deny reason
              >
                Deny
              </Button>
              <Button
                type="primary"
                style={{
                  borderRadius: '5px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff'
                }}
                onClick={() => handleSubmit(1)} // Accept request
              >
                Accept
              </Button>
            </div>
          </div>
        ) : (
          <Spin tip="Loading details..." />
        )}
      </Modal>
    </div>
  );
};

export default UnansweredRequests;

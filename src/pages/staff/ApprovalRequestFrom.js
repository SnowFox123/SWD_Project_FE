import React from 'react'
import { Tabs } from 'antd';
import AnsweredRequests from './AnsweredRequests';
import UnansweredRequests from './UnansweredRequests';

const items = [
  {
    key: '1',
    label: 'Unanswered Requests',
    children: <UnansweredRequests />,
  },
  {
    key: '2',
    label: 'Answered Requests',
    children: <AnsweredRequests />
  },
  // {
  //   key: '3',
  //   label: 'Request created',
  //   children: 'Content of Tab Pane 3',
  // },
  // {
  //   key: '4',
  //   label: 'Request result',
  //   children: 'Content of Tab Pane 3',
  // },
];

const ApprovalRequestFrom = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />

    </>
  )
}

export default ApprovalRequestFrom

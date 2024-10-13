import React from 'react'
import RequestRental from './RequestRental'
import { Tabs } from 'antd';
import RequestSale from './RequestSale';

const items = [
  {
    key: '1',
    label: 'For rent',
    children: <RequestRental />
  },
  {
    key: '2',
    label: 'For sale',
    children: <RequestSale />,
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

const RequestForm = () => {
  return (
    <>
    <Tabs defaultActiveKey="1" items={items}/>
        
    </>
  )
}

export default RequestForm
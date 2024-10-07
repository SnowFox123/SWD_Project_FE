import React from 'react'
import RequestRental from './RequestRental'
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'For sale',
    children: <RequestRental />
  },
  {
    key: '2',
    label: 'For rent',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Request created',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '4',
    label: 'Request result',
    children: 'Content of Tab Pane 3',
  },
];

const RequestForm = () => {
  return (
    <>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        
    </>
  )
}

export default RequestForm
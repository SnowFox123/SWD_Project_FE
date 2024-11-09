import React from 'react'
import { Tabs } from 'antd';
import ToyRentStaff from './ToyRentStaff';
import ToySaleStaff from './ToySaleStaff';

const items = [
    {
        key: '1',
        label: 'Toy Rent Staff',
        children: <ToyRentStaff />,
    },
    {
        key: '2',
        label: 'Toy Sale Staff',
        children: <ToySaleStaff />
    }
];

const ViewToyPage = () => {
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />

        </>
    )
}

export default ViewToyPage

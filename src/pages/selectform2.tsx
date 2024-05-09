import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd/lib';
import { api } from '~/utils/api';

interface UserProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    surname: string;
}

function SelectForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState<UserProps[]>([]);
    const { data: select } = api.crud.select.useQuery({
        name: 'samphao@gmail.com',
    });

    useEffect(() => {
        if (select) {
            setUsers(select);
        }
    }, [select]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const editBtn = (record: UserProps) => {
        console.log('Edit button clicked', record);
    };

    const deleteUser = (id: number) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
        message.success('User deleted successfully');

    };

    const delBtn = (record: UserProps) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: `Name: ${record.name}, Email: ${record.email}`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => deleteUser(record.id),
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Tool',
            dataIndex: 'id',
            render: (text: any, record: UserProps) => (
                <>
                    <Button type="primary" onClick={() => editBtn(record)}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button
                        type="primary"
                        danger
                        onClick={() => delBtn(record)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-end mt-5 mr-5">
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
            </div>
            <Table dataSource={users} columns={columns} rowKey="id" />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default SelectForm;

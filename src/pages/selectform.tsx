import React, { useState, useEffect } from 'react'
import { Table, Button, Modal }
    from
    "antd/lib"
    ;
import { api } from "~/utils/api";



interface userProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    surname: string;
}

function selectform() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<userProps[]>();
    const { data: select, isLoading } = api.crud.select.useQuery({
        name: "samphao@gmail.com",
    });
    useEffect(() => {
        const listUser = () => {
            setUser(select);
        }
        listUser();
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

    const editBtn = () => { };
    const delBtn = () => { };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'SurName',
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
            dataIndex: 'id', render: (text: any, record: any, index: any) => (
                <>
                    <Button type="primary" onClick={editBtn}>
                        Edit
                    </Button>
                    &nbsp;
                    <Button type="primary" onClick={delBtn} danger>
                        Delete
                    </Button>

                </>
            )
        }

    ];

    return (
        <div>
            <div className='flex justify-end mt-5 mr-5'>
                <div>
                    <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button>
                </div>
            </div>
            <Table dataSource={user} columns={columns} rowKey="id" />;
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default selectform

import React, { useState, useEffect } from 'react'
import { Table, Button, Modal }
    from
    "antd/lib"
    ;
import { api } from "~/utils/api";
import TestForm from './testfromhook';



interface userProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    surname: string;
}

function Modalfrom() {
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


    return (
        <div>
            <div className='flex justify-end mt-5 mr-5'>
                <div>
                    <Button type="primary" onClick={showModal}>
                        Open Modal
                    </Button>
                </div>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <TestForm />
            </Modal>
        </div>
    )
}

export default Modalfrom

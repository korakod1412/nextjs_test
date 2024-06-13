import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd/lib";
import { api } from "~/utils/api";
import AddForm from "~/pages/manageuser/add";
import EditForm from "~/pages/manageuser/edit";
import Swal from "sweetalert2";
import ModalMain from "~/features/ui/components/modal";
import { v4 as uuidv4 } from "uuid";
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";
import { type userProps } from "~/features/manageUser/types";
import { type user as UserModel } from "@prisma/client";
import Head from "next/head";
import Layout from "~/features/ui/components/layouts/Normal";
import { type NextPageWithLayout } from "../_app";
const ManageUser: NextPageWithLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectUser, setSelectUser] = useState<UserModel>();
  const [users, setUsers] = useState<UserModel[]>([]);
  const { data: select, isLoading } = api.crud.select.useQuery({
    name: "",
  });
  const delUser = api.crud.delete.useMutation();

  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalOpenAdd, setModalOpenAdd] = useState<boolean>(false);
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);

  const utils = api.useContext();
  const list = utils.crud.select;

  useEffect(() => {
    setLoading(true);
    if (select) {
      setUsers(select);
      setLoading(false);
    }
  }, [select]);

  const addModal = () => {
    setModalOpenAdd(true);
    setModalTitle("เพิ่มข้อมูล พนักงาน");
  };

  const editBtn = (record: UserModel) => {
    setModalOpenEdit(true);
    setSelectUser(record);

    setModalTitle("แก้ไขข้อมูล พนักงาน");
  };

  const deleteUser = (id: number) => {
    delUser.mutate(
      { id: id },
      {
        onSuccess: async (itemDelete) => {
          list.invalidate();
          Swal.fire({
            title: "Delete User",
            text: "Deletet User Complete",
            icon: "success",
          });
        },
      },
    );

    // message.success("User deleted successfully");
  };

  const delBtn = (record: UserModel) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: `Name: ${record.name}, Email: ${record.email}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => deleteUser(record.id),
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Tool",
      dataIndex: "id",
      render: (text: any, record: UserModel) => (
        <>
          <Button type="primary" onClick={() => editBtn(record)}>
            Edit
          </Button>
          &nbsp;
          <Button type="primary" danger onClick={() => delBtn(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="mr-5 mt-5 flex justify-end">
        <Button type="primary" onClick={addModal}>
          Add
        </Button>
      </div>

      <Table dataSource={users} columns={columns} rowKey="id" />

      <ModalMain
        modalOpen={modalOpenAdd}
        modalTitle={modalTitle}
        setModalOpen={setModalOpenAdd}
      >
        <AddForm
          setValue={setUsers}
          value={users}
          setModal={setModalOpenAdd}
          valueModal={modalOpenAdd}
        />
        {/*555*/}
      </ModalMain>

      <ModalMain
        modalOpen={modalOpenEdit}
        modalTitle={modalTitle}
        setModalOpen={setModalOpenEdit}
      >
        <EditForm
          setValue={setUsers}
          time={uuidv4()}
          value={users}
          setModal={setModalOpenEdit}
          valueModal={modalOpenEdit}
          valueSelectUser={selectUser!}
        />
        {/*555*/}
      </ModalMain>
    </div>
  );
};
ManageUser.getLayout = Layout;
export default ManageUser;
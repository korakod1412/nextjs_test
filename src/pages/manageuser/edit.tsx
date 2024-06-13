import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "antd/lib";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "~/features/ui/components/form/input";
import {
  formSchema,
  type FormSchemaInputType,
  type FormSchemaOutputType,
} from "~/features/manageUser/validation";
import Swal from "sweetalert2";
import React, { useEffect, Dispatch, SetStateAction } from "react";
import { type userProps } from "~/features/manageUser/types";
import { user as UserModel } from "@prisma/client";
interface Props {
  value: UserModel[];
  setValue: Dispatch<SetStateAction<UserModel[]>>;
  valueModal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  valueSelectUser: UserModel;
  time: string;
}

export function editForm(props: Props) {
  const utils = api.useContext();
  const list = utils.crud.select;
  const { mutate } = api.crud.update.useMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormSchemaInputType>({
    resolver: zodResolver(formSchema, {}, { raw: true }),

    defaultValues: {
      idUser: props.valueSelectUser.id,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaOutputType> = async (data) => {
    mutate(data, {
      //this is working - title is going to database if its not already there
      onSuccess: () => {
        Swal.fire({
          title: "Update User ",
          text: "Completed successfully",
          icon: "success",
        });
        list.invalidate();
        props.setModal(false);
        control._reset();
      }, //try#2);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-2 grid  rounded bg-amber-200 pt-4">
          <div className=" flex flex-col justify-center gap-2   p-4 text-left">
            <div>
              <Input
                label="Name"
                name="input_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
                defaultValue={`${props.valueSelectUser.name}`}
              />
              {errors.input_str && (
                <p className="error-message">{errors.input_str.message}</p>
              )}
            </div>
            <div>
              <Input
                label="surName"
                name="surname_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
                defaultValue={props.valueSelectUser.surname?.toString()}
              />
              {errors.surname_str && (
                <p className="error-message">{errors.surname_str.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Address"
                name="address_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
                defaultValue={props.valueSelectUser.address}
              />
              {errors.address_str && (
                <p className="error-message">{errors.address_str.message}</p>
              )}
            </div>
            <div>
              <Input
                defaultValue={props.valueSelectUser.phone}
                label="Phone"
                name="phone_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
              />
              {errors.phone_str && (
                <p className="error-message">{errors.phone_str.message}</p>
              )}
            </div>
            <div>
              <Input
                defaultValue={props.valueSelectUser.email?.toString()}
                label="Email"
                name="email_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
              />
              {errors.email_str && (
                <p className="error-message">{errors.email_str.message}</p>
              )}
            </div>
          </div>
          <div className=" m-4 flex  flex-row justify-center  gap-2 text-left align-middle">
            <div className="mt-15 flex-none">
              <Button htmlType="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default editForm;
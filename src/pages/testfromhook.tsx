import { FormEvent } from "react";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd/lib";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "~/components/input";
import {
  formSchema,
  type FormSchemaInputType,
  type FormSchemaOutputType,
} from "~/components/validation";
import Swal from 'sweetalert2'

{/*import {
  FormSchemaInputType,
  formSchema,
  titleOptions,
} from "~/components/form/schemaTest";*/}
function testForm() {
  const { mutate } = api.crud.create.useMutation();
  const {
    register, control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaInputType>({
    resolver: zodResolver(formSchema, {}, { raw: true }),
  });
  //const insert = api.post.create.useMutation();

  const onSubmit: SubmitHandler<FormSchemaOutputType> = async (data) => {
    mutate(data, {
      //this is working - title is going to database if its not already there
      onSuccess: () => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      }, //try#2);
    });
  };


  /*const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };*/


  /*async function onSubmitx(event: FormData) {
    console.log(event);
    //  event.preventDefault();
    const { input_str } = event;
    alert(JSON.stringify(input_str));
  }*/
  /*async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      input_str: { value: string };
      surname_str: { value: string };
      address_str: { value: string };
      phone_str: { value: string };
      email_str: { value: string };
      //password: { value: string };
    };
    const input_str = target.input_str.value;
    alert(input_str);
  }*/


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-10 grid  rounded bg-amber-200 pt-10">
          <div className=" flex flex-row justify-center gap-2   text-left">
            <div className="w-2/12 flex-initial">
              <Input
                label="Name"
                name="input_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
              />
              {errors.input_str && (
                <p className="error-message">{errors.input_str.message}</p>
              )}
            </div>
            <div className="w-2/12">
              <Input
                label="surName"
                name="surname_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
              />
              {errors.surname_str && (
                <p className="error-message">{errors.surname_str.message}</p>
              )}
            </div>
          </div>

          <div className=" flex flex-row  justify-center gap-2  text-left align-middle">
            <div className="w-4/12 flex-none">
              <Input
                label="Address"
                name="address_str"
                control={control}
                rules={{ required: "Name is required" }}
                placeholder="Enter your user name"
                type="text"
              />
              {errors.address_str && (
                <p className="error-message">{errors.address_str.message}</p>
              )}
            </div>
          </div>
          <div className=" flex flex-row justify-center gap-2   text-left">
            <div className="w-2/12 flex-initial">
              <Input
                defaultValue="222-222-2222"
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
            <div className="w-2/12">
              <Input
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

export default testForm;
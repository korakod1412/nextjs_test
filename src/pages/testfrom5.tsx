import { FormEvent } from "react";
import { Button, Input } from "antd/lib";
function testForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
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
  }
  {
    /*  const onSubmit1 = (values) => {
    console.log(values)
  }

*/
  }
  return (
    <>
      {/*      <form className="mx-auto max-w-sm">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            htmlFor="password"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-5 flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

  */}
      <form onSubmit={onSubmit}>
        <div className="m-10 grid  rounded bg-amber-200 pt-10">
         {/*<input type="text" id="lname" name="lname" /> 
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />*/} 
          <div className=" flex flex-row justify-center gap-2   text-left">
            <div className="w-2/12 flex-initial">
              <label>Name</label>{" "}
              <Input placeholder="input Name" id="input_str" />
            </div>
            <div className="w-2/12">
              <label>SurName</label>
              <Input placeholder="input SurName" id="input_surname" />
            </div>
          </div>

          <div className=" flex flex-row  justify-center gap-2  text-left align-middle">
            <div className="w-4/12 flex-none">
              <label>Address</label>
              <Input placeholder="input Address" id="input_address" />
            </div>
          </div>
          <div className=" flex flex-row justify-center gap-2   text-left">
            <div className="w-2/12 flex-initial">
              <label>Phone</label>{" "}
              <Input placeholder="please in insert phone" id="input_phone" />
            </div>
            <div className="w-2/12">
              <label>Email</label>
              <Input placeholder="please in insert email" id="input_email" />
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
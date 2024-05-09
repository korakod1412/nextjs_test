import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

function Page() {
  return (
    <div className='flex flex-col gap-4'>
      <Form className="m-10 grid  rounded bg-amber-200 pt-10">
        <FormGroup>
          <Label for="exampleEmail" hidden>
            Email
          </Label>
          <Input id="exampleEmail" name="email" placeholder="Email" type="email" />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="examplePassword" hidden>
            Password
          </Label>
          <Input id="examplePassword" name="password" placeholder="Password" type="password" />
        </FormGroup>
        {' '}
        <Button>Submit</Button>
      </Form>
      
   </div>
  );
}

export default Page;

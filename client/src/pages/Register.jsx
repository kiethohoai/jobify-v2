import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import { Form, Link, redirect } from 'react-router-dom';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export const action = async ({ request }) => {
  // get data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // call api
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow type="text" name="name" labelText="name" defaultValue="john" />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="ho"
        />
        <FormRow
          type="text"
          name="location"
          labelText="location"
          defaultValue="my city"
        />
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="john@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="123456"
        />

        {/* submit */}
        <SubmitBtn />

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;

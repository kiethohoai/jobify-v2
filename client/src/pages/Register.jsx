import Wrapper from '../assets/wrappers/RegisterAndLoginPage.js';
import { Form, Link, redirect, useNavigation } from 'react-router-dom';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

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

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
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

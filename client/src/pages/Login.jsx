import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export const action = async ({ request }) => {
  // get data
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // call api login
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: `test@gmail.com`,
      password: `123456`,
    };

    try {
      await customFetch.post(`/auth/login`, data);
      toast.success('Test User logged in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        <FormRow type="email" name="email" defaultValue="john@gmail.com" />
        <FormRow type="password" name="password" defaultValue="123456" />

        {/* submit */}
        <SubmitBtn />

        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>

        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;

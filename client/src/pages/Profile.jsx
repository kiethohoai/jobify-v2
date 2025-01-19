import Wrapper from '../assets/wrappers/DashboardFormPage';
import customFetch from '../utils/customFetch';
import { useNavigation, Form } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { FormRow } from '../components';
import { toast } from 'react-toastify';

// eslint-disable-next-line
export const action = async ({ request }) => {
  // get data from Submit Form
  const formData = await request.formData();
  const file = formData.get('avatar');

  // check image size > 0.5Mb
  if (file & (file.size > 500000)) {
    toast.error('Image size too large! Image size should be less than 0.5MB');
    return null;
  }

  // call api
  try {
    await customFetch.patch('/users/update-user', formData);
    toast.success('Image uploaded successfully!');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  // final
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form className="form" method="post" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          {/* input upload image */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>

          {/* name, lastName, email, location */}
          <FormRow
            type="text"
            name="name"
            labelText="name"
            defaultValue={name}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow
            type="email"
            name="email"
            labelText="email"
            defaultValue={email}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            defaultValue={location}
          />

          {/* submit button */}
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;

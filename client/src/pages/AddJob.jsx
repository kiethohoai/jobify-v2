import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '../components';
import { redirect, useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

// eslint-disable-next-line
export const action = async ({ request }) => {
  // get formdata
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // call api to create job
  try {
    await customFetch.post('/jobs', data);
    toast.success('Job created successfully');
    return redirect('all-jobs');
  } catch (error) {
    toast.error('Creating job failed');
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            defaultValue="Fullstacks Developer"
          />

          <FormRow type="text" name="company" defaultValue="Google" />

          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />

          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />

          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />

          <button className="btn btn-block form-btn" type="submit">
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;

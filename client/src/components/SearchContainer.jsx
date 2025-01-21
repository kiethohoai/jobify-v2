import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect } from '.';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, sort, jobStatus, jobType } = searchValues;

  // delay the last keyPress, prevent wasted request
  const debounce = (onChange) => {
    let timeout;

    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>

        <div className="form-center">
          {/* search input */}
          <FormRow
            type="text"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          {/* jobStatus */}
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          {/* jobType */}
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          {/* sort */}
          <FormRowSelect
            name="sort"
            labelText="sort"
            list={Object.values(JOB_SORT_BY)}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          {/* reset values */}
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;

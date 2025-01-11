import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(`🚀CHECK > error:`, error);

  return (
    <div>
      <h1>Error Page 404</h1>
      <Link to="/">back home</Link>
    </div>
  );
};
export default Error;

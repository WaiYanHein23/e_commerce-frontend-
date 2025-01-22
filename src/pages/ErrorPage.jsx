import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
      <p className="text-xl mt-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-600 mt-2">{error.statusText || error.message}</p>
      <Link to="/" className="mt-4 text-blue-500 hover:text-blue-700">
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;

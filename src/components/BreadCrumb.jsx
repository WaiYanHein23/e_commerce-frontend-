import { Link } from "react-router-dom";

const BreadCrumb = ({ currentPage }) => {
  return (
    <div className="flex mx-4 mb-2">
      <Link to={"/"}>Home</Link>
      <span className="mx-2"> / </span>
      <p className="text-gray-600 ">{currentPage}</p>
    </div>
  );
};

export default BreadCrumb;

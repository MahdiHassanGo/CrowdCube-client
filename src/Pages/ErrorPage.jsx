import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="./assets/ErrorPage.png"
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">OOPS! PAGE NOT FOUND</h1>
      <p className="py-6">
        You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.
      </p>
      <Link to='/' className="btn bg-Profile text-white">Back to Home</Link>
    </div>
  </div>
</div>
    );
};

export default ErrorPage;
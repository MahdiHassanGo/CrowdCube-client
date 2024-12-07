import "aos/dist/aos.css";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    document.title = "Login | CareHive";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userLogin, setUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error("Login failed: " + err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google Sign-In successful!");
        setTimeout(() => {
          navigate(location?.state || "/");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Google Sign-In failed: " + err.message);
      });
  };

  return (
    <div>
      <ToastContainer position="top-center" />
      <div
        className="hero   min-h-screen flex items-center justify-center"
        data-aos="fade-up"
      >
        <div className="hero-content flex-col  gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-0">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-2xl p-4 md:p-6 ">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <div className="flex gap-10 mt-2">
                  <label className="label">
                    <Link
                      to="/auth/register"
                      className="label-text-alt link link-hover"
                    >
                      Register Here
                    </Link>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-Profile text-white">Login</button>
                <button onClick={handleGoogleSignIn} className="btn mt-5">
                  <FaGoogle /> Login with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
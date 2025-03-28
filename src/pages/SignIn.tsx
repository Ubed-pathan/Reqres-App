import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { SignInDataType } from "../types";
import { loginUser } from "../api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignIn() {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState<SignInDataType>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSignInData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSignIn(e: FormEvent): Promise<void> {
    e.preventDefault();

    setLoading(true)

    const trimmedUsername = signInData.username.trim();
    const trimmedPassword = signInData.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      toast.error("😓 Please enter a valid username and password", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

      setSignInData({
        username: "",
        password: "",
      });

      return;
    }


    const response: AxiosResponse = await loginUser(
      trimmedUsername,
      trimmedPassword
    );

    if (response.status === 200) {
      localStorage.setItem("authToken", response.data.token);
      toast.success("😄 signed in successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setSignInData({
        username: "",
        password: "",
      });

      setLoading(false);

      setTimeout(() => {
        navigate("/users");
      }, 1100);
    } else {
      toast.error("😓 sign in failed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setSignInData({
        username: "",
        password: "",
      });

    setLoading(false);
    }
  }
  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg-100">
          <div className=" w-[90%] md:w-full max-w-md p-8 bg-bg-300 shadow-xl rounded-lg">
            <h2 className="text-3xl text-center text-text-200 mb-6">Log In</h2>

            <form className="space-y-8" onSubmit={handleSignIn}>
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  required
                  name="username"
                  value={signInData.username}
                  onChange={handleChange}
                  className="peer w-full border-b-2 border-text-200 bg-bg-300 text-text-200 focus:outline-none focus:border-accent-200 placeholder-transparent"
                />
                <label className="absolute left-0 text-text-200 top-[-16px] text-xs transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-200 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-accent-200">
                  Username*
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder=" "
                  name="password"
                  value={signInData.password}
                  onChange={handleChange}
                  required
                  className="peer w-full border-b-2 bg-bg-300 border-text-200 text-text-200 focus:outline-none focus:border-accent-200 placeholder-transparent"
                />
                <label className="absolute left-0 text-text-200 top-[-16px] text-xs transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-200 peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-accent-200">
                  Password*
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-text-200 text-bg-200 py-2 px-4 rounded-lg hover:bg-accent-200 transition-colors"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <AiOutlineLoading3Quarters
                      size={24}
                      className="text-accent-100 animate-spin"
                    />
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          aria-label={undefined}
        />
      </div>
    </>
  );
}

export default SignIn;

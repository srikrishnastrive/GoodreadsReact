import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "Redux/Slices/AuthSlice";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const state = useSelector((state) => state.auth);

    const [signupDetails, setSignupDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleFormChange(e) {
        const { name, value } = e.target;
        setSignupDetails({
            ...signupDetails,
            [name]: value
        });
    }

    function resetForm() {
        setSignupDetails({
            username: '',
            email: '',
            password: ''
        });
    }

    async function onHandleSubmit(e) {
        e.preventDefault();
        const response = await dispatch(signUp(signupDetails));
        console.log(response);
        if (response?.payload?.data) {
            navigate('/signin');
        }
        resetForm();
    }

    useEffect(() => {
        if (state.isLoggedIn) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <div>
                    <h1 className="text-white text-5xl">Create a new account</h1>
                </div>
                <div className="mt-4">
                    <p className="text-white">
                        Already have an account? 
                        <Link to="/signin">
                            <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400">
                                Sign In
                            </button>
                        </Link>
                    </p>
                </div>
                <form
                    onSubmit={onHandleSubmit}
                    className="flex flex-col justify-center items-center w-full max-w-md mx-auto mt-8 p-6  rounded-md shadow-lg"
                    autoComplete="off"
                >
                    <div className="my-5 w-full">
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="Username..."
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            name="username"
                            value={signupDetails.username}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-full">
                        <input
                            autoComplete="off"
                            type="email"
                            placeholder="Email..."
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            name="email"
                            value={signupDetails.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-full">
                        <input
                            autoComplete="off"
                            type="password"
                            placeholder="Password..."
                            className="px-4 py-2 border border-gray-300 rounded-md w-full"
                            name="password"
                            value={signupDetails.password}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="my-5 w-full">
                        <button className="btn btn-success rounded-md px-4 py-2 w-full hover:bg-green-400" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Signup;

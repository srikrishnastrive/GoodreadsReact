import Layout from "Layouts/Layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "Redux/Slices/AuthSlice";

function Signin() {

    const [siginDetails,setSigninDetails] = useState({
        email : '',
        password : ''
    });

    const state = useSelector((state)=> state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function resetForm(){
        setSigninDetails({
            email : '',
            password : ''
        });
    }

    function handleFormChange (e) {
        const {name,value} = e.target;
        setSigninDetails({
            ...siginDetails,
            [name]:value
        })
    }
    async function onFormSubmit(e){
        e.preventDefault();
        const response = await dispatch(signIn(siginDetails));
        console.log(response);
        if (response?.payload?.data){
            navigate('/dashboard');
        }
        resetForm();
        
    }

    useEffect(()=>{
            if (state.isLoggedIn){
                navigate('/dashboard');
            }
        },[])
    
    
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen ">
    <div>
        <h1 className="text-white text-5xl">Login to your account</h1>
    </div>
    <div className="mt-4">
        <p className="text-white">
            Don't have an account? 
            <Link to="/signup">
                <button className="btn btn-success rounded-md px-2 mx-5 hover:bg-green-400">
                    Sign Up
                </button>
            </Link>
        </p>
    </div>
    <form
        onSubmit={onFormSubmit}
        className="flex flex-col justify-center items-center w-full max-w-md mx-auto mt-8 p-6  rounded-md shadow-lg"
        autoComplete="off"
    >
        <div className="my-5 w-full">
            <input
                autoComplete="off"
                type="email"
                placeholder="Email..."
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                name="email"
                value={siginDetails.email}
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
                value={siginDetails.password}
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
    )
}

export default Signin;

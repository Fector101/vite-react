import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../assets/js/UserContext';

import { Lock, Vote, IdCard, User } from "lucide-react";
import './../assets/css/loginpage.css'
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Role } from "../assets/js/helper";


interface LoginPageProps {
    setRole: React.Dispatch<React.SetStateAction<Role>>;
    user_type: Role;
}

export default function LoginPage({ user_type, setRole }: LoginPageProps) {
    const navigate = useNavigate()
    const context = useContext(UserContext);

    const usefiller = process.env.NODE_ENV === 'development'
    const [matric_no, setMatricNo] = useState(usefiller ? "FT23CMP00001" : '');
    const [password, setPassword] = useState(usefiller ? (user_type === 'admin' ? 'admin' : "1") : '');
    const [signing_in, setSigningIn] = useState(false);
    console.log(user_type === 'admin' ? 'admin' : "1")
    useEffect(() => {
        if (context) context.fetchPollsData()
    }, [context])
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setSigningIn(true)
        const formData = {
            matric_no,
            password,
        };
        try {
            const route = user_type === 'admin' ? 'admin-login' : 'login'
            const response = await fetch(`${import.meta.env.VITE_API_URL}/authn/${route}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setRole(user_type)
                setSigningIn(false)
                console.log("User loggedIn:", data);
                toast.success(data.msg || 'Login successful!');
                navigate('/home');
                // await fetchUserData()
                // await fetchRoomsData()
            } else {
                setSigningIn(false)
                console.error("Login error:", data);
                toast.warning(data.msg || 'Check your inputs.')
            }
        } catch (error) {
            setSigningIn(false)
            console.error("Catch Login failed error:", error);
            toast.error('Something went wrong -' + error);
        }
    };

    return (
        <div className="signin-container">
            {signing_in &&
                <div className='modal'>
                    <div id="spinner" className="spinner"></div>
                </div>
            }
            <div className="signin-box">
                <div className="icon-circle">
                    <Vote />
                </div>
                <h2>E3Voting</h2>
                <p className="subtitle">
                    {user_type === 'admin' ? "Sign in to manage Polls Data" : "Sign in to your account"}
                </p>
                <form onSubmit={handleSubmit}>
                    <label>{user_type === 'admin' ? "Admin ID" : "Martric No"}</label>
                    <div className="input-group">
                        {user_type === 'admin' ? <User /> : <IdCard className="icon" />}
                        <input
                            type="text"
                            placeholder={user_type === 'admin' ? 'admin' : 'FT23CMP0040'}
                            value={matric_no}
                            onChange={(e) => setMatricNo(e.target.value)}
                            required
                        />
                    </div>

                    <label>Password</label>
                    <div className="input-group">
                        <Lock className="icon" />
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="signin-btn primary-btn">Sign in</button>
                </form>
                {
                    user_type !== 'admin' ?
                        <div className='redirect flex'>
                            <p className="caption">Don't have an account?</p>
                            <Link to='/signup' >Sign Up</Link>
                        </div>
                        :
                        <></>
                }
                {
                    user_type !== 'admin' ?
                        <div className='redirect flex justify-self-cen'>
                            <p className="caption">Admin Demo -</p>
                            <Link to='/admin-login' >Login</Link>
                        </div>
                        :
                        <div className='redirect flex justify-self-cen'>
                            <p className="caption">Login as Student - </p>
                            <Link to='/login' >Login</Link>
                        </div>
                }
            </div>
        </div>
    );
}
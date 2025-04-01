import React,{ useState } from "react";
import { Lock, Vote, IdCard } from "lucide-react";
import './../assets/css/loginpage.css'
import { Link,useNavigate } from "react-router";
import { toast } from "sonner";


export default function AdminLoginPage() {
    const navigate = useNavigate()
    const usefiller = process.env.NODE_ENV === 'development'
    const [matric_no, setMatricNo] = useState(usefiller ? "FT23CMP00001" : '');
    const [password, setPassword] = useState(usefiller ? "admin" : '');
    const [signing_in, setSigningIn] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setSigningIn(true)
        const formData = {
            matric_no,
            password,
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/authn/admin-login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSigningIn(false)
                console.log("User loggedIn:", data);
                toast.success(data.msg || 'Login successful!');
                navigate('/polls');
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
                <div className='modal signing-in-spinner-case'>
                    <div id="spinner" className="spinner"></div>
                </div>
            }
            <div className="signin-box">
                <div className="icon-circle">
                    <Vote/>
                </div>
                <h2>E3Voting</h2>
                <p className="subtitle">Sign in to manage Polls Data</p>
                <form onSubmit={handleSubmit}>
                    <label>ID</label>
                    <div className="input-group">
                        <IdCard className="icon" />
                        <input
                            type="text"
                            placeholder="FT23CMP0040"
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
                <div className='redirect flex'>
                    <p className="caption">Don't have an account?</p>
                    <Link to='/signup' >Sign Up</Link>
                </div>
                <div className='redirect flex justify-self-cen'>
                    <p className="caption">Admin Demo - </p>
                    <Link to='/admin-login' >Login</Link>
                </div>
            </div>
        </div>
    );
}
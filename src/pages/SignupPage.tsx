import React,{ useState } from "react";
import { Lock, Vote, IdCard, Mail } from "lucide-react";
import './../assets/css/loginpage.css'
import { Link } from "react-router";


export default function SignupPage() {
    const [matric_no, setMatricNo] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        console.log( matric_no, password);
    };

    return (
        <div className="signin-container signup-page">
            <div className="signin-box">
                <div className="icon-circle">
                    <Vote/>
                </div>
                <h2>Create an Account</h2>
                <p className="subtitle">Sign up to start voting</p>
                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <div className="input-group">
                        <IdCard className="icon" />
                        <input
                            type="text"
                            placeholder="John Wick"
                            value={matric_no}
                            onChange={(e) => setMatricNo(e.target.value)}
                            required
                        />
                    </div>
                    <label>Email</label>
                    <div className="input-group">
                        <Mail className="icon" />
                        <input
                            type="email"
                            placeholder="youremail@nsuk.edu.ng"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <button type="submit" className="signin-btn primary-btn">Sign Up</button>
                </form>
                <div className='redirect flex'>
                    <p className="caption">Already have an account? </p>
                    <Link to='/login' >Sign in</Link>
                </div>
            </div>
        </div>
    );
}
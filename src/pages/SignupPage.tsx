import React,{ useState } from "react";
import { Lock, Vote, IdCard } from "lucide-react";
import './../assets/css/loginpage.css'
import { Link } from "react-router";


export default function SignupPage() {
    const [matric_no, setMatricNo] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        console.log( matric_no, password);
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <div className="icon-circle">
                    <Vote/>
                </div>
                <h2>E3Voting</h2>
                <p className="subtitle">Sign in to your account</p>
                <form onSubmit={handleSubmit}>
                    <label>Martric No</label>
                    <div className="input-group">
                        <IdCard className="icon" />
                        <input
                            type="text"
                            placeholder="FT23CMP0040"
                            // placeholder="youremail@nsuk.edu.ng"
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
            </div>
        </div>
    );
}
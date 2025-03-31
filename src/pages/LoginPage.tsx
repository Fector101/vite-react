import React,{ useState } from "react";
import { Mail, Lock, Vote } from "lucide-react";
import './../assets/css/loginpage.css'


export default function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        console.log({ email, password });
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

                    <button type="submit" className="signin-btn primary-btn">Sign in</button>
                </form>
            </div>
        </div>
    );
}
import { ArrowRight, Vote } from "lucide-react";
import '../assets/css/landingpage.css';
import { Link } from "react-router-dom";
{/* <div>
            <h1> Welcome to Grimoire </h1>
            <p> Grimoire is a web application that allows users to keep track of their favorite movies and TV shows. </p>
            <p> To get started, please log in or sign up. </p>
        </div> */}
export default function Landingpage() {
    return (
        <div className="landingpage page">
            <section className="header">
                <div className="row">
                    <Vote />
                    <h3>E3Voting</h3>
                </div>
                <Link to='login' className="grey-btn">Login</Link>
            </section>
            <section className="main">
                <h1>E3Voting <span>Platform</span></h1>
                <p className="caption">An easy way to create polls, collect votes, and analyze results for student organizations and educational institutions.</p>
                <Link to='/login' className="primary-btn">Get started <ArrowRight /></Link>
                {/* <Link to='/login' className="primary-btn">Get started <ArrowRight /></Link> */}
            </section>
            <section className="features-box">
                <div className="feature">
                    <h3>Create Polls</h3>
                    <p className="caption">Easily create custom polls with multiple options to gather feedback.</p>
                </div>
                <div className="feature">
                    <h3>Collect Votes</h3>
                    <p className="caption">Share your polls with your audience and collect votes in real-time.</p>
                </div>
                <div className="feature">
                    <h3>Analyze Results</h3>
                    <p className="caption">View detailed results and analyze voting patterns to make informed decisions.</p>
                </div>
            </section>
        </div>
    )
}
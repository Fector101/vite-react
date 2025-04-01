import { Link } from "react-router";
import {Clock, Dot, ArrowRight } from "lucide-react";
import GoToTop from "../assets/js/GoToTop.ts";
import '../assets/css/pollspage.css';

function Poll({ state, end_date, title, desc }:{ state:string, end_date:string, title:string, desc:string }) {
    return (
        <div className="poll-card">
            <div className="row">
                <div className="badge state active"><Dot /> {state}</div>
                <div className="caption">
                    <Clock />
                    <p>
                        Ends: {end_date}
                    </p>
                </div>
            </div>
            <h3>{title}</h3>
            <p className="caption description">{desc}</p>
            <Link to='/' className="primary-btn">Vote Now <ArrowRight /></Link>
        </div>
    )
}

export default function Moviepage() {
    const polls = [
        {
            state: "Active",
            end_date: "2025-04-10",
            title: "Best Student Representative",
            desc: "Vote for the best candidate to represent the student body."
        },
        {
            state: "Active",
            end_date: "2025-04-15",
            title: "Sports Captain Election",
            desc: "Choose the next leader for the school's sports teams."
        },
        {
            state: "Active",
            end_date: "2025-03-20",
            title: "New Library Policies",
            desc: "Vote on proposed changes to the library's opening hours and rules."
        },
        {
            state: "Active",
            end_date: "2025-03-20",
            title: "New Library Policies",
            desc: "Vote on proposed changes to the library's opening hours and rules."
        },
        {
            state: "Active",
            end_date: "2025-03-20",
            title: "New Library Policies",
            desc: "Vote on proposed changes to the library's opening hours and rules."
        }
    ];



    return (
        <div className="polls-page page">
            <section className="heading">
                <div>
                    <h1>Active Polls</h1>
                    <p className="caption">Vote in currently active polls</p>
                </div>
            </section>
            <section className="polls-box">
                {polls.map((poll, index) => <Poll key={index} {...poll} />)}
            </section>

            <GoToTop />
        </div>
    )
}
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../assets/js/UserContext';
import { Link } from "react-router";
import { Clock, Dot, ArrowRight } from "lucide-react";
import GoToTop from "../assets/js/GoToTop.ts";
import '../assets/css/pollspage.css';
import { formatDate, Role } from '../assets/js/helper.ts';

function Poll({ status, endDate, title, description }: IElectionPreview) {
    return (
        <div className="poll-card">
            <div className="row">
                <div className="badge state active"><Dot /> {status}</div>
                <div className="caption">
                    <Clock />
                    <p>
                        Ends: {formatDate(endDate)}
                    </p>
                </div>
            </div>
            <h3>{title}</h3>
            <p className="caption description">{description}</p>
            <Link to='/' className="primary-btn">Vote Now <ArrowRight /></Link>
        </div>
    )
}
export interface IElectionPreview {
    title: string;
    description: string;
    endDate: string;
    status: "ongoing" | "completed";
}

export default function PollPage({ role }: { role: Role }) {
    const context = useContext(UserContext);
    const [PollsData, setPollsData] = useState<IElectionPreview[]>([]);
    //     {
    // state: "Active",
    // end_date: "2025-04-15",
    // title: "Sports Captain Election",
    // desc: "Choose the next leader for the school's sports teams."
    //     },

    // const PollsData = [
    //     {
    //         status: "Active",
    //         endDate: "2025-04-10",
    //         title: "Best Student Representative",
    //         description: "Vote for the best candidate to represent the student body."
    //     },
    //     {
    //         status: "Active",
    //         endDate: "2025-04-15",
    //         title: "Sports Captain Election",
    //         description: "Choose the next leader for the school's sports teams."
    //     },
    //     {
    //         status: "Active",
    //         endDate: "2025-03-20",
    //         title: "New Library Policies",
    //         description: "Vote on proposed changes to the library's opening hours and rules."
    //     },
    //     {
    //         status: "Active",
    //         endDate: "2025-03-20",
    //         title: "New Library Policies",
    //         description: "Vote on proposed changes to the library's opening hours and rules."
    //     },
    //     {
    //         status: "Active",
    //         endDate: "2025-03-20",
    //         title: "New Library Policies",
    //         description: "Vote on proposed changes to the library's opening hours and rules."
    //     }
    // ];

    useEffect(() => {
        console.log(role)

        if (context?.PollsData) {
            setPollsData(context.PollsData);
            // setPollsData([
            //     {
            //         status: "Active",
            //         endDate: "2025-04-10",
            //         title: "Best Student Representative",
            //         description: "Vote for the best candidate to represent the student body."
            //     },
            //     {
            //         status: "Active",
            //         endDate: "2025-04-15",
            //         title: "Sports Captain Election",
            //         description: "Choose the next leader for the school's sports teams."
            //     },
            //     {
            //         status: "Active",
            //         endDate: "2025-03-20",
            //         title: "New Library Policies",
            //         description: "Vote on proposed changes to the library's opening hours and rules."
            //     },
            //     {
            //         status: "Active",
            //         endDate: "2025-03-20",
            //         title: "New Library Policies",
            //         description: "Vote on proposed changes to the library's opening hours and rules."
            //     },
            //     {
            //         status: "Active",
            //         endDate: "2025-03-20",
            //         title: "New Library Policies",
            //         description: "Vote on proposed changes to the library's opening hours and rules."
            //     }
            // ])
        }
    }, [context?.PollsData]);

    return (
        <div className="polls-page page">
            <section className="heading">
                <div>
                    <h1>Active Polls</h1>
                    <p className="caption">Vote in currently active polls</p>
                </div>
            </section>
            <section className="polls-box">
                {PollsData.map((poll, index) => <Poll key={index} {...poll} />)}
            </section>

            <GoToTop />
        </div>
    )
}
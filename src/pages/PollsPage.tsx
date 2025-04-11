import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../assets/js/UserContext';
import { Link } from "react-router";
import { Clock, Dot, ArrowRight } from "lucide-react";
import GoToTop from "../assets/js/GoToTop.ts";
import '../assets/css/pollspage.css';
import { formatDate } from '../assets/js/helper.ts';

export function Poll({ endDate, title, description, _id }: IElectionPreview) {
    function newStatus(){
        const today = new Date();
        return new Date(endDate) >= today ? 'ongoing' :'ended';
    }
    return (
        <div className="poll-card">
            <div className="row">
                <div className={"badge state active "+newStatus()}><Dot /> {newStatus()}</div>
                <div className="caption">
                    <Clock />
                    <p>
                        Ends: {formatDate(endDate)}
                    </p>
                </div>
            </div>
            <h3>{title}</h3>
            <p className="caption description">{description}</p>
            <Link to={`/poll/${_id}`} className="primary-btn">Vote Now <ArrowRight /></Link>
        </div>
    )
}
export interface IElectionPreview {
    title: string;
    description: string;
    endDate: string;
    // status: "ongoing" | "completed";
    _id: string
}

export default function PollPage() {
    const context = useContext(UserContext);
    const [PollsData, setPollsData] = useState<IElectionPreview[]>([]);

    useEffect(() => {
        if (context?.PollsData) {
            const today = new Date();
            const activePolls = context.PollsData.filter(poll => { return new Date(poll.endDate) >= today; });
            setPollsData(activePolls);
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
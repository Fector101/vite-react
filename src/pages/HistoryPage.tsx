import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../assets/js/UserContext';

import '../assets/css/historypage.css'
import { IElectionPreview, Poll } from './PollsPage'

export default function Historypage() {
    const context = useContext(UserContext);
    const [PollsData, setPollsData] = useState<IElectionPreview[]>([]);

    useEffect(() => {
        if (context?.PollsData) {
            const today = new Date();
            const expiredPolls = context.PollsData.filter(poll => new Date(poll.endDate) <= today);
            setPollsData(expiredPolls);
        }
    }, [context?.PollsData]);



    return (
        <div className="history-page page polls-page">
            <section className="heading">
                <div>
                    <h1>Past Polls</h1>
                    <p className="caption">View results from previous polls</p>
                </div>
            </section>

            <section className="recent-votings">
                <div className="main-votings-box">
                    {PollsData.map((poll, index) => <Poll key={index} {...poll} />)}
                </div>
            </section>
        </div>
    )
}
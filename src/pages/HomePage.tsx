import { useContext, useEffect, useState } from 'react';
import { IElection, UserContext } from '../assets/js/UserContext';
import { TrendingUp, ChartColumn, Vote, ArrowRight, Clock, Users } from "lucide-react"
import '../assets/css/homepage.css'
import { Link, useNavigate } from "react-router";
import { getPollTotalVotes } from '../assets/js/helper';

function Myprogress({ value }: { value: string | number }) {
    return (
        <div className="progress-range" style={{ 'width': '100%', backgroundColor: '#cac8c8', height: '10px', borderRadius: '5px', marginBottom: '4px', overflow: 'hidden' }}>
            <div style={{ width: value + '%', backgroundColor: '#4ec9e6', height: '100%' }} className="progress-value"></div>
        </div>
    )
}

interface PollOption {
    text: string;
    votes: number;
    _id: string;
}
interface VotingStat {
    title: string;
    description: string;
    options: PollOption[];

}

function VotingStats({ title, description, options }: VotingStat) {
    const [totalVotes, setTotalVotes] = useState<number>(0);
    useEffect(() => {
        const total_votes = getPollTotalVotes(options)
        setTotalVotes(total_votes)
    }, [options])
    return (
        <div className="voting-stats-card">
            <h4>{title}</h4>
            <p className="caption">{description}</p>
            <div className="runners-box">
                {options.map((each_canditate, i) => {
                    const percentage = totalVotes > 0 ? ((each_canditate.votes / totalVotes) * 100).toFixed(2) : 0;
                    return (
                        <div key={i}>
                            <div className="row">
                                <p>{each_canditate.text}</p>
                                <p className="caption">{each_canditate.votes} votes ({parseInt(percentage.toString())}%)</p>
                            </div>
                            <Myprogress value={percentage} />
                        </div>)
                })}
            </div>
            <p>Total votes: {totalVotes}</p>
            <a className="view-all-votes-btn primary-btn">View Details <ArrowRight /></a>
        </div>
    )
}



export default function Homepage() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [PollsData, setPollsData] = useState<IElection[]>([]);
    const [all_polls_total_votes, setAllPollsTotalVotes] = useState(0)
    const [active_polls_total, setActivePollsTotal] = useState(0)
    const [famousPoll, setFamousPoll] = useState<IElection|null>(null)
    useEffect(() => {
        if (context?.PollsData) {
            const data = context.PollsData
            setPollsData(data);
        }
    }, [context?.PollsData]);
    useEffect(() => {
        setActivePollsTotal(context?.PollsMathData.activePollsCount ||0)
        setAllPollsTotalVotes(context?.PollsMathData.totalVotes || 0 )
        setFamousPoll(context?.PollsMathData.pollWithMostVotes || null)
    }, [context?.PollsMathData]);
    // const votingStatsArray: VotingStat[] = [
    //     {
    //         title: "Best Student Representative",
    //         description: "Vote for the best candidate to represent the student body.",
    //         runners_info_tuple: [
    //             ["Alice Johnson", 250],
    //             ["Bob Smith", 180],
    //             ["Charlie Brown", 320],
    //             ["Diana Prince", 210]
    //         ]
    //     },
    //     {
    //         title: "Sports Captain Election",
    //         description: "Choose the next leader for our sports team.",
    //         runners_info_tuple: [
    //             ["Ethan Williams", 200],
    //             ["Sophie Turner", 340],
    //             ["Liam Brown", 275]
    //         ]
    //     },
    //     {
    //         title: "Best Club of the Year",
    //         description: "Vote for your favorite club on campus.",
    //         runners_info_tuple: [
    //             ["Drama Club", 410],
    //             ["Robotics Club", 350],
    //             ["Music Club", 290]
    //         ]
    //     }
    // ];

    // Usage in a component


    return (
        <div className="home-page page">
            <section className="heading">
                <div>
                    <h1>Dashboard</h1>
                    <p className="caption">Welcome back, Admin User</p>
                </div>
                <button className="primary-btn" onClick={() => navigate('/admin')}>Create New Poll</button>
            </section>

            <section className="preview-stats-box">
                <div className="card">
                    <div className="row title-box">
                        <span>
                            <h3> Total Polls</h3>
                            <strong>{PollsData.length}</strong>
                        </span>
                        <ChartColumn className="badge blue" />
                    </div>
                    <div>
                        <Myprogress value='30' />
                        <p>2 active</p>
                    </div>
                </div>
                <div className="card">
                    <div className="row title-box">
                        <span>
                            <h3> Total Votes</h3>
                            <strong>{all_polls_total_votes}</strong>
                        </span>
                        <Vote className="badge green" />
                    </div>
                    <div className="row icon-row">
                        <TrendingUp />
                        <p className="caption">Active participation</p>
                    </div>
                </div>
                <div className="card">
                    <div className="row title-box">
                        <span>
                            <h3> Active Polls</h3>
                            <strong>{active_polls_total}</strong>
                        </span>
                        <Clock className="badge purple" />
                    </div>
                    <div>
                        <Link to='/polls'>View active polls <ArrowRight /></Link>
                    </div>
                </div>
                <div className="card vote-item">
                    <div className="row title-box">
                        <span>
                            <h3> Most Popular </h3>
                            <strong className="strong">{famousPoll?.title}</strong>
                        </span>
                        <Users className="badge yellow" />
                    </div>
                    <div className="row">
                        <p>{famousPoll?.options?getPollTotalVotes(famousPoll?.options):'0'} votes</p>
                    </div>
                </div>
            </section>

            <section className="recent-votings">
                <div className="heading">
                    <h3>Recent Active Polls</h3>
                    <Link to='/polls'>View All</Link>
                </div>
                <div className="main-votings-box">
                    {PollsData.map((votingData, index) => (
                        <VotingStats key={index} {...votingData} />
                    ))}
                </div>
            </section>

        </div>
    )
}

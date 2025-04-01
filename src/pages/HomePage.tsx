import { TrendingUp, ChartColumn, Vote, ArrowRight, Clock, Users, Plus } from "lucide-react"
import '../assets/css/homepage.css'
import { Link,useNavigate } from "react-router";

function Myprogress({value}:{value:string|number}) {
    console.log(value+'%')
    return (
        <div className="progress-range" style={{'width':'100%',backgroundColor:'#cac8c8',height:'10px',borderRadius:'5px',marginBottom:'4px',overflow:'hidden'}}>
            <div style={{width:value+'%',backgroundColor:'#4ec9e6',height:'100%'}} className="progress-value"></div>
        </div>
    )
}
function VotingStats({ title, des, runners_info_tuple }: { title: string, des: string, runners_info_tuple: [string, number][] }) {
    // runners_info_tuple =[['name',140]]   
    // runners_info_tuple =[['name','votes'],...]   
    const total_votes = runners_info_tuple.reduce((sum, [, votes]) => sum + votes, 0);
    console.log(total_votes,'---')
    return (
        <div className="voting-stats-card">
            <h4>{title}</h4>
            <p className="caption">{des}</p>
            <div className="runners-box">
                {runners_info_tuple?.map(([name, votes], i) => {
                    const percentage = total_votes > 0 ? ((votes / total_votes) * 100).toFixed(2) : 0;
                    console.log(total_votes,'---')

                    return (
                        <div key={i}>
                            <div className="row">
                                <p>{name}</p>
                                <p className="caption">{votes} votes</p>
                            </div>
                            <Myprogress value={percentage}/>
                        </div>)
                })}
            </div>
            <p>Total votes: {total_votes}</p>
            <a className="view-all-votes-btn primary-btn">View Details <ArrowRight /></a>
        </div>
    )
}


type RunnerInfo = [string, number];

interface VotingStat {
    title: string;
    des: string;
    runners_info_tuple: RunnerInfo[];
}

export default function Homepage() {
    const navigate = useNavigate();

    const votingStatsArray:VotingStat[] = [
        {
            title: "Best Student Representative",
            des: "Vote for the best candidate to represent the student body.",
            runners_info_tuple: [
                ["Alice Johnson", 250],
                ["Bob Smith", 180],
                ["Charlie Brown", 320],
                ["Diana Prince", 210]
            ]
        },
        {
            title: "Sports Captain Election",
            des: "Choose the next leader for our sports team.",
            runners_info_tuple: [
                ["Ethan Williams", 200],
                ["Sophie Turner", 340],
                ["Liam Brown", 275]
            ]
        },
        {
            title: "Best Club of the Year",
            des: "Vote for your favorite club on campus.",
            runners_info_tuple: [
                ["Drama Club", 410],
                ["Robotics Club", 350],
                ["Music Club", 290]
            ]
        }
    ];

    // Usage in a component


    return (
        <div className="home-page page">
            <section className="heading">
                <div>
                    <h1>Dashboard</h1>
                    <p className="caption">Welcome back, Admin User</p>
                </div>
                <button className="primary-btn" onClick={()=>navigate('/admin')}>Create New Poll</button>
            </section>

            <section className="preview-stats-box">
                <div className="card">
                    <div className="row title-box">
                        <span>
                            <h3> Total Polls</h3>
                            <strong>3</strong>
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
                            <h3> Total Polls</h3>
                            <strong>3</strong>
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
                            <h3> Total Votes</h3>
                            <strong>3</strong>
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
                            <strong className="strong">Cafeteria Menu Changes</strong>
                        </span>
                        <Users className="badge yellow" />
                    </div>
                    <div className="row">
                        <p>174 votes</p>
                    </div>
                </div>
            </section>

            <section className="recent-votings">
                <div className="heading">
                    <h3>Recent Active Polls</h3>
                    <Link to='/polls'>View All</Link>
                </div>
                <div className="main-votings-box">
                    {votingStatsArray.map((votingData, index) => (
                        <VotingStats key={index} {...votingData} />
                    ))}
                </div>
            </section>

        </div>
    )
}

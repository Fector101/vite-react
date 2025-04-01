import { ArrowRight, Clock, Dot } from "lucide-react"

function Myprogress({ value }: { value: string | number }) {
    console.log(value + '%')
    return (
        <div className="progress-range" style={{ 'width': '100%', backgroundColor: '#cac8c8', height: '10px', borderRadius: '5px', marginBottom: '4px', overflow: 'hidden' }}>
            <div style={{ width: value + '%', backgroundColor: '#4ec9e6', height: '100%' }} className="progress-value"></div>
        </div>
    )
}
export default function VotingStatsCard({ title, des, runners_info_tuple }: { title: string, des: string, runners_info_tuple: [string, number][] }) {
    // runners_info_tuple =[['name',140]]   
    // runners_info_tuple =[['name','votes'],...]   
    const total_votes = runners_info_tuple.reduce((sum, [, votes]) => sum + votes, 0);
    // console.log(total_votes, '---')
    return (
        <div className="voting-stats-card">
            <div className="row">
                <div className="badge state active">
                    <Dot/>
                    Active</div>
                <div className="caption">
                    <Clock/>
                    <p>Ends: 2025-04-10</p>
                </div>
            </div>
            <h4>{title}</h4>
            <p className="caption">{des}</p>
            <div className="runners-box">
                {runners_info_tuple?.map(([name, votes], i) => {
                    const percentage = total_votes > 0 ? ((votes / total_votes) * 100).toFixed(2) : 0;
                    console.log(total_votes, '---')

                    return (
                        <div key={i}>
                            <div className="row">
                                <p>{name}</p>
                                <p className="caption">{votes} votes</p>
                            </div>
                            <Myprogress value={percentage} />
                        </div>)
                })}
            </div>
            <p>Total votes: {total_votes}</p>
            <a className="view-all-votes-btn primary-btn">View Details <ArrowRight /></a>
        </div>
    )
}
import '../assets/css/historypage.css'
// import VotingStatsCard from '../ui/VotingStatsCard';

// type RunnerInfo = [string, number];

// interface VotingStat {
//     title: string;
//     des: string;
//     runners_info_tuple: RunnerInfo[];
// }
export default function Historypage() {

    // const votingStatsArray: VotingStat[] = [
    //     {
    //         title: "Best Student Representative",
    //         des: "Vote for the best candidate to represent the student body.",
    //         runners_info_tuple: [
    //             ["Alice Johnson", 250],
    //             ["Bob Smith", 180],
    //             ["Charlie Brown", 320],
    //             ["Diana Prince", 210]
    //         ]
    //     },
    //     {
    //         title: "Sports Captain Election",
    //         des: "Choose the next leader for our sports team.",
    //         runners_info_tuple: [
    //             ["Ethan Williams", 200],
    //             ["Sophie Turner", 340],
    //             ["Liam Brown", 275]
    //         ]
    //     },
    //     {
    //         title: "Best Club of the Year",
    //         des: "Vote for your favorite club on campus.",
    //         runners_info_tuple: [
    //             ["Drama Club", 410],
    //             ["Robotics Club", 350],
    //             ["Music Club", 290]
    //         ]
    //     }
    // ];

    // Usage in a component


    return (
        <div className="history-page page">
            <section className="heading">
                <div>
                    <h1>Past Polls</h1>
                    <p className="caption">View results from previous polls</p>
                </div>
            </section>

            <section className="recent-votings">
                <div className="main-votings-box">
                    {/* {votingStatsArray.map((votingData, index) => (
                        <VotingStatsCard key={index} title={votingData.title} des={votingData.des} runners_info_tuple={votingData.runners_info_tuple} />
                    ))} */}
                </div>
            </section>
        </div>
    )
}
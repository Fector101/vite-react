import { AlertCircle, ArrowLeft, Clock, Dot, Vote } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import '../assets/css/quick-styles.css'
import '../assets/css/pollpage.css'
import MyBarChart from "../ui/MyBarChart";
import { useContext, useEffect, useState } from "react";
import { formatDate, getPollTotalVotes, Role } from "../assets/js/helper";
import { IElection, UserContext } from "../assets/js/UserContext";

function Choice({ text, setSelected, selected }: { text: string; setSelected: (value: string) => void; selected: string | null }) {
    return (
        <div className="flex choice-input-box">
            <input
                className="circular-checkbox"
                type="checkbox"
                id={text}
                checked={selected === text}
                onChange={() => setSelected(text)}
            />
            <label htmlFor={text}>{text}</label>
        </div>
    );
}

function PollPage({ role }: { role: Role }) {
    const { id: requested_poll_id } = useParams();
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [PollData, setPollData] = useState<IElection | undefined>(undefined);

    const [selected, setSelected] = useState<string | null>(null);
    const [card_width, setCardWidth] = useState(0);
    const [ongoing, setOngoing] = useState(1);

    useEffect(() => {
        setOngoing(0)
        const handleResize = () => {
            const card_width = document.querySelector(".voting-card")?.getBoundingClientRect().width || 100;
            setCardWidth(card_width);
            console.log('card_width ', card_width, role)
        };
        handleResize();

        document.querySelector(".voting-card")?.addEventListener("resize", handleResize);
        return () => {
            document.querySelector(".voting-card")?.removeEventListener("resize", handleResize);
        };
    }, []);


    useEffect(() => {
        console.log(role)
        if (context?.PollsData) {
            setPollData(context.PollsData.find(each_poll => each_poll._id === requested_poll_id));
        }
    }, [context?.PollsData, requested_poll_id]);

    return (
        <div className="page poll-page">
            <button onClick={() => navigate(-1)} className="grey-btn">
                <ArrowLeft />
                Back
            </button>
            <section className="heading flex-wrap">
                <div>
                    <h1>{PollData?.title}</h1>
                    <p className="caption">{PollData?.description}</p>
                </div>
                <div className="flex algin-items-cen">
                    <div className="badge state active"> <Dot /> Active </div>
                    <Clock className="caption clock" />
                    <p className="caption date"> Ends: {formatDate(PollData?.endDate || '')}</p>
                </div>
            </section>
            <main className="flex flex-wrap">
                {ongoing ?
                    <div className="voting-card expired">
                        <AlertCircle />
                        <p>Voting Closed</p>
                        <p className="caption">This poll is no longer accepting votes</p>
                    </div> :
                    <div className="voting-card">
                        <h3>Cast Your Vote</h3>
                        {
                            PollData?.options.map((each,i) => <Choice key={i} text={each.text} selected={selected} setSelected={setSelected} />)
                        }
                        <button className={"primary-btn flex x-flex-align" + (selected ? '' : ' disabled')}> <Vote />  Submit Vote</button>
                    </div>
                }
                <div className="voting-card">
                    <h3>Results</h3>
                    <MyBarChart card_width={card_width} students={PollData?.options ? PollData?.options.map(each => each.text) : []} votes={PollData?.options ? PollData?.options.map(each => each.votes) : []} />
                    <p>Total votes: {getPollTotalVotes(PollData?.options)}</p>
                </div>
            </main>
        </div>
    );
};


export default PollPage;

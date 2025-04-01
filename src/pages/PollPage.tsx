import { AlertCircle, ArrowLeft, Clock, Dot, Vote } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import '../assets/css/quick-styles.css'
import '../assets/css/pollpage.css'
import MyBarChart from "../ui/MyBarChart";
import { useEffect, useState } from "react";

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

const PollPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>(null);
    const [card_width, setCardWidth] = useState(0);
    const [ongoing, setOngoing] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const card_width = document.querySelector(".voting-card")?.getBoundingClientRect().width || 100;
            setCardWidth(card_width);
            console.log('card_width ', card_width)
        };
        handleResize();

        document.querySelector(".voting-card")?.addEventListener("resize", handleResize);
        return () => {
            document.querySelector(".voting-card")?.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="page poll-page">
            <button onClick={() => navigate(-1)} className="grey-btn">
                <ArrowLeft />
                Back
            </button>
            <section className="heading flex-wrap">
                <div>
                    <h1>Cafeteria Menu Changes</h1>
                    <p className="caption">Which new food option would you like to see in the cafeteria?</p>
                </div>
                <div className="flex algin-items-cen">
                    <div className="badge state active"> <Dot /> Active </div>
                    <Clock className="caption clock"/>
                    <p className="caption date"> Ends: 16 Mar 2025, 21:08</p>
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
                        <Choice text="More Vegetarian Options" selected={selected} setSelected={setSelected} />
                        <Choice text="Pizza Fridays" selected={selected} setSelected={setSelected} />
                        <Choice text="International Food Days" selected={selected} setSelected={setSelected} />
                        <Choice text="Better Dessert Selection" selected={selected} setSelected={setSelected} />
                        <button className={"primary-btn flex x-flex-align" + (selected ? '' : ' disabled')}> <Vote />  Submit Vote</button>
                    </div>
                }
                <div className="voting-card">
                    <h3>Results</h3>
                    <MyBarChart card_width={card_width} students={["Alex Johnson", "Sam Miller", "Taylor Wilson"]} votes={[10, 8, 2]} />
                    <p>Total votes: 174</p>
                </div>
            </main>
        </div>
    );
};


export default PollPage;

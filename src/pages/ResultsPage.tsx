import { useContext, useEffect, useState } from 'react';
import { IElection, UserContext } from '../assets/js/UserContext';
import { ArrowRight } from 'lucide-react';

import GoToTop from "../assets/js/GoToTop";
import MyBarChart from '../ui/MyBarChart';
import "../assets/css/resultspage.css";
import { Role } from '../assets/js/helper';
// ResultCard component

interface PollOption {
    text: string;
    votes: number;
    _id: string;
}
interface IResultCard {
    title: string;
    description: string;
    options: PollOption[];
}
function ResultCard({ title, description, options }: IResultCard) {

    const [card_width, setCardWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const card_width = document.querySelector('.result-card')?.getBoundingClientRect().width || 0
            setCardWidth(card_width);
        };
        handleResize()

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const [votes, setVotes] = useState<number[]>([]);
    const [students, setStudents] = useState<string[]>([]);
    const [totalVotes, setTotalVotes] = useState<number>(0);
    useEffect(() => {
        let total_votes = 0
        setVotes(options.map(each_canditate => {
            total_votes += each_canditate.votes
            return each_canditate.votes
        }))
        setTotalVotes(total_votes)
        setStudents(options.map(each_canditate => each_canditate.text))
    }, [options])

    return (
        <div className='result-card'>
            <div className='header fd-row flex space-between'>
                <div className='fd-column'>
                    <h3>{title}</h3>
                    <p className='caption'>{description}</p>
                </div>
                <button>Details <ArrowRight /></button>
            </div>
            <p className='total-votes-p caption'>Total votes: {totalVotes}</p>
            <MyBarChart students={students} votes={votes} card_width={card_width} />
        </div>
    );
}

export default function Resultspage({role}:{role:Role}){
    // Array of poll data
    const context = useContext(UserContext);
    const [PollsData, setPollsData] = useState<IElection[]>([]);
    // const [poll_form_modal, setFormPollModal] = useState(false);


    useEffect(() => {
        console.log(role)
        if (context?.PollsData) {
            // console.log(context.PollsData)
            setPollsData(context.PollsData);
        }
    }, [context?.PollsData]);

    // const polls = [
    //     {
    //         title: 'Favorite Programming Language',
    //         description: 'Choose the best programming language.',
    //         totalVotes: 10,
    //         students: ['Alex Johnson', 'Sam Miller', 'Taylor Wilson'],
    //         votes: [2, 5, 3],
    //     },
    //     {
    //         title: 'Best Frontend Framework',
    //         description: 'Which frontend framework do you prefer?',
    //         totalVotes: 15,
    //         students: ['React', 'Vue', 'Angular'],
    //         votes: [8, 4, 3],
    //     },
    //     {
    //         title: 'Favorite Database',
    //         description: 'Which database do you like the most?',
    //         totalVotes: 12,
    //         students: ['MongoDB', 'MySQL', 'PostgreSQL'],
    //         votes: [6, 4, 2],
    //     }
    // ];

    return (
        <div className="results-page page">
            <section className="heading">
                <div>
                    <h1>Results</h1>
                    <p className="caption">View real-time results of active polls</p>
                </div>
            </section>
            <section className="results-box">
                {/* Map through the array and render ResultCard for each poll */}
                {PollsData.map((poll, index) => (
                    <ResultCard key={index} title={poll.title} description={poll.description} options={poll.options} />
                ))}
            </section>
            <GoToTop />
        </div>
    );
}

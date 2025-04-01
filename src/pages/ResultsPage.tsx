import { ArrowRight } from 'lucide-react';
import GoToTop from "../assets/js/GoToTop";
import "../assets/css/resultspage.css";
import { useEffect, useState } from 'react';
import MyBarChart from '../ui/MyBarChart';
// ResultCard component
function ResultCard({ poll }: { poll: { title: string; description: string; totalVotes: number; students: string[]; votes: number[] } }) {

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


    return (
        <div className='result-card'>
            <div className='header fd-row flex space-between'>
                <div className='fd-column'>
                    <h3>{poll.title}</h3>
                    <p className='caption'>{poll.description}</p>
                </div>
                <button>Details <ArrowRight /></button>
            </div>
            <p className='total-votes-p caption'>Total votes: {poll.totalVotes}</p>
            <MyBarChart students={poll.students} votes={poll.votes} card_width={card_width}/>
        </div>
    );
}

export default function Resultspage() {
    // Array of poll data
    const polls = [
        {
            title: 'Favorite Programming Language',
            description: 'Choose the best programming language.',
            totalVotes: 10,
            students: ['Alex Johnson', 'Sam Miller', 'Taylor Wilson'],
            votes: [2, 5, 3],
        },
        {
            title: 'Best Frontend Framework',
            description: 'Which frontend framework do you prefer?',
            totalVotes: 15,
            students: ['React', 'Vue', 'Angular'],
            votes: [8, 4, 3],
        },
        {
            title: 'Favorite Database',
            description: 'Which database do you like the most?',
            totalVotes: 12,
            students: ['MongoDB', 'MySQL', 'PostgreSQL'],
            votes: [6, 4, 2],
        }
    ];

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
                {polls.map((poll, index) => (
                    <ResultCard key={index} poll={poll} />
                ))}
            </section>
            <GoToTop />
        </div>
    );
}

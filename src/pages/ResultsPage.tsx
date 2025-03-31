import { BarChart, BarChartProps } from '@mui/x-charts/BarChart';
import { ChartsAxisContentProps } from '@mui/x-charts';

import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ArrowRight } from 'lucide-react';

import GoToTop from "../assets/js/GoToTop";
import "../assets/css/resultspage.css";
import { useEffect, useState } from 'react';
// ResultCard component
function ResultCard({ poll }: { poll: { title: string; description: string; totalVotes: number; students: string[]; votes: number[] } }) {

    const [window_width, setWindowWidth] = useState(0);

    useEffect(() => {
        // Function to update window width state
        const handleResize = () => {
            const card_width = document.querySelector('.result-card')?.getBoundingClientRect().width || 0
            setWindowWidth(card_width);
        };
        handleResize()
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [])

    const CustomTooltip = (props: ChartsAxisContentProps) => {
        const { axisValue, dataIndex, series } = props;

        if (axisValue === null || dataIndex === undefined || dataIndex === null) {
            return null;
        }
        const studentName = axisValue.toString();
        const voteCount = series[0].data[dataIndex]?.toString();

        return (
            <div style={{
                padding: '12px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                fontSize: '14px',
                minWidth: '160px',
                fontFamily: 'sans-serif'
            }}>
                <div>Option: {studentName}</div>
                <div>Votes: {voteCount} votes</div>
            </div>
        );
    };

    const chartSetting: BarChartProps = {
        xAxis: [
            {
                id: 'barCategories',
                data: poll.students,
                scaleType: 'band',
            }
        ],
        grid: { horizontal: true, vertical: true },
        series: [
            {
                data: poll.votes,
                label: 'Votes',
                color: '#02B2AF',
            },
        ],
        width:  window_width,
        height: 300,
        slots: {
            axisContent: CustomTooltip,
        },
        sx: {
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
            [`& .${chartsGridClasses.line}`]: { opacity: .3, strokeDasharray: '5 3', strokeWidth: 2 },
        }
    };

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
            <BarChart {...chartSetting} />
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

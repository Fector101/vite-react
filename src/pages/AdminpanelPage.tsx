import { Calendar, CheckSquare, Filter, Plus, Users, XSquare } from 'lucide-react';
import '../assets/css/adminpanelpage.css';
import { useEffect, useState } from 'react';

interface Poll {
    id: number;
    title: string;
    description: string;
    created: string;
    endDate: string;
    participants: number;
    status: 'Active' | 'Closed';
}

export default function Adminpanelpage() {
    const [polls, setPolls] = useState<Poll[]>([]);
    
    useEffect(() => {
        setPolls([
            {
                id: 1,
                title: "Sug Election",
                description: "About Scho",
                created: "25/03/2025",
                endDate: "1 Jan 1111",
                participants: 0,
                status: "Active",
            },
            {
                id: 2,
                title: "Student Council President",
                description: "Vote for your preferred candidate for Student C...",
                created: "17/03/2025",
                endDate: "26 Mar 2025",
                participants: 74,
                status: "Active",
            },
            {
                id: 3,
                title: "Cafeteria Menu Changes",
                description: "Which new food option would you like to see in t...",
                created: "21/03/2025",
                endDate: "No end date",
                participants: 174,
                status: "Active",
            },
            {
                id: 4,
                title: "Spring Dance Theme",
                description: "Select your preferred theme for the upcoming S...",
                created: "22/02/2025",
                endDate: "9 Mar 2025",
                participants: 128,
                status: "Closed",
            },
        ]);
    }, []);

    return (
        <div className="adminpage page">
            <section className="heading">
                <div>
                    <h1>Admin Panel</h1>
                    <p className="caption">Manage polls and view results</p>
                </div>
                <button className="primary-btn">
                    <Plus />
                    Create New Poll
                </button>
            </section>
            <section className='polls-section'>
                <div className='row head'>
                    <h3>Manage Polls</h3>
                    <div className='row tab-btns'>
                        <button className='active'><Filter /> Filter</button>
                        <button><CheckSquare />Active</button>
                        <button><XSquare />Close</button>
                    </div>
                </div>
                <div className='row sub-text caption'><Calendar />
                    <p>Showing {polls.length} Polls</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created</th>
                            <th>End Date</th>
                            <th><Users /></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((poll) => (
                            <tr key={poll.id}>
                                <td>
                                    <div className="poll-title">
                                        {poll.title}
                                        <span className={`status ${poll.status.toLowerCase()}`}>
                                            {poll.status}
                                        </span>
                                    </div>
                                    <p className="poll-description">{poll.description}</p>
                                </td>
                                <td className='date caption'>{poll.created}</td>
                                <td className='date caption'>{poll.endDate}</td>
                                <td className='users-row'><Users /> {poll.participants}</td>
                                <td>
                                    {poll.status === "Active" ? (
                                        <button className="action-btn close">❌ Close</button>
                                    ) : (
                                        <button className="action-btn activate">✅ Activate</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

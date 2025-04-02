import { Calendar, CheckSquare, Filter, Plus, Users, X, XSquare } from 'lucide-react';
import '../assets/css/adminpanelpage.css';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Poll {
    id: number;
    title: string;
    description: string;
    created: string;
    endDate: string;
    participants: number;
    status: 'Active' | 'Closed';
}

function Option({ placeholder, removeMe, myid }: { placeholder: string; removeMe: CallableFunction, myid: number }) {
    // console.log(myid)
    const [title, setTitle] = useState('');

    return (
        <div className='width100per option flex'>
            <input type="text" placeholder={placeholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log(title,myid)
                    removeMe(myid)
                    // setOptions(opts => {
                    //     console.log(opts)
                    //     const new_opts = opts.filter((_, i) => i !== myid)
                    //     console.log(new_opts)
                    //     return new_opts
                    // })
                }}
                className='align-self-cen justify-self-cen flex algin-items-cen justify-content-cen'>
                <X />
            </button>
        </div>
    )
}
type react_state_array_int = React.Dispatch<React.SetStateAction<number[]>>;
// type react_state_array_str = React.Dispatch<React.SetStateAction<string[]>>;
type PollFormProps = {
    setFormPollModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function PollForm({ setFormPollModal }: PollFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [endDate, setEndDate] = useState('');
    const [options, setOptions] = useState<number[]>(()=>[1, 2]);

    function removeMe(id){
        setOptions(opts => {
                console.log(opts,id)
                const new_opts = opts.filter((_, i) => _ !== id)
                console.log(new_opts)
                return new_opts
                // return opts
            })

    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        if (!title || options.length < 2) {
            toast.error('Please provide a title and at least two options for the poll.');
            return;
        }
        const pollData = {
            title,
            description,
            endDate,
            options
        };
    }
    return (
        <div className='modal poll-form'>
            <div className='header flex flex-wrap space-between'>
                <div>
                    <h1>Admin Panel</h1>
                    <p className='caption'>Manage polls and view results</p>
                </div>
                <button onClick={() => setFormPollModal(false)} className='primary-btn flex algin-items-cen'><XSquare /> Cancel</button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Poll Title</label>
                <input
                    type='text'
                    placeholder='what is ...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description (optional)</label>
                <input
                    type='text'
                    placeholder='Provide more context for your poll'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor='date' >End Date (optional)</label>
                <input
                    type="date"
                    name=""
                    id="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <hr />

                <label>Poll Options</label>
                {options.map((_, i) => <Option removeMe={removeMe} placeholder={`Option ${i+1}`} key={_} myid={_} />)}
                <button onClick={(e) => {
                    e.preventDefault();
                    setOptions(old_options => [...old_options, ((old_options[old_options.length - 1])||0) + 1])
                }}
                    className='add-option-btn grey-btn flex algin-items-cen justify-content-cen'>
                    <Plus />
                    Add Option
                </button>
                <hr />
                <div className='align-self-end'>
                    <button onClick={() => setFormPollModal(false)} className='grey-btn'>Cancel</button>
                    <button className='create-poll-btn primary-btn'>Create Poll</button>
                </div>
            </form>
        </div>
    )
}
export default function Adminpanelpage({ role }: { role: string }) {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [poll_form_modal, setFormPollModal] = useState(true);

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
    // console.log(role)
    if (role !== 'admin') {
        return <p>Proected Route</p>
    }

    return (
        <div className="adminpage page" style={{ overflowY: poll_form_modal ? 'hidden' : 'auto' }}>
            {poll_form_modal && <PollForm setFormPollModal={setFormPollModal} />}
            <section className="heading">
                <div>
                    <h1>Admin Panel</h1>
                    <p className="caption">Manage polls and view results</p>
                </div>
                <button onClick={() => setFormPollModal(true)} className="primary-btn">
                    <Plus />
                    Create New Poll
                </button>
            </section>
            <section className='polls-section'>
                <div className='row head'>
                    <h3>Manage Polls</h3>
                    <div className='row tab-btns'>
                        <button className='active'><Filter /> All</button>
                        <button><CheckSquare />Active</button>
                        <button><XSquare />Closed</button>
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

import { Calendar, CheckSquare, Filter, Plus, Users, X, XSquare } from 'lucide-react';
import '../assets/css/adminpanelpage.css';
import { IElection, UserContext } from '../assets/js/UserContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formatDate, Role } from '../assets/js/helper';


function Option({ placeholder, removeMe, myid, value, onChange }: {
    placeholder: string;
    removeMe: (id: number) => void;
    myid: number;
    value: string;
    onChange: (id: number, newValue: string) => void;
}) {

    return (
        <div className='width100per option flex'>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(myid, e.target.value)}
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    removeMe(myid)
                }}
                className='align-self-cen justify-self-cen flex algin-items-cen justify-content-cen'>
                <X />
            </button>
        </div>
    )
}
// type react_state_array_int = React.Dispatch<React.SetStateAction<number[]>>;
// type react_state_array_str = React.Dispatch<React.SetStateAction<string[]>>;
type PollFormProps = {
    setFormPollModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function PollForm({ setFormPollModal }: PollFormProps) {
    const [title, setTitle] = useState('Time For MTH Lecture');
    const [description, setDescription] = useState('Chose Time for MTH Class');
    const [endDate, setEndDate] = useState('2025-04-03');
    const [options, setOptions] = useState<{ id: number, value: string }[]>([
        { id: 1, value: '8AM' },
        { id: 2, value: '3PM' }
    ]);
    const [sendind_data_spinner, setSendingDataSpinner] = useState(false);


    function removeMe(id: number) {
        setOptions(opts => {
            console.log(opts, id)
            const new_opts = opts.filter(opt => opt.id !== id)
            console.log(new_opts)
            return new_opts
        })

    }
    function updateOption(id: number, newValue: string) {
        setOptions((opts) =>
            opts.map(opt => opt.id === id ? { ...opt, value: newValue } : opt)
        );
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        if (!title || options.length < 2) {
            toast.error('Please provide a title and at least two options for the poll.');
            return;
        }
        setSendingDataSpinner(true)
        const pollData = {
            title,
            description,
            endDate,
            options: options.map(opt => opt.value)
        };
        console.log(pollData)


        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/add-election`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pollData),
            });

            const data = await response.json();

            if (response.ok) {
                setSendingDataSpinner(false)
                console.log("Sent Election data:", data);
                toast.success(data.msg || 'Sent Election Data Successful!');
                // add said elction data to context
            } else {
                setSendingDataSpinner(false)
                console.error("Sending Election Data error:", data);
                toast.warning(data.msg || 'Check your inputs.')
            }
        } catch (error) {
            setSendingDataSpinner(false)
            console.error("Catch Sending Data failed error:", error);
            toast.error('Something went wrong -' + error);
        }
    }
    return (
        <div className='modal poll-form'>
            {sendind_data_spinner &&
                <div className='modal'>
                    <div id="spinner" className="spinner"></div>
                </div>
            }
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
                {options.map((opt, index) => (
                    <Option
                        key={opt.id}
                        myid={opt.id}
                        placeholder={`Option ${index + 1}`}
                        removeMe={removeMe}
                        value={opt.value}
                        onChange={updateOption}
                    />
                ))}
                <button onClick={(e) => {
                    e.preventDefault();
                    setOptions(old_options => [
                        ...old_options,
                        { id: old_options.length ? old_options[old_options.length - 1].id + 1 : 1, value: '' }
                    ])
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

export default function Adminpanelpage({ role }: { role: Role }) {
    const context = useContext(UserContext);
    const [PollsData, setPollsData] = useState<IElection[]>([]);
    const [poll_form_modal, setFormPollModal] = useState(false);


    useEffect(() => {
        if (context?.PollsData) {
            // console.log(context.PollsData)
            setPollsData(context.PollsData);
            // setPollsData(
            //         [{
            //     _id: '1',
            //     title: "Sug Election",
            //     description: "About Scho",
            //     startDate: "25/03/2025",
            //     endDate: "1 Jan 1111",
            //     options:[{text:'',votes:2,_id:''}],
            //     voters: [],
            //     status: "ongoing",
            // }]);

        }
    }, [context?.PollsData]);



    // useEffect(() => {
    //     console.log(PollsData)
    //     setPolls(PollsData)

        // setPolls([
        //     {
        //         id: 1,
        //         title: "Sug Election",
        //         description: "About Scho",
        //         created: "25/03/2025",
        //         endDate: "1 Jan 1111",
        //         participants: 0,
        //         status: "Active",
        //     },
        //     {
        //         id: 2,
        //         title: "Student Council President",
        //         description: "Vote for your preferred candidate for Student C...",
        //         created: "17/03/2025",
        //         endDate: "26 Mar 2025",
        //         participants: 74,
        //         status: "Active",
        //     },
        //     {
        //         id: 3,
        //         title: "Cafeteria Menu Changes",
        //         description: "Which new food option would you like to see in t...",
        //         created: "21/03/2025",
        //         endDate: "No end date",
        //         participants: 174,
        //         status: "Active",
        //     },
        //     {
        //         id: 4,
        //         title: "Spring Dance Theme",
        //         description: "Select your preferred theme for the upcoming S...",
        //         created: "22/02/2025",
        //         endDate: "9 Mar 2025",
        //         participants: 128,
        //         status: "Closed",
        //     },
        // ]);
    // }, [PollsData]);
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
                    <p>Showing {PollsData.length} Polls</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created</th>
                            <th>End Date</th>
                            <th><Users /></th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PollsData.map((poll) => (
                            <tr key={poll._id}>
                                <td>
                                    <div className="poll-title">
                                        {poll.title}
                                        <span className={`status ${poll.status.toLowerCase()}`}>
                                            {poll.status}
                                        </span>
                                    </div>
                                    <p className="poll-description">{poll.description}</p>
                                </td>
                                <td className='date caption'>{formatDate(poll.startDate)}</td>
                                <td className='date caption'>{formatDate(poll.endDate)}</td>
                                <td className='users-row'><Users /> {poll.options.length}</td>
                                <td>
                                    {poll.status === 'ongoing' ? (
                                        <button className="action-btn activate">✅ Active</button>
                                    ) : (
                                        <button className="action-btn close">❌ Ended</button>
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

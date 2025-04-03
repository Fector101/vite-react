import {
    ChevronRight,
    Vote,
    LayoutDashboard,
    ChartNoAxesColumn,
    History,
    User,
    LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from 'react';
import { UserContext } from '../../assets/js/UserContext';
import { Role } from "../../assets/js/helper";
import "./header.css"


export default function Header({ className, role }: { className: string; role: Role }) {
    const location = useLocation();
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const navItems = [
        {
            icon: <LayoutDashboard />,
            title: "Dashboard",
            link: "/home"
        },
        {
            icon: <Vote />,
            title: "Active Polls",
            link: "/polls"
        },
        {
            icon: <ChartNoAxesColumn />,
            title: "Results",
            link: "/results"
        },
        {
            icon: <History />,
            title: "Past Polls",
            link: "/history"
        }
    ]
    if (role === 'admin') {
        navItems.push({
            icon: <User />,
            title: "Admin Panel",
            link: "/admin"
        })
    }
    function getInitials(name: string) {
        if (!name) return "";
        const parts = name.trim().split(/\s+/);
        const firstInitial = parts[0]?.[0] || "";
        const lastInitial = parts[1]?.[0] || "";
        return (firstInitial + lastInitial).toUpperCase();
    }
    async function signOut() {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/authn/logout`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            context?.setUserData({role:null,username:'',matric_no:''})
            navigate('/login')
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    return (
        <>
            <header className={className}>
                <section className="row heading">
                    <Vote />
                    <Link className="title" to='/' >E3Voting</Link>
                </section>
                <section className='nav'>
                    {navItems.map((each, i) =>
                        <Link key={i} to={each.link} className={`row ${location.pathname === each.link ? "active" : ""}`}>
                            {each.icon} {each.title}
                            {location.pathname === each.link && <ChevronRight className="arrow" />}
                        </Link>)
                    }
                </section>
                <section className='last-box'>
                    <div className='row'>
                        <p>{getInitials(context?.userData.username || '')}</p>
                        <div>
                            <p>{context?.userData.username}</p>
                            <p>{context?.userData.role}</p>
                        </div>
                    </div>
                    {context?.userData.role&&<button onClick={signOut}><LogOut /> Sign Out</button>}
                </section>
            </header>
        </>
    );
}
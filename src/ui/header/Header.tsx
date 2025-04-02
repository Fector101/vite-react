import "./header.css"
import {
    ChevronRight,
    Vote,
    LayoutDashboard,
    ChartNoAxesColumn,
    History,
    User,
    LogOut,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { Role } from "../../assets/js/helper";
// import { nanoid } from "nanoid";
// import { disableScroll, enableScroll } from "../../assets/js/helper.ts";



export default function Header({ className, role }: { className: string; role: Role }) {
    // userName='Dev'
    const location = useLocation();
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
                        <p>A</p>
                        <div>
                            <p>Admin User</p>
                            <p>Admin</p>
                        </div>
                    </div>
                    <button><LogOut /> Sign Out</button>
                </section>
            </header>

            <Outlet
                context={{
                    foxxy: () => "Wisdow Seekers",
                    user_name: "Fabian - UserName From HeaderSticky",
                }}
            />
        </>
    );
}
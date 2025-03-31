// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import "./header.css"
import {
    // Search,
    ChevronRight,
    // XCircle,
    Vote,
    LayoutDashboard,
    ChartNoAxesColumn,
    History,
    User,
    LogOut,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
// import { nanoid } from "nanoid";
// import { disableScroll, enableScroll } from "../../assets/js/helper.ts";



export default function Header({className}:{className:string}) {
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
        },
        {
            icon: <User />,
            title: "Admin Panel",
            link: "/admin"
        }
    ]
    return (
        <>
            <header className={className}>
                <section className="row heading">
                    <Vote />
                    <Link className="title" to='/' >E3Voting</Link>
                </section>
                <section className='nav'>
                    {navItems.map((each, i) => <Link key={i} to={each.link} className={`row ${location.pathname === each.link ? "active" : ""}`}> {each.icon} {each.title} <ChevronRight className="arrow" /></Link>)
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

{
    /* <button className="menu-btn">
<Menu />
</button>
<Link to={userName ? '/' : 'landing-page'} className="title">
Grimoire
</Link>

<MynavBar for_="title-bar-nav" links={[{ link: '/', name: 'Home' }, { link: '/lists', name: 'Lists' }, { link: '/Movies', name: 'Movies' }, { link: '/shows', name: 'Tv shows' }]} />
<SearchInput placeholder="Search movies and TV shows" />
<div className="side-content right">
<Link className="btn lists-header-btn-link" to='lists' state="Hi">
    <Bookmark className="svg-white-fill" />
</Link>

{
    userName === undefined ?
        <>
            <button className="outline-white sign-up" onClick={() => setModalEle('signup')}>Sign Up</button>
            <button className="outline-white sign-in" onClick={() => setModalEle('login')}>Sign in</button>
        </>
        :
        <>
            <button className="subscribe-btn">Subscribe</button>
            <button className="noti-btn"><BellIcon /></button>
            <div className="user-menu-box">
                <button>
                    <User2 />
                </button>
                <button>
                    <ChevronDown />
                </button>
            </div>
        </>
}
</div> */
}

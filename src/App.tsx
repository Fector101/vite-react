import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import './assets/css/quick-styles.css'
import './assets/css/app.css'

import Landingpage from "./pages/LandingPage";
import Adminpanelpage from "./pages/AdminpanelPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Homepage from "./pages/HomePage.tsx";
import Pollspage from "./pages/PollsPage.tsx";
import PollPage from "./pages/PollPage.tsx";
import Historypage from "./pages/HistoryPage.tsx";
import Resultspage from "./pages/ResultsPage.tsx";

import Header from "./ui/header/Header.tsx";
import { Menu, X } from "lucide-react";
import NotFoundpage from "./pages/NotFoundPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import { Role } from "./assets/js/helper.ts";

function App() {
    const location = useLocation();
    const [role, setRole] = useState<Role>(null);
    const [header_state, setHeaderState] = useState(window.innerWidth > 500);
    const [btn_state, setBtnState] = useState(window.innerWidth > 500);

    function toggleHeader() {
        setHeaderState(prev => !prev);
    }

    useEffect(function () {
        setBtnState(!(["/", "/login"].includes(location.pathname)))
        setHeaderState(false);
    }, [location]);

    useEffect(() => {
        const fetchRole = async () => {
            // doing this incase user refreshes page, so no depending on sending role with login|signup
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/authn/me`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setRole(data.role);
                    return
                }
                console.log('Failed to fetch Role');
            } catch (error) {
                setRole('student');
                console.log('Fetch Failed Error: ', error);
            }
        };

        fetchRole();

        function handleResize() {
            if (window.innerWidth > 800) {
                setHeaderState(true);
            } else {
                setHeaderState(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Toaster position="top-right" />
            {/* {!["/", "/login", '/signup'].includes(location.pathname) &&  */}
            <Header role={role} className={`sidebar ${header_state ? "show" : "hide"}`} />
            {/* } */}

            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/home" element={<Homepage role={role} />} />
                <Route path="/admin" element={<Adminpanelpage role={role} />} />
                <Route path="/login" element={<LoginPage user_type="student" setRole={setRole} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/polls" element={<Pollspage role={role} />} />
                <Route path="/poll/:id" element={<PollPage role={role} />} />
                <Route path="/results" element={<Resultspage role={role} />} />
                <Route path="/history" element={<Historypage role={role} />} />

                <Route path="/admin-login" element={<LoginPage user_type='admin' setRole={setRole} />} />
                <Route path="*" element={<NotFoundpage />} />
            </Routes>
            {btn_state && <button className="primary-btn" id="menu-btn" onClick={toggleHeader}>
                {header_state ? <X /> : <Menu />}
            </button>}
        </>
    )
}

export default App

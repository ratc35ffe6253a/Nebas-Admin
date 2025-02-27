
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/pages.css";
import "./styles/images.css";
import "./styles/forms.css";
import "./styles/blog.css";
import "./styles/admin.css";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;

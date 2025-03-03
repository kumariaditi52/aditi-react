
    
    import React, { useState } from "react";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import Register from "./components/Register";
    import VerifyOTP from "./components/VerifyOTP";
    import ForgotPassword from './components/ForgotPassword';
    import ResetPassword from './components/ResetPassword';
    import Login from "./components/Login";
    import MainDashboard from "./components/page/Dashboard";
    import { ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import Header from "./components/page/Header";
    import ProtectedRoute from './components/ProtectedRoute';
    import Candidates from './components/recruitment/Candidates';
    import Interviews from './components/recruitment/Interviews';
    import Recruitment from './components/recruitment/Recruitment';
    import RecruitmentPipeline from './components/recruitment/RecruitmentPipeline';
    import RecruitmentSurvey from './components/recruitment/RecruitmentSurvey';
    import SkillsZone from './components/recruitment/SkillsZone';
    import Stages from './components/recruitment/Stages';
    import Dashboard from './components/recruitment/Dashboard';




    function App() {
        const [email, setEmail] = useState("");

        return (
            <Router>
                <div>
                    <Header />
                    <ToastContainer />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Register onNext={(email) => setEmail(email)} />} />
                        <Route path="/verify-otp" element={<VerifyOTP />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                        <Route path="/login" element={<Login />} />
                    
                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />

                        {/* Recruitment Routes */}
                        <Route path="/recruitment/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 

                        <Route path="/recruitment/recruitment" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
                        <Route path="/recruitment/candidates" element={<ProtectedRoute><Candidates /></ProtectedRoute>} />
                        <Route path="/recruitment/interviews" element={<ProtectedRoute><Interviews /></ProtectedRoute>} />
                        <Route path="/recruitment/recruitment" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
                        <Route path="/recruitment/recruitmentpipeline" element={<ProtectedRoute><RecruitmentPipeline /></ProtectedRoute>} />
                        <Route path="/recruitment/recruitmentsurvey" element={<ProtectedRoute><RecruitmentSurvey /></ProtectedRoute>} />
                        <Route path="/recruitment/skillszone" element={<ProtectedRoute><SkillsZone /></ProtectedRoute>} />
                        <Route path="/recruitment/stages" element={<ProtectedRoute><Stages /></ProtectedRoute>} />

                        {/* Other Protected Routes */}
                        <Route path="/onboarding/*" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                        <Route path="/employee/*" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                        <Route path="/attendance/*" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                        <Route path="/leave/*" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                        <Route path="/payroll/*" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                        <Route path="/contract/*" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
                    </Routes>
                </div>
            </Router>
        );
    }

    export default App;
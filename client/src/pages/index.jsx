import Layout from "./Layout.jsx";

import Landing from "./Landing";

import Dashboard from "./Dashboard";

import UploadSyllabus from "./UploadSyllabus";

import TaskExtraction from "./TaskExtraction";

import WeeklyPlanner from "./WeeklyPlanner";

import TaskList from "./TaskList";

import ManageAccount from "./ManageAccount";

import Settings from "./Settings";

import Help from "./Help";

import Terms from "./Terms";

import Privacy from "./Privacy";

import Error404 from "./Error404";

import Error500 from "./Error500";

import ErrorUnsupportedFile from "./ErrorUnsupportedFile";

import ErrorExtraction from "./ErrorExtraction";

import { Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Landing: Landing,
    
    Dashboard: Dashboard,
    
    UploadSyllabus: UploadSyllabus,
    
    TaskExtraction: TaskExtraction,
    
    WeeklyPlanner: WeeklyPlanner,
    
    TaskList: TaskList,
    
    ManageAccount: ManageAccount,
    
    Settings: Settings,
    
    Help: Help,
    
    Terms: Terms,
    
    Privacy: Privacy,
    
    Error404: Error404,
    
    Error500: Error500,
    
    ErrorUnsupportedFile: ErrorUnsupportedFile,
    
    ErrorExtraction: ErrorExtraction,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                <Route path="/" element={<Landing />} />
                
                <Route path="/Landing" element={<Landing />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/UploadSyllabus" element={<UploadSyllabus />} />
                
                <Route path="/TaskExtraction" element={<TaskExtraction />} />
                
                <Route path="/WeeklyPlanner" element={<WeeklyPlanner />} />
                
                <Route path="/TaskList" element={<TaskList />} />
                
                <Route path="/ManageAccount" element={<ManageAccount />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Help" element={<Help />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/Error404" element={<Error404 />} />
                
                <Route path="/Error500" element={<Error500 />} />
                
                <Route path="/ErrorUnsupportedFile" element={<ErrorUnsupportedFile />} />
                
                <Route path="/ErrorExtraction" element={<ErrorExtraction />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <PagesContent />
    );
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import MonitorDashboard from "./pages/dashboards/MonitorDashboard";
import ProfessorDashboard from "./pages/dashboards/ProfessorDashboard";
import MonitorsPage from "./pages/dashboards/student/MonitorsPage";
import ClassesPage from "./pages/dashboards/student/ClassesPage";
import SchedulePage from "./pages/dashboards/student/SchedulePage";
import QuestionsPage from "./pages/dashboards/student/QuestionsPage";
import HistoryPage from "./pages/dashboards/student/HistoryPage";
import Register from "./pages/Register";
import MonitorQuestionsPage from "./pages/dashboards/monitor/QuestionsPage";
import MonitorSchedulePage from "./pages/dashboards/monitor/SchedulePage";
import MonitorFeedbacksPage from "./pages/dashboards/monitor/FeedbacksPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/monitor" element={<MonitorDashboard />} />
          <Route path="/dashboard/professor" element={<ProfessorDashboard />} />
          
          <Route path="/dashboard/student/monitors" element={<MonitorsPage />} />
          <Route path="/dashboard/student/classes" element={<ClassesPage />} />
          <Route path="/dashboard/student/schedule" element={<SchedulePage />} />
          <Route path="/dashboard/student/questions" element={<QuestionsPage />} />
          <Route path="/dashboard/student/history" element={<HistoryPage />} />
          
          <Route path="/dashboard/monitor/questions" element={<MonitorQuestionsPage />} />
          <Route path="/dashboard/monitor/schedule" element={<MonitorSchedulePage />} />
          <Route path="/dashboard/monitor/feedbacks" element={<MonitorFeedbacksPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

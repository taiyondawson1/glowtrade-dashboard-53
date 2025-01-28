import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Home from "@/pages/Home";
import ExpertAdvisorsPage from "@/pages/ExpertAdvisors";
import SetfilesPage from "@/pages/Setfiles";
import TradingPage from "@/pages/Trading";
import CoursesPage from "@/pages/Courses";
import TradeHub from "@/pages/TradeHub";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen bg-gradient-to-br from-darkBlue via-darkBase to-darkGrey">
            <Sidebar />
            <main className="flex-1 ml-[270px] mt-[300px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trading" element={<TradingPage />} />
                <Route path="/expert-advisors" element={<ExpertAdvisorsPage />} />
                <Route path="/setfiles" element={<SetfilesPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/tradehub" element={<TradeHub />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import ExpertAdvisorsPage from "@/pages/ExpertAdvisors";
import SetfilesPage from "@/pages/Setfiles";
import TradingPage from "@/pages/Trading";
import CoursesPage from "@/pages/Courses";
import TradeHub from "@/pages/TradeHub";
import MyFxBookLoginPage from "@/pages/MyFxBookLoginPage";
import TradingViewTickerTape from "@/components/TradingViewTickerTape";

const queryClient = new QueryClient();

function MainContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSetfilesPage = location.pathname === "/setfiles";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-darkBlue via-darkBase to-darkGrey">
      {!isHomePage && !isSetfilesPage && <Sidebar />}
      {!isHomePage && !isSetfilesPage && <TradingViewTickerTape />}
      {!isHomePage && !isSetfilesPage && (
        <Separator 
          className="fixed left-[44px] right-[20px] top-[180px] z-[100] h-[1px] bg-silver/20" 
        />
      )}
      <main className={`flex-1 ${!isHomePage && !isSetfilesPage ? "ml-[270px] mr-[20px] mt-[200px]" : ""} relative`}>
        <div className={`${isSetfilesPage ? "" : "absolute inset-0"} overflow-auto`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trading" element={<TradingPage />} />
            <Route path="/expert-advisors" element={<ExpertAdvisorsPage />} />
            <Route path="/setfiles" element={<SetfilesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/tradehub" element={<TradeHub />} />
            <Route path="/connect-myfxbook" element={<MyFxBookLoginPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
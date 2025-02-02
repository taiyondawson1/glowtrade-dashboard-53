
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, LayoutDashboard, BarChart, Bot, FileText, BookOpen } from "lucide-react";

const menuItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "TradeHub", path: "/tradehub", icon: BarChart },
  { label: "Expert Advisors", path: "/expert-advisors", icon: Bot },
  { label: "Setfiles", path: "/setfiles", icon: FileText },
  { label: "Courses", path: "/courses", icon: BookOpen },
];

const toolItems = [
  {
    label: "Economic Calendar",
    url: "https://www.myfxbook.com/forex-economic-calendar",
  },
  {
    label: "Currency Correlations",
    url: "https://www.myfxbook.com/forex-market/correlation",
  },
  {
    label: "TradingView",
    url: "https://www.tradingview.com/chart/",
  },
  {
    label: "Watch Live News",
    url: "https://www.youtube.com/channel/UC4R8DWoMoI7CAwX8_LjQHig",
  },
  {
    label: "Read News",
    url: "https://www.forexfactory.com/calendar",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed left-[44px] top-[270px] h-[calc(100vh-290px)] flex flex-col z-[55]">
      {/* Navigation Box */}
      <div className="bg-darkGrey/30 backdrop-blur-sm border border-silver/20 p-4 w-[250px] mb-4 !rounded-none">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 transition-all duration-300 text-xs !rounded-none",
                  "hover:bg-highlightGray/5 text-left",
                  isActive ? "text-softWhite bg-highlightGray/10" : "text-mediumGray"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Box */}
      <div className="bg-darkGrey/30 backdrop-blur-sm border border-silver/20 p-4 w-[250px] flex-1 !rounded-none">
        <h3 className="text-xs font-semibold text-softWhite mb-4 px-4 underline">TOOLS</h3>
        <div className="space-y-1">
          {toolItems.map((tool) => (
            <a
              key={tool.label}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2 text-xs text-mediumGray hover:text-softWhite hover:bg-highlightGray/5 transition-all duration-300 !rounded-none"
            >
              {tool.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

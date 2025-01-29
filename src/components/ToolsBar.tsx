import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const tools = [
  {
    name: "Economic Calendar",
    url: "https://tradingeconomics.com/calendar",
    description: "View upcoming economic events"
  },
  {
    name: "Currency Correlations",
    url: "https://www.myfxbook.com/forex-market/correlations",
    description: "Analyze currency pair correlations"
  },
  {
    name: "TradingView",
    url: "https://www.tradingview.com",
    description: "Advanced charting platform"
  },
  {
    name: "Watch Live News",
    url: "https://www.youtube.com/live",
    description: "Stay updated with live market news"
  },
  {
    name: "Read News",
    url: "https://www.forexfactory.com/news",
    description: "Latest forex market news"
  }
];

const ToolsBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
      {tools.map((tool) => (
        <a
          key={tool.name}
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card className="tradehub-card h-full p-4 hover:border-silver/40 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-softWhite font-medium mb-2 group-hover:text-accent-blue transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-mediumGray">
                  {tool.description}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-mediumGray group-hover:text-accent-blue transition-colors" />
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
};

export default ToolsBar;
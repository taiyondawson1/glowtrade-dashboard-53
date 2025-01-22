import TradingChart from "@/components/TradingChart";
import TechnicalAnalysisWidget from "@/components/TechnicalAnalysisWidget";

const Index = () => {
  return (
    <main className="flex-1 p-8 max-w-[1400px] mx-auto ml-16">
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <div className="w-[425px]">
            <TechnicalAnalysisWidget />
          </div>
        </div>
        <div className="flex-1 min-w-[600px]">
          <TradingChart />
        </div>
      </div>
    </main>
  );
};

export default Index;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { format, parse } from "date-fns";

interface DailyData {
  date: string;
  balance: number;
  pips: number;
  lots: number;
  floatingPL: number;
  profit: number;
  growthEquity: number;
  floatingPips: number;
}

interface DailyDataResponse {
  error: boolean;
  message: string;
  dataDaily: DailyData[][];
}

interface DailyDataWidgetProps {
  accountId?: string;
}

const DailyDataWidget = ({ accountId }: DailyDataWidgetProps) => {
  const [data, setData] = useState<DailyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!accountId) return;

      const session = localStorage.getItem("myfxbook_session");
      if (!session) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No active session found. Please login again.",
        });
        return;
      }

      try {
        const response = await fetch(
          `https://www.myfxbook.com/api/get-data-daily.json?session=${encodeURIComponent(
            session
          )}&id=${encodeURIComponent(accountId)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch daily data");
        }

        const responseData: DailyDataResponse = await response.json();
        console.log("Daily Data Response:", responseData);

        if (!responseData.error) {
          const formattedData = responseData.dataDaily
            .flat()
            .map(item => {
              const parsedDate = parse(item.date, 'MM/dd/yyyy', new Date());
              return {
                ...item,
                parsedDate,
                date: format(parsedDate, 'MMM dd, yyyy')
              };
            })
            .sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime())
            .map(({ parsedDate, ...rest }) => rest);

          setData(formattedData);
        } else {
          throw new Error(responseData.message || "Failed to fetch daily data");
        }
      } catch (error) {
        console.error("Error fetching daily data:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch daily data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accountId, toast]);

  if (isLoading) {
    return <p className="text-center text-muted-foreground py-4">Loading data...</p>;
  }

  if (!data.length) {
    return <p className="text-center text-muted-foreground py-4">No data available</p>;
  }

  return (
    <div className="w-full">
      <div className="max-h-[400px] overflow-y-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[15px] font-bold whitespace-nowrap min-w-[100px] text-white">Date</TableHead>
              <TableHead className="text-[15px] font-bold text-white">Balance</TableHead>
              <TableHead className="text-[15px] font-bold text-white">Pips</TableHead>
              <TableHead className="text-[10px]">Lots</TableHead>
              <TableHead className="text-[10px]">Floating P/L</TableHead>
              <TableHead className="text-[10px]">Profit</TableHead>
              <TableHead className="text-[10px]">Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-[10px] whitespace-nowrap">{item.date}</TableCell>
                <TableCell className="text-[10px]">${item.balance.toFixed(2)}</TableCell>
                <TableCell className="text-[10px]">{item.pips.toFixed(1)}</TableCell>
                <TableCell className="text-[10px]">{item.lots.toFixed(2)}</TableCell>
                <TableCell className="text-[10px]">${item.floatingPL.toFixed(2)}</TableCell>
                <TableCell className="text-[10px]">${item.profit.toFixed(2)}</TableCell>
                <TableCell className="text-[10px]">{item.growthEquity.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DailyDataWidget;

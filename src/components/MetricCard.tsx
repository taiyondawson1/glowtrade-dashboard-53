
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down";
  className?: string;
}

const MetricCard = ({ label, value, trend, className }: MetricCardProps) => {
  return (
    <div className={cn(
      "w-full bg-darkBlue/40",
      "shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2)]",
      "hover:shadow-[inset_0px_3px_6px_rgba(0,0,0,0.25)]",
      "transition-shadow duration-200",
      "rounded-xl",
      "border border-white/5",
      "bg-gradient-to-b from-white/10 to-transparent",
      "backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="text-sm text-softWhite/70 font-medium">{label}</div>
        <div className="text-lg font-bold text-softWhite">
          {typeof value === 'number' ? (value >= 0 ? "+" : "") + value.toFixed(2) + "%" : value}
        </div>
        <div className="text-xs text-softWhite/50">$1,234.56</div>
      </div>
    </div>
  );
};

export default MetricCard;

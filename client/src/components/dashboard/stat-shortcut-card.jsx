import { Badge } from "../ui/badge";

const StatShortcutCard = ({ title, value, unit }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-primary rounded-md p-4 text-center hover:bg-primary/80 transition-all shadow-md">
      <Badge className="bg-secondary-foreground text-base font-bold text-secondary">
        {value ?? "--"} {unit}
      </Badge>
      <span className="text-base font-semibold text-secondary-foreground">{title}</span>
    </div>
  );
};

export default StatShortcutCard;

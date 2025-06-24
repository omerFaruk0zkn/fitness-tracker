import { Button } from "../ui/button";
import { MUSCLE_GROUP_ITEMS } from "@/config";

const ExerciseFilter = ({ selectedGroup, setSelectedGroup }) => {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2">
      {MUSCLE_GROUP_ITEMS.map((groupItem) => (
        <Button
          key={groupItem}
          onClick={() => setSelectedGroup(groupItem)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            selectedGroup === groupItem
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary-foreground text-secondary hover:bg-primary/90 hover:text-primary-foreground"
          }`}
        >
          {groupItem}
        </Button>
      ))}
    </div>
  );
};

export default ExerciseFilter;

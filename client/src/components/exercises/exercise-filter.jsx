import { Button } from "../ui/button";
import { MUSCLE_GROUP_ITEMS } from "@/config";

const ExerciseFilter = ({ selectedGroup, setSelectedGroup, setPage }) => {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hidden">
      {MUSCLE_GROUP_ITEMS.map((groupItem) => (
        <Button
          key={groupItem}
          onClick={() => {
            setSelectedGroup(groupItem);
            setPage(1);
          }}
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

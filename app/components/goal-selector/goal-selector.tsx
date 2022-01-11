import * as React from "react";
import { Goal } from "@prisma/client";
import { GoalBlock } from "../goal-block";

interface Item {
  goal: Goal;
  selected: boolean;
}

export const GoalSelector = ({ goals }: {goals: Goal[] }) => {
  const [runRandomAnimation, setRunRandomAnimation] = React.useState(false);
  const [selectedIndexes, setSelectedIndexes] = React.useState<Array<number>>([]);

  const items = goals.map(goal => {
    return {
      goal,
      selected: false,
    }
  })

  const clearSelection = () => {
    setSelectedIndexes([]);
    items.forEach((item) => (item.selected = false));
  };

  const selectRandomKitties = () => {
    clearSelection();
    const selIdxs = new Set<number>();
    while (selIdxs.size < 4) {
      const newValue = Math.floor(Math.random() * goals.length);
      selIdxs.add(newValue);
      items[newValue].selected = true;
    }
    setSelectedIndexes(Array.from(selIdxs.values()).sort());
    setRunRandomAnimation(true);
  };

  const endAnimation = (index: number) => {
    if (index === goals.length - 1) setRunRandomAnimation(false);
  };

  const toggleItem = (item: Item) => {
    const index = items.indexOf(item);
    const selected = [...selectedIndexes];
    if (selected.indexOf(index) > -1) {
      selected.splice(selected.indexOf(index), 1);
    } else if (selected.length < 4) {
      selected.push(index);
    }
    setSelectedIndexes(selected.sort());
  };

  return (
    <form>
      <button type="button" onClick={selectRandomKitties}>
        Randomize
      </button>
      <button type="button" onClick={clearSelection}>
        Clear selection
      </button>
      <div className="blocks-wrapper">
        {items.map((item, index) => {
          return (
            <GoalBlock
              key={index}
              index={index}
              item={item}
              selected={selectedIndexes.indexOf(index) > -1}
              runAnimation={runRandomAnimation}
              endAnimation={endAnimation}
              toggleGoal={toggleItem}
            />
          );
        })}
      </div>
    </form>
  );
}

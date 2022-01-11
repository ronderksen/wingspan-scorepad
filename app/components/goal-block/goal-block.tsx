import * as React from "react";
import clsx from "clsx";
import { Goal } from "@prisma/client";
import { SetStateAction } from "react";

interface Item {
  goal: Goal;
  selected: boolean;
}

interface GoalBlockProps {
  index: number;
  item: Item;
  selected: boolean;
  toggleGoal: (item: Item) => void,
  runAnimation: SetStateAction<boolean>,
  endAnimation: (index: number) => void
}

interface GoalCSSProperties extends React.CSSProperties {
  "--index": number;
}

export function GoalBlock({
                            index,
                            item,
                            selected,
                            toggleGoal,
                            runAnimation,
                            endAnimation
                          }: GoalBlockProps) {
  const [animate, setAnimate] = React.useState(false);
  React.useEffect(() => {
    setAnimate(runAnimation);
  }, [runAnimation]);

  const onTransitionEnd = () => {
    setAnimate(false);
    endAnimation(index);
  };

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleGoal(item);
  };

  return (
    <div
      className={clsx("block", animate && "animate", (selected && !animate) && "selected")}
      onAnimationEnd={onTransitionEnd}
      onClick={onClick}
      style={{ "--index": index } as GoalCSSProperties}
    >
      <input
        name="rule"
        id={`rule_${item.goal.id}`}
        value={item.goal.id}
        type="checkbox"
        checked={selected}
        readOnly
      />
      <label htmlFor={`rule_${item.goal.id}`}>
        <img src={item.goal.imgFileName} alt={item.goal.name} />
      </label>
    </div>
  );
}

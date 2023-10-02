import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  data?: {
    type: string;
  };
  disabled?: boolean;
  children: ReactNode;
}

export function Droppable({ id, data, disabled, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data, 
    disabled,
  });

  const style = {
    backgroundColor: isOver ? "aqua" : undefined,
    paddingLeft: 10,
    paddingRight: 10,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

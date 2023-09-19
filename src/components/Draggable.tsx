import { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
  data: {
    type: string;
  };
  children: ReactNode;
};

export function Draggable({ id, data, children }: Props) {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id,
      data,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: isDragging ? "lime" : undefined,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

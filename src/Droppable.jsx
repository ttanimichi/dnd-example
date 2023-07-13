import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? 'aqua' : undefined,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  };
    
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

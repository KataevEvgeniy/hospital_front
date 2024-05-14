import { useDrop } from 'react-dnd';
import DraggableItem from "./DraggableItem.jsx";
import {useEffect, useState} from "react";

const DropTargetArea = ({ onDrop, children, rooms, cell}) => {
    const [, drop] = useDrop({
        accept: 'DRAGGABLE_ITEM',
        drop: (item,monitor) => {
            onDrop(cell,item);

        },
    });

    var patientId = null;



    const handleCheck = () => {
        patientId  = rooms.find(value => value.roomId === cell.room && value.bedId === cell.bed)?.patientId;
        return patientId;
    }

    return <div style={{ border: '3px solid', display:"flex",flexDirection:"column"}} ref={drop}>
        {handleCheck() != null &&  <DraggableItem patientId={patientId} id={cell}/>}
    </div>;
};

export default DropTargetArea;
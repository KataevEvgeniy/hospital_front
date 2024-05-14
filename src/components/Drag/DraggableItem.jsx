import { useDrag } from 'react-dnd';
import {useEffect} from "react";

const DraggableItem = ({ id, text,patientId }) => {
    const [, drag] = useDrag({
        type: 'DRAGGABLE_ITEM', // Обязательное свойство type
        item: id,
    });



    return (
        <div ref={drag} style={{ width:"20px",height:"20px",backgroundColor:"red",borderRadius:"50px",margin:"auto",textAlign:"center" }}>
            {patientId}
        </div>
    );
};

export default DraggableItem;
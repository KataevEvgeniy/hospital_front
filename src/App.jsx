import {useState} from 'react'
import './App.css'
import RegComponent from "./components/RegComponent.jsx";
import HospitComponent from "./components/HospitComponent.jsx";
import {Button} from "@mui/material";
import {MotionTrackingComponent} from "./components/MotionTrackingComponent.jsx";
import {BedSwappingComponent} from "./components/BedSwappingComponent.jsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Bounce, ToastContainer} from "react-toastify";



function App() {
    const [currentPageNum, setCurrentPageNum] = useState(0);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{display: "flex", flexDirection: "row", width: "90%"}}>
                    <Button style={{flex: 1}} onClick={() => setCurrentPageNum(1)}>Регистрация</Button>
                    <Button style={{flex: 1}} onClick={() => setCurrentPageNum(2)}>Госпиталь</Button>
                    <Button style={{flex: 1}} onClick={() => setCurrentPageNum(3)}>Слежка</Button>
                    <Button style={{flex: 1}} onClick={() => setCurrentPageNum(4)}>Управление койками</Button>
                </div>
                <div style={{width: "70%"}}>
                    {currentPageNum === 1 && <RegComponent/>}
                    {currentPageNum === 2 && <HospitComponent/>}
                    {currentPageNum === 3 && <MotionTrackingComponent/>}
                    {currentPageNum === 4 && <BedSwappingComponent/>}
                </div>
            </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </DndProvider>

        </>
    )
}

export default App

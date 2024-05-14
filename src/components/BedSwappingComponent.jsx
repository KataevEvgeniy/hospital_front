import {Button, Container, Grid, TextField} from "@mui/material";
import DropTargetArea from "./Drag/DropTargetArea.jsx";
import DraggableItem from "./Drag/DraggableItem.jsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import validator from "@rjsf/validator-ajv8";
import {Form} from "@rjsf/mui";
import {Bounce, toast} from "react-toastify";

export function BedSwappingComponent() {



    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/getBeds").then(response => {
            console.log(response.data);
            setRooms(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);


    const image = useRef(null)


    const handleDrop = (targetCell, currentCell) => {
        let rooms1 = [...rooms];
        let targetCellIndex = rooms1.findIndex(value => value.roomId === targetCell.room && value.bedId === targetCell.bed);
        let currentCellIndex = rooms1.findIndex(value => value.roomId === currentCell.room && value.bedId === currentCell.bed);
        let patient = rooms1[currentCellIndex].patientId;
        rooms1[currentCellIndex].patientId = null;
        rooms1[targetCellIndex].patientId = patient;

        setRooms(rooms1);
    };

    const saveBeds = () => {
        axios.post("http://localhost:8080/saveBeds", rooms).then(response => {
            console.log(response.data);
            if(response.status === 200){
                toast.success("Данные сохранены", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const schemaEndHospit = {
        title:"Выписка",
        type:"object",
        properties:{
            patientId:{type:"string",title:"ID пациента"}
        }
    }

    const schemaStartHospit = {
        title: "Госпитализация",
        type: "object",
        properties: {
            patientId: { type: "string", title: "ID пациента" },
            roomId: { type: "string", title: "Номер комнаты" },
            bedId: { type: "string", title: "Номер койки" }
        }
    };
    const uiSchema = {"ui:options": {"submitText": "Положить"}};

    const onEndHospit = (formData) =>{
        let rooms1 = [...rooms];
        let index = rooms1.findIndex(value => value.patientId === parseInt(formData.formData.patientId));
        if(index === -1){
            toast.error("Пациент не найден", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        rooms1[index].patientId = null;
        toast.success("Пациент выписан", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const onStartHospit = (formData) =>{
        let hospitData = formData.formData
        let rooms1 = [...rooms];

        let pIndex = rooms1.findIndex(value => value.patientId === parseInt(formData.formData.patientId));
        if(pIndex !== -1){
            toast.error("Пациент уже госпитализирован", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        let index = rooms1.findIndex(value => value.roomId ===  parseInt(hospitData.roomId) && value.bedId ===  parseInt(hospitData.bedId));
        if(index === -1){
            toast.error("Такой кровати не существует", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        if(rooms1[index].patientId != null){
            toast.error("Эта кровать уже занята", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
        rooms1[index].patientId = hospitData.patientId;
        toast.success("Пациент госпитализирован", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }


    return (
        <>
            <div width={"100%"} style={{
                display: "grid",
                height: image?.current?.clientHeight || "10",
                gridTemplateRows: "100%",
                gridTemplateColumns: "100%"
            }}>
                <img ref={image} width={"100%"} src="./beds.png" style={{gridArea: "1 / 1 / 2 / 2"}}/>
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridArea: "1 / 1 / 2 / 2",
                    gridTemplateRows: "22% 10% 68%"
                }}>
                    <div style={{display: "grid", gridTemplateColumns: "17% 17% 17% 17% 10.5% 10.5% 10.5%"}}>
                        <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 104, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 104, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 104, bed: 3}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 104, bed: 4}}></DropTargetArea>
                        </div>
                        <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 105, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 105, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 105, bed: 3}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 105, bed: 4}}></DropTargetArea>
                        </div>
                        <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 106, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 106, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 106, bed: 3}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 106, bed: 4}}></DropTargetArea>
                        </div>
                        <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 107, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 107, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 107, bed: 3}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 107, bed: 4}}></DropTargetArea>
                        </div>
                        <div style={{display: "grid"}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 108, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 108, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 108, bed: 3}}></DropTargetArea>
                        </div>
                        <div style={{display: "grid"}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 109, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 109, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 109, bed: 3}}></DropTargetArea>
                        </div>
                        <div style={{display: "grid"}}>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 110, bed: 1}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 110, bed: 2}}></DropTargetArea>
                            <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                            cell={{room: 110, bed: 3}}></DropTargetArea>
                        </div>
                    </div>
                    <div></div>
                    <div style={{display: "grid", gridTemplateColumns: "17% 8.5% 15.5% 15% 15% 15% 14%"}}>
                        <div style={{display: "grid", gridTemplateRows: "45% 27% 27%"}}>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d" "e f" "g h"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 103, bed: 1}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 103, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 103, bed: 3}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 103, bed: 4}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 103, bed: 5}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 103, bed: 6}}></DropTargetArea>
                                <div></div>
                            </div>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d" "e f"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 102, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 102, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 102, bed: 3}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 102, bed: 4}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 102, bed: 5}}></DropTargetArea>
                            </div>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d" "e f"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 101, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 101, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 101, bed: 3}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 101, bed: 4}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 101, bed: 5}}></DropTargetArea>
                            </div>
                        </div>
                        <div></div>
                        <div style={{display: "grid", gridTemplateRows: "45% 18% 18% 18%"}}>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d" "e f" "g h"'}}>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 115, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 115, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 115, bed: 3}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 115, bed: 4}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 115, bed: 5}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 115, bed: 6}}></DropTargetArea>
                            </div>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 116, bed: 1}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 116, bed: 2}}></DropTargetArea>
                            </div>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 117, bed: 1}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 117, bed: 2}}></DropTargetArea>
                            </div>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 118, bed: 1}}></DropTargetArea>
                                <div></div>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 118, bed: 2}}></DropTargetArea>
                            </div>
                        </div>
                        <div style={{display: "grid", gridTemplateRows: "29%"}}>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 114, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 114, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 114, bed: 3}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 114, bed: 4}}></DropTargetArea>
                            </div>
                        </div>
                        <div style={{display: "grid", gridTemplateRows: "29%"}}>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 113, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 113, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 113, bed: 3}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 113, bed: 4}}></DropTargetArea>
                            </div>
                        </div>
                        <div style={{display: "grid", gridTemplateRows: "29%"}}>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 112, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 112, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 112, bed: 3}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 112, bed: 4}}></DropTargetArea>
                            </div>
                        </div>
                        <div style={{display: "grid", gridTemplateRows: "29%"}}>
                            <div style={{display: "grid", gridTemplate: '"a b" "c d"'}}>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 111, bed: 1}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 111, bed: 2}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 111, bed: 3}}></DropTargetArea>
                                <DropTargetArea onDrop={handleDrop} rooms={rooms}
                                                cell={{room: 111, bed: 4}}></DropTargetArea>
                            </div>
                        </div>
                    </div>
                </div>
                <Container style={{display:"flex",flexDirection:"row"}}>

                    <Container>
                        <Form schema={schemaEndHospit} validator={validator} onSubmit={onEndHospit}></Form>
                    </Container>
                    <Container>
                        <Form schema={schemaStartHospit} validator={validator} uiSchema={uiSchema} onSubmit={onStartHospit}></Form>
                    </Container>


                </Container>
                <Button style={{marginTop: "20px"}} onClick={saveBeds} variant={"contained"}>Сохранить
                    изменения</Button>
            </div>
        </>
    )
}
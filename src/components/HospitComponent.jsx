import {Form} from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8"
import axios from "axios";
import {useState} from "react";
import {Button, Container, TextareaAutosize, TextField, Typography} from "@mui/material";
import TextareaWidget from "@rjsf/mui/lib/TextareaWidget/index.js";
import {Bounce, toast} from "react-toastify";

function HospitComponent() {

    const schema = {
        title: "Госпитализация пациента",
        type: "object",
        properties: {
            patientEntity: {
                type: "object",
                title: "Пациент",
                properties: {
                    name: {type: "string", title: "Имя пациента"},
                    surname: {type: "string", title: "Фамилия пациента"},
                    middlename: {type: "string", title: "Отчество пациента"},
                    passNum: {type: "string", title: "Номер паспорта"},
                    passSer: {type: "string", title: "Серия паспорта"},
                    birthdate: {type: "string", format: "date", title: "Дата рождения пациента"},
                    gender: {type: "string", title: "Пол пациента"},
                    address: {type: "string", title: "Адрес пациента"},
                    phoneNum: {type: "string", title: "Телефонный номер пациента"},
                    email: {type: "string", title: "Электронный адрес пациента"},
                    medCard: {type: "string", title: "Номер медицинской карты пациента"},
                    medCardDateIssue: {type: "string", format: "date", title: "Дата выдачи медицинской карты пациента"},
                    secNum: {type: "string", title: "Номер страхового полиса пациента"},
                    secEnd: {
                        type: "string",
                        format: "date",
                        title: "Дата окончания действия страхового полиса пациента"
                    },
                }
            },
            hospitalizationEntity: {
                type: "object",
                title: "Госпитализация",
                properties: {
                    date: {"type": "string", "format": "date", "title": "Дата госпитализации"},
                    diagnosis: {"type": "string", "title": "Диагноз"},
                    purpose: {"type": "string", "title": "Цель госпитализации"},
                    department: {"type": "string", "title": "Отделение"},
                    forFree: {"type": "boolean", "title": "Бесплатная госпитализация"},
                    durationDays: {"type": "number", "title": "Продолжительность (в днях)"},
                }
            }

        }
    };

    const [hospitCode, setHospitCode] = useState(0);
    const [hospitData, setHospitData] = useState(0);
    const [isShowHospit, setIsShowHospit] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    function onSubmitHospitalization(value, e) {
        console.log(value.formData)
        axios.post("http://localhost:8080/addHospitalization", value.formData).then(value => {
            toast.success("Госпитализация создана", {
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
            setHospitCode(Number.parseInt(value.data.hospitalizationId))
        }).catch(reason => {
            console.log(reason);
        })
    }

    function handleInputChange(event) {
        // Обновляем состояние при изменении input
        setHospitCode(event.target.value);
    }

    function handleInputCancelReason(event) {
        setCancelReason(event.target.value)
    }

    function onClickGetHospitalization(event) {
        axios.get(`http://localhost:8080/getHospitalization/` + hospitCode).then(value => {
            console.log(value)
            setHospitData(value.data)
        }).catch(reason => {
            console.log(reason)
        })
    }

    function cancelHospit() {
        axios.post("http://localhost:8080/cancelHospitalization", {
            hospitalizationId: hospitCode,
            cancelReason: cancelReason
        }).then(value => {
            toast.success("Госпитализация отменена", {
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
            console.log(value)
        }).catch(reason => {
            toast.error("ошибка отмены", {
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
            console.log(reason)
        })
    }

    function cancelHospitEmpty() {
        axios.post("http://localhost:8080/cancelHospitalization", {hospitalizationId: hospitCode}).then(value => {
            toast.success("Госпитализация отменена", {
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
            console.log(value)
        }).catch(reason => {
            toast.error("ошибка отмены", {
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
            console.log(reason)
        })
    }


    return (
        <>
            <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
                <Container style={{display: "flex", flexDirection: "column"}}>
                    <Button onClick={event => {
                        setIsShowHospit(!isShowHospit)
                    }}>Показать/скрыть госпитализацию</Button>
                    {isShowHospit &&
                        <Form schema={schema} validator={validator} onSubmit={onSubmitHospitalization}></Form>}
                </Container>
                <TextField onInput={handleInputChange} value={hospitCode} label="код госпитализации"></TextField>
                <Button onClick={onClickGetHospitalization} variant="contained">Получить данные</Button>
                {hospitData && hospitData.patientEntity && <Container style={{display: "flex", flexDirection: "column"}}>
                <TextField disabled label="пациент"
                           value={hospitData.patientEntity && (hospitData.patientEntity.name + " " + hospitData.patientEntity.surname + " " + hospitData.patientEntity.middlename) || ""}> </TextField>
                <TextField disabled label="диагноз"
                           value={hospitData.hospitalizationEntity.diagnosis || ""}></TextField>
                <TextField disabled label="цель" value={hospitData.hospitalizationEntity.purpose || ""}></TextField>
                <TextField disabled label="отделение"
                           value={hospitData.hospitalizationEntity.department || ""}></TextField>
                <TextField disabled label="бесплатная"
                           value={hospitData.hospitalizationEntity.forFree || ""}></TextField>
                <TextField disabled label="продолжительность"
                           value={hospitData.hospitalizationEntity.durationDays || ""}></TextField>
                <TextField disabled label="дата" value={hospitData.hospitalizationEntity.date || ""}></TextField>
                <TextField disabled label="отменена"
                           value={hospitData.hospitalizationEntity.canceled || ""}></TextField>
                <TextField disabled label="причина отмены"
                           value={hospitData.hospitalizationEntity.cancelReason || ""}></TextField>
                    </Container>
            }

                <Button variant="contained" onClick={cancelHospitEmpty} style={{marginTop: "40px"}}>Отменить
                    госпитализацию</Button>
                <Container style={{display: "flex", marginTop: "20px"}}>
                    <Button style={{flex: 1}} onClick={cancelHospit} variant="text">Отказать</Button>
                    <TextField style={{flex: 3}} onInput={handleInputCancelReason} value={cancelReason} multiline
                               label={"Причина отказа"}></TextField>
                </Container>
            </div>
        </>
    )
}

export default HospitComponent
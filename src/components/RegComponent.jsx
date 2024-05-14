import {Form} from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8"
import axios from "axios";
import {useState} from "react";
import {Button, Container, Input, InputBase, InputLabel, TextField} from "@mui/material";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ShowSuccessToast(text) {
    toast.success(text, {
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

export function ShowErrorToast(text) {
    toast.error(text, {
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


function RegComponent() {

    const schema = {
        title: "Регистрация пациента",
        type: "object",
        required: ["name", "surname", "middlename", "passNum", "passSer", "medCard", "medCardDateIssue", "secNum", "secEnd", "secType"],
        properties: {
            name: {type: "string", title: "Имя пациента"},
            surname: {type: "string", title: "Фамилия пациента"},
            middlename: {type: "string", title: "Отчество пациента"},
            passNum: {type: "string", title: "Номер паспорта"},
            passSer: {type: "string", title: "Серия паспорта"},
            workAddress: {type: "string", title: "Адрес работы"},
            secNum: {type: "string", title: "Номер страхового полиса пациента"},
            secEnd: {type: "string", format: "date", title: "Дата окончания действия страхового полиса пациента"},
            secType: {type: "string", title: "Вид договора"}
        }
    };
    const [imageSrc, setImageSrc] = useState("");

    function onSubmitReg(value, e) {
        console.log(value.formData)
        axios.post("http://localhost:8080/reg", value.formData).then(value1 => {

        }).catch(reason => {

        })
    }

    function onClickGetQr() {
        axios.get(`http://localhost:8080/getQr/${patientId}`).then(value => {
            console.log(value)
            setImageSrc(value.data)
        })
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Получаем первый выбранный файл (изображение)

        if (file) {
            uploadImage(file); // Вызываем функцию для загрузки изображения на бэкенд
        }
    };
    const [patientId, setPatientId] = useState(0);

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        console.log(formData);

        axios.post('http://localhost:8080/getPatientByQr', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }



    return (
        <>
            <div style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center"}}>
                <Form schema={schema} validator={validator} onSubmit={onSubmitReg}/>
                <Container sx={{
                    borderRadius: '10px',
                    backgroundColor: 'lightgrey.200',
                    p: 1,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Container sx={{display:"flex", flexDirection:"column"}}>
                        <TextField value={patientId} onChange={(event) => setPatientId(event.target.value)}
                                   label="Код пациента"></TextField>
                        <Button onClick={onClickGetQr}>Сгенрировать QrCode</Button>
                    </Container>
                    <img style={{width: "10%"}} src={'data:image/jpeg;base64,' + imageSrc} alt={"qrcode"}/>
                </Container>

                <Input id="contained-button-file" type="file" accept="image/*" onChange={handleImageUpload} multiple
                       sx={{display: 'none'}}/>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        Загрузить изображение
                    </Button>
                </label>
            </div>
        </>
    )
}

export default RegComponent
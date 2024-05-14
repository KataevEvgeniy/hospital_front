import {Button, Stack} from "@mui/material";
import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import ReactDOM, {createRoot} from "react-dom/client";


export function MotionTrackingComponent() {

    const [motions, setMotions] = useState([])
    const image = useRef(null)

    useEffect(() => {

        const intervalId = setInterval(() => {

            getMotion()
        }, 3000);


        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        document.getElementById("r_hall").innerHTML = '';
        for (let i = 0; i <= 22; i++) {
            let div = document.getElementById("r_" + i)
            div.innerHTML = '';
        }
        motions.forEach((value, index) => {
            let div;
            if (value.lastSecurityPointDirection === "in") {
                div = document.getElementById("r_" + value.lastSecurityPointNumber)
            } else {
                div = document.getElementById("r_hall")
            }

            let circle = document.createElement("div")
            circle.style.width = "10px";
            circle.style.height = "10px";
            circle.style.borderRadius = "50%";
            circle.style.backgroundColor = value.personRole === "Сотрудник" ? "red" : "green";
            div.appendChild(circle)


        })


    }, [motions]);


    function getMotion() {
        axios.get("http://localhost:8080/getMotion").then(value => {
            console.log(value.data)
            setMotions(value.data.response)
        }).catch(reason => {
            console.log(reason)
        })
    }


    return (
        <>
            <div>
                <div style={{
                    display: "grid",
                    height: image?.current?.clientHeight || "10",
                    gridTemplateRows: "36% 28% 35%",
                    gridTemplateColumns: "100%"
                }}>
                    <img ref={image} width={"100%"} src='./hospit_map.png'
                         style={{zIndex: 1, gridArea: "1 / 1 / 2 / 2"}}/>
                    <div style={{
                        zIndex: 2,
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        gridArea: "1 / 1 / 1 / 1"
                    }}>
                        <div id="r_17" style={{
                            width: "5%",
                            alignItems: "center",
                            display: "flex",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_18" style={{
                            width: "4%",
                            alignItems: "center",
                            display: "flex",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_19" style={{
                            width: "9%",
                            alignItems: "center",
                            display: "flex",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_20" style={{
                            width: "4%",
                            alignItems: "center",
                            display: "flex",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_21" style={{
                            width: "13%",
                            alignItems: "center",
                            display: "flex",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_22" style={{
                            width: "4%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_00" style={{
                            width: "5%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_0" style={{
                            width: "14%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_1" style={{
                            width: "9%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_2" style={{
                            width: "4%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_3" style={{
                            width: "5%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_4" style={{
                            width: "7%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_5" style={{
                            width: "7%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_6" style={{
                            width: "9%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                    </div>
                    <div id="r_hall" style={{
                        zIndex: 2,
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gridArea: "2 / 1 / 3 / 1",

                    }}></div>
                    <div style={{zIndex: 2, display: "flex", flexDirection: "row", gridArea: "3 / 1 / 4 / 1"}}>
                        <div id="r_16" style={{
                            width: "8%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_15" style={{
                            width: "14%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_14" style={{
                            width: "17%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_13" style={{
                            width: "5%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_12" style={{
                            width: "11%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_11" style={{
                            width: "7%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_10" style={{
                            width: "6%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_9" style={{
                            width: "7%",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",

                        }}></div>
                        <div id="r_8" style={{
                            width: "12%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>
                        <div id="r_7" style={{
                            width: "12%",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",

                        }}></div>

                    </div>

                </div>
                <Button onClick={getMotion}>Получить запрос</Button>
            </div>
        </>
    )
}
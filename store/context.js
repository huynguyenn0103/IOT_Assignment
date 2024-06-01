import { createContext, useState } from "react";
import { client } from "../util/mqtt";
export const AppContext = createContext({
    mixer1: false,
    mixer2: false,
    mixer3: false,
    pumpIn: false,
    pumpOut: false,
    createdAt: new Date(),
    setMixer1: (value) => {},
    setMixer2: (value) => {},
    setMixer3: (value) => {},
    setPumpIn: (value) => {},
    setPumpOut: (value) => {},
    setCreatedAt: (value) => {}
})

const AppContextProvider = ({children}) => {
    const [mixer1, setMixer1] = useState(false)
    const [mixer2, setMixer2] = useState(false)
    const [mixer3, setMixer3] = useState(false)
    const [pumpIn, setPumpIn] = useState(false)
    const [pumpOut, setPumpOut] = useState(false)
    const [createdAt, setCreatedAt] = useState(new Date())
    const value = {
        mixer1,
        mixer2,
        mixer3,
        pumpIn,
        pumpOut,
        createdAt,
        setMixer1,
        setMixer2,
        setMixer3,
        setPumpIn,
        setPumpOut,
        setCreatedAt
    }
    console.log("Value: ", value)
    //Todo: Override message received
    client.onMessageArrived = (message) => {
        const arrivedTopic = message.topic.split("/")[2];
        const messageData = message.payloadString;
        console.log("Receive from context, topic: " +  arrivedTopic + ", payload: " + messageData)
        if(arrivedTopic.includes("mixer1")){
            setMixer1(!!+messageData)
        } else if (arrivedTopic.includes("mixer2")){
            setMixer2(!!+messageData)
        } else if (arrivedTopic.includes("mixer3")){
            setMixer3(!!+messageData)
        }else if (arrivedTopic.includes("pump-in")){
            setPumpIn(!!+messageData)
        }else if (arrivedTopic.includes("pump-out")){
            setPumpOut(!!+messageData)
        }
        setCreatedAt(new Date())
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppContextProvider
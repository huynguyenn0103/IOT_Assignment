import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  FlatList,
  Switch
} from "react-native";
import Modal from "react-native-modal";
import { useState, useLayoutEffect, useEffect } from "react";
import IconButton from "../component/IconButton";
import Input from "../component/Input";
import Button from "../component/Button";
import { Ionicons } from "@expo/vector-icons";
import ToastManager, { Toast } from 'toastify-react-native'
import { getSchedulers, updateStatusScheduler, addScheduler, deleteScheduler } from "../util/http";
function SchedulerScreen({ route, navigation }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [enteredName, setEnteredName] = useState("Scheduler" + Math.random());
  const [enteredFlow1, setEnteredFlow1] = useState(0);
  const [enteredFlow2, setEnteredFlow2] = useState(0);
  const [enteredFlow3, setEnteredFlow3] = useState(0);
  const [enteredCycle, setEnteredCycle] = useState(0);
  const [enteredStartTime, setEnteredStartTime] = useState(new Date());
  const [enteredEndTime, setEnteredEndTime] = useState(new Date());
  const [schedulers, setSchedulers] = useState([]);
  useEffect(() => {
      //Todo: [GET] to get schedulers
        const getScheduler = async () => {
                const schedulers = await getSchedulers()
                setSchedulers(schedulers)

        }
        
        const intervalId = setInterval(getScheduler, 2000);
        return () => clearInterval(intervalId);
  }, [])
  const resetInput = () => {
    setEnteredName("")
    setEnteredFlow1(0)
    setEnteredFlow2(0)
    setEnteredFlow3(0)
    setEnteredCycle(0)
    setEnteredEndTime(new Date())
    setEnteredStartTime(new Date())
  }
  const checkStatus = (startTime, endTime) => {
    let start = new Date()
    start.setHours(startTime.getHours())
    start.setMinutes(startTime.getMinutes())
    start.setSeconds(startTime.getSeconds())

    let now = new Date()
    
    let end = new Date()
    end.setHours(endTime.getHours())
    end.setMinutes(endTime.getMinutes())
    end.setSeconds(endTime.getSeconds())

    // console.log("Time",start.toLocaleString(), now.toLocaleString(), end.toLocaleString())

    if(now < start){
        return 'IDLE'
    } else if (start < now && now < end){
        return 'PROGRESS'
    } else if (end < now) {
        return 'DONE'
    }

  }
  const addSchedulerModal = async() => {
    //Todo: [POST] to add scheduler
    const newID = await addScheduler({
        name: enteredName,
        mixer1: enteredFlow1,
        mixer2: enteredFlow2,
        mixer3: enteredFlow3,
        cycle: enteredCycle,
        startTime: enteredStartTime,
        endTime: enteredEndTime,
        active: true
    })
    setSchedulers([...schedulers, {
        id: newID,
        name: enteredName,
        mixer1: enteredFlow1,
        mixer2: enteredFlow2,
        mixer3: enteredFlow3,
        cycle: enteredCycle,
        startTime: enteredStartTime,
        endTime: enteredEndTime,
        active: true
    }])
    setModalVisible(false);
    Toast.success("Add Scheduler Successfully")
  };
  const deleteSchedulerAction = async (id) => {
    //Todo: [DELETE] to delete scheduler
    await deleteScheduler(id)
    setSchedulers(schedulers.filter((item) => item.id !== id))
    Toast.success("Delete Scheduler Successfully")    
  }
  const cancelSchedulerModal = () => {
    setModalVisible(false);
    resetInput()
  }
  const openSchedulerModal = () => {
    setModalVisible(true)
    resetInput()
  }
  const changeActiveScheduler = async (id) => {
    //Todo: [PUT] to update active
    let active = false;
    schedulers.map(item => {
        if(item.id === id){
            active = item.active
        }
    })
    await updateStatusScheduler(id, !active)
    setSchedulers(schedulers.map((item) => {
        if(item.id === id){
            return {
                ...item,
                active: !item.active
            }
        } else return item;
    }))
    Toast.success("Change Scheduler Status Successfully")
  }
  function updateInputValueHandler(inputType, enteredValue, selectedDate) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue);
        break;
      case "flow1":
        setEnteredFlow1(enteredValue);
        break;
      case "flow2":
        setEnteredFlow2(enteredValue);
        break;
      case "flow3":
        setEnteredFlow3(enteredValue);
        break;
      case "cycle":
        setEnteredCycle(enteredValue);
        break;
      case "startTime":
        setEnteredStartTime(selectedDate);
        break;
      case "endTime":
        setEnteredEndTime(selectedDate);
        break;
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={openSchedulerModal}
            icon="add-sharp"
            color="white"
          />
        );
      },
    });
  }, [navigation, addSchedulerModal]);

  const renderCardItem = (itemData) => {
    return (
      <View style={styles.card}>
        <Ionicons
          name="trash-sharp"
          color="#9c1717"
          size={24}
          style={styles.deleteIcon}
          onPress={() => {deleteSchedulerAction(itemData.item.id)}}
        />
        <Switch
            trackColor={{false: '#767577', true: '#17e135'}}
            thumbColor={itemData.item.active ? '#ffffff' : '#f4f3f4'}
            onValueChange={() => {changeActiveScheduler(itemData.item.id)}}
            value={itemData.item.active}
            style={styles.switch}
        />
        <Text style={[styles.status,
            !itemData.item.active? {color: '#515151'} :
            checkStatus(itemData.item.startTime, itemData.item.endTime) === 'IDLE'? {color: 'red'} : 
            checkStatus(itemData.item.startTime, itemData.item.endTime) === 'PROGRESS'? {color: '#9c9c31'} :
            {color: 'green'}
        ]}>{!itemData.item.active? 'INACTIVE' : checkStatus(itemData.item.startTime, itemData.item.endTime)}</Text>
        <Text style={styles.cardTitle}>{itemData.item.name}</Text>
        <View style={styles.cardFlow}>
          <View style={styles.cardFlowItem}>
            <Text style={styles.cardFlowItemLabel}>Mixer 1: </Text>
            <Text style={styles.cardFlowItemValue}>{itemData.item.mixer1}</Text>
          </View>
          <View style={styles.cardFlowItem}>
            <Text style={styles.cardFlowItemLabel}>Mixer 2: </Text>
            <Text style={styles.cardFlowItemValue}>{itemData.item.mixer2}</Text>
          </View>
          <View style={styles.cardFlowItem}>
            <Text style={styles.cardFlowItemLabel}>Mixer 3: </Text>
            <Text style={styles.cardFlowItemValue}>{itemData.item.mixer3}</Text>
          </View>
        </View>
        <View style={styles.cardTime}>
          <View style={styles.cardTimeItem}>
            <Text style={styles.cardTimeItemLabel}>Start time: </Text>
            <Text style={styles.cardTimeItemValue}>{itemData.item.startTime.toLocaleTimeString()}</Text>
          </View>
          <View style={styles.cardTimeItem}>
            <Text style={styles.cardTimeItemLabel}>End time: </Text>
            <Text style={styles.cardTimeItemValue}>{itemData.item.endTime.toLocaleTimeString()}</Text>
          </View>
        </View>
        <View style={styles.cardCycle}>
          <View style={styles.cardCycleItem}>
            <Text style={styles.cardCycleItemLabel}>Cycle: </Text>
            <Text style={styles.cardCycleItemValue}>{itemData.item.cycle}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.rootContainer}>
      <ImageBackground
        source={require("../assets/scheduler1.png")} // Provide the path to your image
        style={styles.imageBackground} // Ensure the image covers the entire container
        resizeMode="cover" // Adjust how the image should be resized within the container
        onLoad={() => setImageLoaded(true)}
      >
        <ToastManager 
            duration={5000}
            width={300}
            textStyle={{fontSize: 12, fontWeight: 'bold'}}
            height={62}
            position="top"
            positionValue={16}
            style={{backgroundColor: '#ffffff'}}
        />
        {!imageLoaded && <ActivityIndicator size="large" color="#0b470b" />}
        {imageLoaded && (
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 24,
            }}
          >
            <Modal isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.modalForm}>
                  <Text style={styles.title}>Add Scheduler</Text>
                  <Input
                    label="Name: "
                    onUpdateValue={updateInputValueHandler.bind(this, "name")}
                    value={enteredName}
                    isInvalid={false}
                  />
                  <Input
                    label="Mixer 1: "
                    onUpdateValue={updateInputValueHandler.bind(this, "flow1")}
                    value={enteredFlow1}
                    keyboardType="numeric"
                    isInvalid={false}
                  />
                  <Input
                    label="Mixer 2: "
                    onUpdateValue={updateInputValueHandler.bind(this, "flow2")}
                    value={enteredFlow2}
                    keyboardType="numeric"
                    isInvalid={false}
                  />
                  <Input
                    label="Mixer 3: "
                    onUpdateValue={updateInputValueHandler.bind(this, "flow3")}
                    value={enteredFlow3}
                    keyboardType="numeric"
                    isInvalid={false}
                  />
                  <Input
                    label="Cycle: "
                    onUpdateValue={updateInputValueHandler.bind(this, "cycle")}
                    value={enteredCycle}
                    keyboardType="numeric"
                    isInvalid={false}
                  />
                  <Input
                    label="Start time:"
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "startTime"
                    )}
                    value={enteredStartTime}
                    isTimePicker={true}
                  />
                  <Input
                    label="End time:"
                    onUpdateValue={updateInputValueHandler.bind(
                      this,
                      "endTime"
                    )}
                    value={enteredEndTime}
                    isTimePicker={true}
                    minTime={enteredStartTime}
                  />

                  <View style={styles.action}>
                    <Button onPress={addSchedulerModal} color="#c30b64">
                      Add
                    </Button>
                    <Button onPress={cancelSchedulerModal} color="#888787">
                      Cancel
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          <FlatList
            data={schedulers}
            keyExtractor={(item) => item.id}
            renderItem={renderCardItem}
            numColumns={1}
          />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default SchedulerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalForm: {
    width: "80%",
    height: 420,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffc2",
    borderRadius: 24,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a00c0c",
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  card: {
    width: "100%",
    height: 220,
    backgroundColor: "#f0efef",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 24,
    borderRadius: 18,
    marginBottom: 28
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c30b64",
    marginBottom: 12,
  },
  cardFlow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 8,
  },
  cardTime: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 8,
  },
  cardCycle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 8,
  },
  cardFlowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cardTimeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cardCycleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cardFlowItemLabel: {
    fontWeight: "bold",
    fontSize: 13,
    fontStyle: "italic",
    color: '#910a0a',
    textShadowColor: "rgba(73, 73, 73, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  cardTimeItemLabel: {
    fontWeight: "bold",
    fontSize: 13,
    fontStyle: "italic",
    color: '#910a0a',
    textShadowColor: "rgba(73, 73, 73, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  cardCycleItemLabel: {
    fontWeight: "bold",
    fontSize: 13,
    fontStyle: "italic",
    color: '#910a0a',
    textShadowColor: "rgba(73, 73, 73, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  cardFlowItemValue: {
    fontWeight: "bold",
    fontStyle: "normal",
    backgroundColor: "grey",
    width: 32,
    textAlign: "center",
    padding: 8,
    height: 32,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    overflow: "hidden",
    fontSize: 12
  },
  cardTimeItemValue: {
    fontWeight: "bold",
    fontStyle: "normal",
    backgroundColor: "#6d701a",
    width: 72,
    textAlign: "center",
    padding: 8,
    height: 32,
    marginLeft: 2,
    marginRight: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    overflow: "hidden",
    fontSize: 12
  },
  cardCycleItemValue: {
    fontWeight: "bold",
    fontStyle: "normal",
    backgroundColor: "#352144",
    width: 32,
    textAlign: "center",
    padding: 8,
    height: 32,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    overflow: "hidden",
    fontSize: 12
  },
  deleteIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    shadowColor: "#505050",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 4,
  },
  switch: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  },
  status: {
    position: "absolute",
    left: 14,
    top: 14,
    textShadowColor: "rgba(73, 73, 73, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    color: 'red',
    fontWeight: 'bold'
  }
});

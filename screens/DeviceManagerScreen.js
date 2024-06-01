import { useContext, useState } from "react";
import { View, Text, Switch, StyleSheet, Image } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { Ionicons } from "@expo/vector-icons";
import { PublishData } from "../util/mqtt";
import { AppContext } from "../store/context";
function DeviceManagerScreen({ route, navigation }) {
  
  const data = useContext(AppContext)
  const toggleSwitch = (topic) => {
    if(topic === 'pumpIn'){
        PublishData("sys.pump-in", +!data.pumpIn)
    } else if (topic === 'pumpOut'){
        PublishData("sys.pump-out", +!data.pumpOut)
    } else {
        PublishData(`sys.${topic}`, +!data[topic])
    }

    if(topic === 'mixer1'){
        data.setMixer1(!data.mixer1)
    } else if (topic === 'mixer2'){
        data.setMixer2(!data.mixer2)
    } else if (topic === 'mixer3'){
        data.setMixer3(!data.mixer3)
    } else if (topic === 'pumpIn'){
        data.setPumpIn(!data.pumpIn)
    } else if (topic === 'pumpOut'){
        data.setPumpOut(!data.pumpOut)
    }
    Toast.success(`Update ${topic} successfully`)
  };
  return (
    <View style={styles.rootContainer}>
      <ToastManager
        duration={5000}
        width={300}
        textStyle={{ fontSize: 12, fontWeight: "bold" }}
        height={62}
        position="top"
        positionValue={16}
        style={{ backgroundColor: "#ffffff" }}
      />
      <Image
        source={require("../assets/device1.png")} // Provide the path to your image
        style={styles.imageBackground} // Ensure the image covers the entire container
        resizeMode="center" // Adjust how the image should be resized within the container
        height={60}
        onLoad={() => {}}
      />
      <View style={styles.outerContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.itemDevice}>
            <Ionicons name="git-compare-sharp" color="#7e420b" size={20} />
            <Text style={styles.label}>Mixer 1</Text>
            <Switch
              trackColor={{ false: "#1e1d1d", true: "#188961b1" }}
              thumbColor={data.area3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => {
                toggleSwitch("mixer1");
              }}
              value={data.mixer1}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemDevice}>
            <Ionicons name="git-compare-sharp" color="#7e420b" size={20} />
            <Text style={styles.label}>Mixer 2</Text>
            <Switch
              trackColor={{ false: "#1e1d1d", true: "#188961b1" }}
              thumbColor={data.area3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => {
                toggleSwitch("mixer2");
              }}
              value={data.mixer2}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemPump}>
            <Ionicons name="arrow-down-sharp" color="#0d54d1" size={20} />
            <Text style={styles.label}>Pump In</Text>
            <Switch
              trackColor={{ false: "#1e1d1d", true: "#2966c2b1" }}
              thumbColor={data.area3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => {
                toggleSwitch("pumpIn");
              }}
              value={data.pumpIn}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.itemDevice}>
            <Ionicons name="git-compare-sharp" color="#7e420b" size={20} />
            <Text style={styles.label}>Mixer 3</Text>
            <Switch
              trackColor={{ false: "#1e1d1d", true: "#188961b1" }}
              thumbColor={data.area3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => {
                toggleSwitch("mixer3");
              }}
              value={data.mixer3}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemPump}>
            <Ionicons name="arrow-up-sharp" color="#0d54d1" size={20} />
            <Text style={styles.label}>Pump Out</Text>
            <Switch
              trackColor={{ false: "#1e1d1d", true: "#2966c2b1" }}
              thumbColor={data.area3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => {
                toggleSwitch("pumpOut");
              }}
              value={data.pumpOut}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemPesticide}>
            <Ionicons name="skull-sharp" color="#d10d0d" size={16} />
            <Text style={styles.label}>Pesticide</Text>
            <Switch
              trackColor={{ false: "#1e1d1d", true: "#2966c2b1" }}
              thumbColor={data.area3 ? "#ffffff" : "#f4f3f4"}
              onValueChange={() => {
                toggleSwitch("pesticide");
              }}
              value={false}
              style={styles.switch}
            />
          </View>
        </View>
      </View>
      <Text style={styles.latestUpdate}>
        Latest update: {data.createdAt.toLocaleString()}
      </Text>
    </View>
  );
}

export default DeviceManagerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: "#eb1064",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: 250,
    aspectRatio: 2,
    marginBottom: 48,
    borderRadius: 24,
  },
  outerContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginBottom: 50,
  },
  itemDevice: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 150,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    backgroundColor: "#f46c32d6",
    shadowColor: "#000000aa",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    elevation: 24,
  },  
  itemPump: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 150,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    backgroundColor: "#29b7cdd6",
    shadowColor: "#000000aa",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    elevation: 24,
  },
  itemPesticide: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 150,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    backgroundColor: "#d1e617d6",
    shadowColor: "#000000aa",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    elevation: 24,
  },
  label: {
    fontWeight: "bold",
    color: "white",
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },  
  latestUpdate: {
    fontStyle: 'italic',
    color: '#808080'
  }
});

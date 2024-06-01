import React, {useState, useEffect} from "react";
import { ActivityIndicator,View, Text, StyleSheet, ImageBackground } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { getHumiChart, getTempChart } from "../util/http";
function DetailedEnvironmentChartScreen({ route, navigation }) {
  const topic = route.params.topic;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [data, setData] = useState(null)
    //Todo: [GET] to get temp/humi
    useEffect(() => {
        const getDataChart = async () => {
            if(topic === 'temp') {
                const result = await getTempChart()
                setData(result)
            } else if (topic === 'humi') {
                const result = await getHumiChart()
                setData(result)
            }
        }
        getDataChart()
  }, [])

  return (
    <View style={styles.rootContainer}>
     <ImageBackground
        source={topic === 'temp'? require("../assets/farmer.png") : require("../assets/farmer_1.png")}
        style={styles.imageBackground}
        resizeMode="cover" 
        onLoad={() => setImageLoaded(true)}
      >
        {!imageLoaded && <ActivityIndicator size="large" color="#0b470b" />}
        {imageLoaded && data &&
        <View style={topic === 'temp'? styles.innerContainerTemp : styles.innerContainerHumi}>
          <Text style={topic === 'temp'? styles.titleTemp : styles.titleHumi}>{topic === 'temp'? 
            "Temperature Chart (*C)"  : "Humidity Chart (%)"
        }</Text>
          <LineChart
            style={styles.chart}
            data={data}
            areaChart
            spacing={160}
            initialSpacing={0}
            thickness={3}
            yAxisThickness={3}
            xAxisThickness={3}
            // hideRules
            yAxisColor={topic === 'temp'? "#dc4b0d" : "#08c3db"}
            xAxisColor={topic === 'temp'? "#dc4b0d" : "#08c3db"}
            color={topic === 'temp'? "#ca2e0b": "#0b5bca"}
            dataPointsColor={topic === 'temp'? "#dc4b0d" : "#08c3db"}
            textColor="white"
            textFontSize={10}
            curved={true}
            endFillColor1 = {topic === 'temp'? '#eeaaaa': '#98edf1'}
            startFillColor1= {topic === 'temp'? '#ec6767': '#166e84'}
          />
        </View>
        }
      </ImageBackground>
    </View>
  );
}

export default DetailedEnvironmentChartScreen;

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
    overflow: 'hidden'
  },
  innerContainerTemp: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(232, 198, 49, 0.553)',
    padding: 12,
    overflow: 'hidden'
  }, 
  titleTemp: {
    color: "#bb2a0a",
    fontSize: 18,
    fontWeight: 'bold'
  },
  innerContainerHumi: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(9, 103, 126, 0.72)',
    padding: 12,
    overflow: 'hidden'
  }, 
  titleHumi: {
    color: "#13b8eb",
    fontSize: 18,
    fontWeight: 'bold'
  }
});

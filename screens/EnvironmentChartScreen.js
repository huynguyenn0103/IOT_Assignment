import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { getLatestHumi, getLatestTemp } from '../util/http';
function EnvironmentChartScreen() {
  const navigation = useNavigation()
  const [temp, setTemp] = useState({value: 0})
  const [humi, setHumi] = useState({value: 0})
  useEffect(() => {
    const getLatestInfo = async () => {
        const tempValue = await getLatestTemp();
        const humiValue = await getLatestHumi();
        setTemp(tempValue)
        setHumi(humiValue)
    }
    getLatestInfo()
}, [])


const selectChartHandler = (topic) => {
    navigation.navigate("Detailed Chart",{
        topic: topic,
    })
}
  return (
    <View style={styles.rootContainer}>
      <View style={styles.environment}>
        <Pressable 
            android_ripple={{ color: "#ccc" }}
            style={[styles.temperature, ({ pressed }) => (pressed ? styles.buttonPressed : null)]}
            onPress={() => {selectChartHandler('temp')}}>
                <Ionicons name='bar-chart-sharp' color='#e98383' size={24} style={styles.chartIcon}/>
                <Ionicons name="thermometer-sharp" color='white' size={32} />
                <Text style={styles.latestValue}>{temp.value}*C</Text>
        </Pressable>
        <Pressable 
            android_ripple={{ color: "#ccc" }}
            style={[styles.humidity, ({ pressed }) => (pressed ? styles.buttonPressed : null)]}
            onPress={() => {selectChartHandler('humi')}}>
            <Ionicons name='bar-chart-sharp' color='#11c3f0' size={24} style={styles.chartIcon}/>
            <Ionicons name="water-sharp" color='white' size={32} />
            <Text style={styles.latestValue}>{humi.value}%</Text>
        </Pressable>
      </View>
      <View style={styles.fertilizer}>
        <View style={styles.fertilizerComponent}>
            <Ionicons name='leaf-sharp' color='#09742d' size={38} style={styles.leafIcon}/>
            <Text style={styles.fertilizerTitle}>Nitrogen</Text>
            <Text style={styles.fertilizerText}>1 lbs/acre</Text>
        </View>
        <View style={styles.fertilizerComponent}>
            <Ionicons name='leaf-sharp' color='#09742d' size={38} style={styles.leafIcon}/>
            <Text style={styles.fertilizerTitle}>Photphorus</Text>
            <Text style={styles.fertilizerText}>1 lbs/acre</Text>
        </View>
        <View style={styles.fertilizerComponent}>
            <Ionicons name='leaf-sharp' color='#09742d' size={38} style={styles.leafIcon}/>
            <Text style={styles.fertilizerTitle}>Kali</Text>
            <Text style={styles.fertilizerText}>1 lbs/acre</Text>
        </View>
      </View>
      <View style={styles.otherInfo}>
        <View style={styles.otherInfoComponent_pH}>
                <Ionicons name='flask-sharp' color='#1f78dd' size={38} style={styles.leafIcon}/>
                <Text style={styles.otherInfoComponent_pHTitle}>pH</Text>
                <Text style={styles.otherInfoComponent_pHText}>5.4</Text>
            </View>
            <View style={styles.otherInfoComponent_soil}>
                <Ionicons name='radio-button-on-sharp' color='#84723d' size={38} style={styles.leafIcon}/>
                <Text style={styles.otherInfoComponent_soilTitle}>Soil Type</Text>
                <Text style={styles.otherInfoComponent_soilText}>Loamy</Text>
            </View>
      </View>
    </View>
  );
}

export default EnvironmentChartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(72, 141, 62, 0.5)'
  },
  environment: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flex: 3,
    width: '100%', 
  },
  fertilizer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 3,
    width: '100%', 
    alignItems: 'center'
  },
  otherInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 3,
    width: '100%', 
  },
  temperature: {
    width: '40%',
    height: 160,
    backgroundColor: '#de3015',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#af3212',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 32
  }, 
  humidity: {
    width: '40%',
    height: 160,
    backgroundColor: '#3695d0',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#053462',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 32
  }, 

  latestValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
    color: 'white',
  },

  fertilizerComponent: {
    width: '25%',
    height: 100,
    backgroundColor: '#f7f6f7',
    borderRadius: '50%',
    elevation: 2,
    shadowColor: '#bf5f1b',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(225, 120, 7, 0.8)',
    borderWidth: 2,
  },
  otherInfoComponent_soil: {
    width: '55%',
    height: 100,
    backgroundColor: '#f7f6f7',
    borderRadius: '50%',
    elevation: 2,
    shadowColor: '#602b05',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(90, 48, 2, 0.8)',
    borderWidth: 2,   
  },
  otherInfoComponent_pH: {
    width: '25%',
    height: 100,
    backgroundColor: '#f7f6f7',
    borderRadius: '50%',
    elevation: 2,
    shadowColor: '#0e4555',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(9, 105, 214, 0.8)',
    borderWidth: 2,   
  },
  otherInfoComponent_soilTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#662f0d',
    marginBottom: 5 
  },
  otherInfoComponent_pHTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#0a4f9f',
    marginBottom: 5 
  },
  otherInfoComponent_soilText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#b97f28',
  },  
  otherInfoComponent_pHText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#199fcf',
  },

  fertilizerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#a33708',
    marginBottom: 5
  },

  fertilizerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#e0774b',
  },
  leafIcon: {
    position: 'absolute',
    top: -8,
    left: -6
  },
  chartIcon: {
    position: 'absolute',
    right: 12,
    top: 12
  },
  buttonPressed: {
    opacity: 0.1
  }
});

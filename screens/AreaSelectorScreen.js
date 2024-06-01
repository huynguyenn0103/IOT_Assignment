import { View, Text, StyleSheet, Switch, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { getArea, updateArea } from '../util/http';
import ToastManager, { Toast } from 'toastify-react-native'
import { PublishData } from '../util/mqtt';
function AreaSelectorScreen({route, navigation}) {
  const defaultData = {
    id: 0,
    area1: false,
    area2: false,
    area3: false,
    created_at: new Date()
  }
  const [data, setData] = useState(defaultData)
      //Todo: [GET] to get area
      useEffect(() => {
        const getAreaValue = async () => {
            const result = await getArea()
            setData(result)
        }
        getAreaValue()
  }, [])

  const toggleSwitch = async(id) => {
    //Todo: [PUT] update toggle status
    PublishData(`sys.area${id}`, +!data[`area${id}`])
    await updateArea({
        ...data,
        [`area${id}`]: !data[`area${id}`],
        created_at: new Date()
    })
    setData({
        ...data,
        [`area${id}`]: !data[`area${id}`],
        created_at: new Date()
    })

    Toast.success("Update Area Option Successfully")
  }
  return (
    <View style={styles.rootContainer}>
       <ToastManager 
            duration={5000}
            width={300}
            textStyle={{fontSize: 12, fontWeight: 'bold'}}
            height={62}
            position="top"
            positionValue={16}
            style={{backgroundColor: '#ffffff'}}
        />
      <Image
            source={require("../assets/area.png")} // Provide the path to your image
            style={styles.imageBackground} // Ensure the image covers the entire container
            resizeMode="cover" // Adjust how the image should be resized within the container
            height={100}
            onLoad={() => {}}
      />
      <View style={styles.area}>
        <View style={styles.label}>
          <Ionicons name="location-sharp" color="#9d520c" size={24} />
          <Text style={styles.title}>Area 1</Text>
        </View>
        <Switch
            trackColor={{false: '#383838', true: '#0b4012'}}
            thumbColor={data.area1 ? '#ffffff' : '#f4f3f4'}
            onValueChange={() => {toggleSwitch(1)}}
            value={data.area1}
            style={styles.switch}
        />
      </View>
      <View style={styles.area}>
        <View style={styles.label}>
          <Ionicons name="location-sharp" color="#9d520c" size={24} />
          <Text style={styles.title}>Area 2</Text>
        </View>
        <Switch
            trackColor={{false: '#383838', true: '#0b4012'}}
            thumbColor={data.area2 ? '#ffffff' : '#f4f3f4'}
            onValueChange={() => {toggleSwitch(2)}}
            value={data.area2}
            style={styles.switch}
        />
      </View>
      <View style={styles.area}>
        <View style={styles.label}>
          <Ionicons name="location-sharp" color="#9d520c" size={24} />
          <Text style={styles.title}>Area 3</Text>
        </View>
        <Switch
            trackColor={{false: '#383838', true: '#0b4012'}}
            thumbColor={data.area3 ? '#ffffff' : '#f4f3f4'}
            onValueChange={() => {toggleSwitch(3)}}
            value={data.area3}
            style={styles.switch}
        />
      </View>
      <Text style={styles.latestUpdate}>Latest update: {data.created_at.toLocaleString()}</Text>
    </View>
  );
}

export default AreaSelectorScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: '100%',
    overflow: "hidden",
    maxHeight: 300,
    aspectRatio: 2,
    marginBottom: 28,
    borderRadius: 24,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#eb1064',
  },
  area: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#88d776bb',
    padding: 12,
    shadowColor: "#00000096",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,

    elevation: 24,
    marginBottom: 24
  }, 
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 76,
    justifyContent: 'space-between',
  }, 
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#b15c0c"
  },
  switch: {
    transform: [{ scaleX: .9 }, { scaleY: .9 }]
  },
  latestUpdate: {
    fontStyle: 'italic',
    color: '#808080'
  }
});

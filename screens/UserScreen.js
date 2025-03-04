import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Button from '../component/Button';
import { useContext } from 'react';
import { AppContext } from '../store/context';
function UserScreen({route, navigation}) {
  const data = useContext(AppContext)
  const logout = () =>{
    data.setLogout();
  }
  return (
    <View style={styles.rootContainer}>
      <Image
        source={require("../assets/setting1.png")} // Provide the path to your image
        style={styles.imageBackground} // Ensure the image covers the entire container
        resizeMode="center" // Adjust how the image should be resized within the container
        height={60}
        onLoad={() => {}}
      />
      <View style={styles.wrapper}>
        <Pressable style={styles.element} onPress={logout}>
          <Ionicons name="exit-outline" color="#d81515" size={20}/>
          <Text style={{fontWeight: 'bold', marginLeft: 8}}> Sign out </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  element: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9aeae',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center'
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
  }
});

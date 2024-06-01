import { ActivityIndicator,View, Text, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import { useState } from 'react';
function WelcomeScreen() {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <View style={styles.rootContainer}>
      <ImageBackground
          source={ require("../assets/welcome.png")} // Provide the path to your image
          style={styles.imageBackground} // Ensure the image covers the entire container
          resizeMode="cover" // Adjust how the image should be resized within the container
          onLoad={() => setImageLoaded(true)}
        >
          {!imageLoaded && <ActivityIndicator size="large" color="#0b470b" />}
          {imageLoaded && <Text style={styles.highlight}>Welcome to Smart Scheduling Irrigation System</Text>}
      </ImageBackground>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#d20c58',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: 'rgba(19, 98, 31, 0.55)',
    elevation: 8,
    shadowColor: '#132d0b',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    padding: 12,
    borderRadius: 16,
    overflow: 'hidden'
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: 'hidden'
  },
});

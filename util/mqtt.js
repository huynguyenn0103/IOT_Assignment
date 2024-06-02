// Create an MQTT client instance
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AIO_USERNAME = "hwanzar";
const AIO_KEY = "";

const url = "io.adafruit.com"
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {
  }
});

const options = {
  host: 'io.adafruit.com',
  port: 443,
  path: '/mqtts',
  username: AIO_USERNAME,
  password: AIO_KEY,
};

const topics =
  [
    'sys.pump-in',
    'sys.pump-out',
    'sys.area1',
    'sys.area2',
    'sys.area3',
    'sys.mixer1',
    'sys.mixer2',
    'sys.mixer3',
    'sys.humidity',
    'sys.temperature'
  ];
export const client = new Paho.MQTT.Client(options.host, options.port, options.path);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
function connect() {
  client.connect({
    onSuccess: onConnect,
    useSSL: true,
    // Clean session
    cleanSession: true,
    timeout: 300,
    onFailure: onFailure,
    userName: options.username,
    password: options.password
  });
}

function onConnect() {
  console.log('[Connect Adafruit Log] onConnect Successfully');
  subscribeTopic();
}

function onFailure(err) {
  console.log('[Connect Adafruit Log] Connect failed!');
  console.log(err);
}

function onDisconect() {
  console.log("[Connect Adafruit Log] Disconnected from ada");
}
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("[Connect Adafruit Log] onConnectionLost:" + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  const arrivedTopic = message.topic.split("/")[2];
  const messageData = message.payloadString;
  console.log("[Connect Adafruit Log] onMessageArrived, topic: " + arrivedTopic + ", payload: " +  + messageData);
}
export const  PublishData = (topic, payload) => {
    const message = new Paho.MQTT.Message(payload.toString())
    // message.payloadString = payload,
    message.destinationName = options.username + "/feeds/" + topic
    client.send(message)
}
function subscribeTopic() {
  topics.forEach(topic => {
    client.subscribe(options.username + "/feeds/" + topic,
      {
        onFailure: function (err) {
          if (err) {
            console.log("[Connect Adafruit Log] Failed connected to topic: " + topic);
            console.log(err); ole.log(err);
          }
        },
        onSuccess: function () {
          console.log("[Connect Adafruit Log] Connected to topic: " + topic);
        }
      }
    );
  }
  );
}
export function DisconnectToAda() {
  client.disconnect();
  onDisconect();
}

export function ConnectToAda() {
  connect();
}
import { View, Text, TextInput, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../constants/styles";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  isTimePicker,
  minTime
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      {!isTimePicker && (
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          autoCapitalize={false}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value.toString()}
        />
      )}
      {isTimePicker && (
        <DateTimePicker
          mode="time"
          value={value}
          onChange={onUpdateValue}
          style = {{width: 120}}
          minimumDate={minTime}
        />
      )}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  label: {
    color: "#f23232",
    marginBottom: 4,
    fontStyle: "italic",
    width: 80,
    fontWeight: "600",
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 12,
    width: 120,
    textAlign: 'center'
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});

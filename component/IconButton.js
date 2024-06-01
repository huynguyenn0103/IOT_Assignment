import { Pressable, StyleSheet } from "react-native"
import {Ionicons} from '@expo/vector-icons'
const IconButton = ({icon, color, onPress}) =>{
    return(
        <Pressable onPress={onPress} style={[styles.button,({pressed}) => pressed && styles.pressed]}>
            <Ionicons name={icon} size={28} color={color}/>
        </Pressable>
    )
}
export default IconButton
const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    button: {
        marginRight: 8,
    }
})
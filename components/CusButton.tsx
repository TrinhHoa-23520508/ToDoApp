import { Pressable, Text, StyleSheet } from "react-native";
interface IProp {
    text: string;
    backgroundColor?: string;
    textColor?: string,
    height?: number,
    width?: number,
    handleClickBtn?: () => void;
}
const CusButton = (prop: IProp) => {
    const { text, backgroundColor, handleClickBtn, textColor } = prop;
    return (
        <Pressable
            onPress={handleClickBtn}
            style={[
                styles.btn,
                {
                    backgroundColor: backgroundColor ?? "#61dafb"
                },]}>
            <Text style = {{color: textColor||"black"}}>{text}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    btn: {
        margin: 12,
        padding: 15,
        borderRadius: 15,
    }
})
export default CusButton;
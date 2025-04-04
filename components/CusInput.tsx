import { StyleSheet, TextInput } from "react-native";

interface IProp {
  value: string; 
  setValue: (text: string) => void; 
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  placeholder?: string;
  width?: number;
  height?: number
}

const CusInput = (prop: IProp) => {
  const { value, setValue, borderColor, borderRadius, borderWidth, backgroundColor, placeholder, height, width } = prop;

  return (
    <TextInput
      style={[
        styles.textInput,
        {
          borderColor: borderColor || "#ddd", 
          borderRadius: borderRadius ?? 10, 
          borderWidth: borderWidth ?? 1.5,
          backgroundColor: backgroundColor || "#fff",
          height: height,
          width: width,
        },
      ]}
      placeholder={placeholder || ""}
      value={value}
      autoCapitalize="none"
      onChangeText={setValue} 
      multiline={true}   
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 12,
    marginBottom: 15,
  },
});

export default CusInput;

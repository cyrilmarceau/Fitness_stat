import { StyleSheet } from "react-native";
import { WINDOWS_HEIGHT } from "@constants";

export default StyleSheet.create({
    centerLoader: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: WINDOWS_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },
});

import { WINDOWS_HEIGHT } from "@constants";
import { StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib";

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
    topBarModal: {
        height: 5,
        width: 80,
        backgroundColor: "#2980B9",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 20,
        top: 20,
    },
});

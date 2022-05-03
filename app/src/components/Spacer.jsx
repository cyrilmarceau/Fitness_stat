import { View, Colors } from "react-native-ui-lib";
import React from "react";

const Spacer = ({ h = 2, color = Colors.primary }) => {
    return <View marginV-15 style={{ width: "100%", height: h, backgroundColor: color }} />;
};

export default Spacer;

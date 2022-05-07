import { BaseLayout } from "@layout/BaseLayout";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors, View, Text } from "react-native-ui-lib";
import globalS from "@styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ForgetPasswordEmailSendScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={globalS.topBarModal} />

            <BaseLayout enablePadding={true}>
                <View flex center>
                    <MaterialCommunityIcons
                        name="check-circle-outline"
                        size={90}
                        color={Colors.secondary}
                    />
                    <Text center h5 marginT-25>
                        Un email pour reinitialisé votre mot de passe vient de vous être envoyé.
                    </Text>
                    <Text center h5 marginT-10>
                        Pensez à vérifier vos spams !
                    </Text>
                </View>
            </BaseLayout>
        </View>
    );
};

const styles = StyleSheet.create({
    topBar: {
        height: 5,
        width: 80,
        backgroundColor: Colors.primary,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 20,
        top: 10,
    },
});

export default ForgetPasswordEmailSendScreen;

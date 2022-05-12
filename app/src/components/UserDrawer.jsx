import { useApp } from "@contexts/appContext";
import { useAuth } from "@contexts/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Avatar, Button, Colors, Text, View } from "react-native-ui-lib";
import axios from "axios";
    
const UserDrawer = () => {
    const [image, setImage] = useState(null);
    const app = useApp()
    const auth = useAuth();
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            if (result.uri) {
                const test = await app.uploadAvatar(result.uri)
                console.log('test', test)
            }
                
        }
    };

    return (
        <>
            <Avatar
                size={80}
                source={{uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg"}} />
            <View
                style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                
                <Text primary marginL-10 h5>
                    {auth.member?.firstname} {" "}
                </Text>
                
                <Text primary h5>
                    {auth.member?.lastname}
                </Text>
            </View>
            
            <Button
                onPress={pickImage}
                animateTo="left"
                marginT-20
                marginR-40
                borderRadius={5}
                label={"Charger une photo"}
                backgroundColor={Colors.secondary}
                iconSource={(iconStyle) => {
                    return (
                        <MaterialCommunityIcons
                            style={{ marginRight: iconStyle[0].marginRight }}
                            name="upload-outline"
                            size={24}
                            color={iconStyle[0].tintColor} />
                    );
                }}
            />
        </>
    )
}

export default UserDrawer
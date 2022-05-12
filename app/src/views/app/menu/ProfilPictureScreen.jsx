
import React, {useState} from 'react'
import CuBottomSheet from '@components/CuBottomSheet';
import { Button, Colors, Text, View, Image } from "react-native-ui-lib";
import * as ImagePicker from 'expo-image-picker';
import { useApp } from "@contexts/appContext";

const ProfilPictureScreen = ({navigation}) => {
    const [image, setImage] = useState(null);
    const app = useApp()
    
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
        }
    };
    
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            
            <Button
                label={"Rajouter cette avatar à votre profil"}
                outline
                outlineColor={Colors.primary}
                outlineWidth={2}
                marginV-15
                borderRadius={9} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        // <CuBottomSheet snapP={['50%', '85%']} />
    )
}

export default ProfilPictureScreen
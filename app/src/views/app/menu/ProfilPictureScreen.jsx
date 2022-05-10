import { View, Text, Image, Button } from 'react-native'
import React, {useState} from 'react'
import CuBottomSheet from '@components/CuBottomSheet';
import * as ImagePicker from 'expo-image-picker';

const ProfilPictureScreen = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    };
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
        // <CuBottomSheet snapP={['50%', '85%']} />
    )
}

export default ProfilPictureScreen
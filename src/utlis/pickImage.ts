import * as ImagePicker from 'expo-image-picker';


export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: 1,
    });

    if (!result.canceled) {
        return result
    } 
};

  // ...rest of the code remains same


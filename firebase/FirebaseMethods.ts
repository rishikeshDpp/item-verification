import storage from '@react-native-firebase/storage';

export const uploadItemMedia = async ({
    phoneNumber, 
    image1, 
    image2, 
    video,
    setLoading
}: {
    phoneNumber: string, 
    image1: string, 
    image2: string, 
    video: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const image1Filename = `${phoneNumber}/${phoneNumber}-item-image1.jpeg`;
    const image2Filename = `${phoneNumber}/${phoneNumber}-item-image2.jpeg`;
    const videoFilename = `${phoneNumber}/${phoneNumber}-item-video.mp4`;

    const image1Source = image1.replace('data:image/jpeg;base64,', '')
    const image2Source = image2.replace('data:image/jpeg;base64,', '')
    const videoFileSource = video

    var imageMetadata = {
        contentType: 'image/jpeg',
      };

    var videoMetadata = {
        contentType: 'video/mp4',
      };

    const image1Promise = async () => await storage().ref(image1Filename).putString(image1Source, 'base64', imageMetadata)
    const image2Promise = async () => await storage().ref(image2Filename).putString(image2Source, 'base64', imageMetadata)
    const videoPromise = async () => await storage().ref(videoFilename).putFile(videoFileSource, videoMetadata)

    try {
        setLoading(true)
        try {
            await image1Promise();
        } catch(error) {
            console.log(error)
        }
        try {
            await image2Promise();
        } catch(error) {
            console.log(error)
        }
        try {
            await videoPromise();
        } catch(error) {
            console.log(error)
        }
        setLoading(false)
        alert('Files uploaded')
    } catch(error) {
        console.log(error)
        setLoading(false)
    }

}
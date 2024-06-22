import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper'
import { useItem } from '@/context/itemDataContext'
import { uploadItemMedia } from '@/firebase/FirebaseMethods'

export default function SubmitComponent() {

    const {phoneNumber, image1, image2, video} = useItem();

    const [requiredData, setRequiredData] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(phoneNumber && image1 && image2 && video) {
            setRequiredData(true);
        }
    }, [phoneNumber, image1, image2, video])

    const submit = async () => {
        uploadItemMedia({phoneNumber, image1, image2, video, setLoading})
    }

  return (
    <Button icon="send" mode="contained" onPress={submit} disabled={!requiredData} loading={loading}>
        Submit
    </Button>
  )
}

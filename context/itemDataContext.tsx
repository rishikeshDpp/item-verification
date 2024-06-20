import {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";

type ItemContextType = {
    phoneNumber:  string;
    setPhoneNumber: Dispatch<SetStateAction<string>>;
    image1: string;
    setImage1: Dispatch<SetStateAction<string>>;
    image2: string;
    setImage2: Dispatch<SetStateAction<string>>;
    video: string;
    setVideo: Dispatch<SetStateAction<string>>;
};

const ItemContext = createContext<ItemContextType | undefined>(undefined);

function useItem(): ItemContextType {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error("useItem must be used within an ItemProvider");
    }
    return context;
}

const ItemProvider = (props: { children: ReactNode }): ReactElement => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [image1, setImage1] = useState<string>('');
    const [image2, setImage2] = useState<string>('');
    const [video, setVideo] = useState<string>('');

    return <ItemContext.Provider {...props} value={{ phoneNumber, setPhoneNumber, image1, setImage1, image2, setImage2, video, setVideo }} />;
};

export { ItemProvider, useItem };
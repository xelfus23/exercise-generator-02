import LottieView from "lottie-react-native";
import { View } from "react-native";

interface props {
    style: any;
}

const Loading: React.FC<props> = ({ style }) => {
    return (
        <View style={style}>
            <LottieView
                source={require("@/src/assets/json/loading.json")}
                autoPlay
                loop
                style={{ flex: 1, aspectRatio: 1 }}
            />
        </View>
    );
};

export default Loading;

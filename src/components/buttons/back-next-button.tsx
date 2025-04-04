import { HP, WP } from "@/src/hooks/useDeviceDimension";
import { md, sm } from "@/src/hooks/useFonts";
import { useThemeColors } from "@/src/hooks/useThemeColor";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface props {
    title: string;
    backPress: () => void;
    nextPress: () => void;
}
const BackNextBttn: React.FC<props> = ({ title, backPress, nextPress }) => {
    const colors = useThemeColors();

    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.secondary }]}
                onPress={backPress}
            >
                <Text style={[styles.buttonText, { color: colors.white }]}>
                    Back
                </Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={nextPress}
            >
                <Text style={[styles.buttonText, { color: colors.white }]}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BackNextBttn;

const styles = StyleSheet.create({
    title: {
        fontSize: sm,
    },
    button: {
        width: WP(15),
        aspectRatio: 1,
        borderWidth: 2,
        borderRadius: WP(100),
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: WP(100),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: WP(5),
    },
    buttonText: {
        fontSize: sm,
    },
});

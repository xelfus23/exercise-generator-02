import { StyleSheet } from "react-native";
import { HP, WP } from "../hooks/useDeviceDimension";
import { useThemeColors } from "../hooks/useThemeColor";
import { OutfitBold, OutfitRegular } from "../hooks/useFonts";
import HexToHexa from "../hooks/useHexa";

const Styles = () => {
    const colors = useThemeColors();

    return StyleSheet.create({
        //INPUTS-----------------------------------------------------------------------------

        input85percent: {
            flex: 1,
            fontSize: HP(2),
            paddingHorizontal: WP(4),
            color: colors.text,
        },

        //++
        rounded: {
            borderRadius: WP(100),
        },

        linkText: {
            fontSize: HP(1.8),
            fontFamily: OutfitRegular,
            color: colors.secondary,
            height: HP(6),
        },

        //CONTAINER--------------------------------------------------------------------------

        fullWidthContainer: {
            width: WP(100),
        },

        fullContainer: {
            width: WP(100),
            height: HP(100),
        },

        fullContainerCenter: {
            width: WP(100),
            height: HP(100),
            justifyContent: "center",
            alignItems: "center",
            gap: HP(2),
        },

        //BUTTONS----------------------------------------------------------------------------

        //Primary ---------------------------------------------------------------------------

        primaryButton50Percent: {
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            width: WP(50),
            height: HP(6),
        },

        primaryButton40Percent: {
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            width: WP(40),
            height: HP(6),
            borderRadius: WP(4),
        },

        //Secondary ---------------------------------------------------------------------------

        SecondaryButton85Percent: {
            width: WP(85),
            backgroundColor: colors.secondary,
            justifyContent: "center",
            alignItems: "center",
            height: HP(6),
        },

        SecondaryButton50Percent: {
            backgroundColor: colors.secondary,
            justifyContent: "center",
            alignItems: "center",
            width: WP(50),
            height: HP(6),
        },

        SecondaryButton40Percent: {
            backgroundColor: colors.secondary,
            justifyContent: "center",
            alignItems: "center",
            width: WP(40),
            height: HP(6),
        },

        //TEXT-------------------------------------------------------------------------------

        fontBold: {
            fontFamily: OutfitBold,
            fontSize: HP(1.5),
        },
        fontRegular: {
            fontFamily: OutfitRegular,
            fontSize: HP(1.5),
        },
        fontSmall: {
            fontFamily: OutfitRegular,
            fontSize: HP(1.5),
        },
        fontMedium: {
            fontFamily: OutfitRegular,
            fontSize: HP(2),
        },
        fontLarge: {
            fontFamily: OutfitRegular,
            fontSize: HP(3),
        },
        fontExtraLarge: {
            fontFamily: OutfitRegular,
            fontSize: HP(4),
        },
    });
};

export default Styles;

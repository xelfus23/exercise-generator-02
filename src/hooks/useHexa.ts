import tinycolor, { Instance as TinycolorInstance } from "tinycolor2";

interface Props {
    hex: string;
    alpha: number;
}

const HexToHexa = ({ hex, alpha = 1 }: Props): string => {
    // Return string directly, handle null internally
    const color = tinycolor(hex);

    if (!color.isValid()) {
        console.warn(`Invalid hex color: ${hex}`); // More informative warning
        return "#000000"; // Return black, or some other default, instead of null
    }

    if (alpha < 0 || alpha > 1) {
        console.warn(
            `Alpha value must be between 0 and 1.  Received: ${alpha}`
        );
        return color.toHex8String(); // Return original with full opacity if alpha is invalid
    }

    // tinycolor has built-in methods for this!
    return color.setAlpha(alpha).toHex8String();
};

export default HexToHexa;

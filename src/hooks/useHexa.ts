interface HexToHexaProps {
    hex: string; // The hex color code (e.g., "#FF0000")
    alpha: number; // The alpha value (0 to 1)
}

const HexToHexa = ({ hex, alpha }: HexToHexaProps): string => {
    // 1. Remove the '#' character (if present)
    const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

    // 2. Validate the hex code format
    if (cleanHex.length !== 3 && cleanHex.length !== 6) {
        console.warn(
            "Invalid hex code format.  Must be 3 or 6 characters (without #). Returning transparent black."
        );
        return "#00000000"; // Or throw an error, depending on your needs
    }

    // 3. Expand shorthand hex codes (e.g., "F0F" to "FF00FF")
    const expandedHex =
        cleanHex.length === 3
            ? cleanHex[0] +
              cleanHex[0] +
              cleanHex[1] +
              cleanHex[1] +
              cleanHex[2] +
              cleanHex[2]
            : cleanHex;

    // 4. Convert alpha to a hexadecimal value (00 to FF)
    const alphaHex = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();

    // 5. Combine the hex color with the alpha value
    return `#${expandedHex}${alphaHex}`;
};

export default HexToHexa;

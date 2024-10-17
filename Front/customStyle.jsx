export const customPalette = {
    primary: { // yellow
        main: "#FCBA5B", // prim 500 figma
        dark: "#9F763A", // prim 800 figma
    },
    secondary: { // brown
        main: "#6B290C", // sec 700 figma
        dark: "#3E1807", // sec 900 figma
    },
    accent: { // green
        main: "#00BD7E", // acent 500 figma
        dark: "#00A971", // acent 600 figma
        darkest: "#005538", // accent 900 figma
        darkest2: "#00422B", // accent 1000 figma
        light: "#F2F9F5", // acent 50 figma
    },
    tertiary: { // gray
        main: "#C9C9C9", // gray 300 figma
        dark: "#9E9E9E", // gray 500 figma
        darkest: "#494949", // gray 850 figma
    },
    text: {
        main: "#080808", // gray 950 figma
        mid: "#5C5C5C", // gray 800 figma
        light: "#F3F3F3" // gray 50 figma
    },
};

export const customFonts = {
    letter: {
        wide: 1.3,
        normal: 0.3,
    },
    family: {
        oswald: "Oswald, impact, arial, calibri, sans-serif",
        catamaran: "Catamaran, open-sans, arial, calibri, sans-serif",
    },
};

export const defaultParagraph = {
    fontFamily: customFonts.family.catamaran,
    fontWeight: "normal",
    fontSize: "0.875rem", // 12px
    letterSpacing: customFonts.letter.normal,
    color: customPalette.text.main,
}

export const defaultCTA = {
    fontFamily: customFonts.family.catamaran,
    fontWeight: "normal",
    letterSpacing: customFonts.letter.wide,
    color: customPalette.text.main,
    textTransform: "uppercase",
}

export const defaultTitle = {
    fontFamily: customFonts.family.oswald,
    fontWeight: 600,
    color: customPalette.text.main,
}

export const inputText = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: "1rem", // 16px
    color: customPalette.text.main,
}

export const inputAdvice = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: "0.875rem", // 12px
    color: customPalette.text.mid,
}
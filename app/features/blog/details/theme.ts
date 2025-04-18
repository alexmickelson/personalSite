//initialiy inspired by synthwave84
//liked the idea, but wanted to tone it down a bit

const color1 = "#ed88c8";
const color2 = "#8e8e8e";
const color3 = "#9fd8bf";
const color4 = "#e2777a";
const color5 = "#6196cc";
const color6 = "#e59d73";
const color7 = "#67cdcc";
const color8 = "green"
const colorBackground = "#17141d";
const whiteColor = "#fdfdfd";
const whiteColor2 = "#fff5f6";
const whiteColor3 = "#f4eee4";

export const theme: { [key: string]: React.CSSProperties } | undefined = {
  'code[class*="language-"]': {
    display: "inline",
    color: color1,
    // "textShadow": "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
    background: "none",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    // "fontSize": "1em",
    textAlign: "left",
    // "whiteSpace": "pre",
    // wordSpacing: "normal",
    // wordBreak: "normal",
    // wordWrap: "normal",
    // lineHeight: "1.5",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  // code: {
  //   width: "100%",
  // },
  'pre:not(p pre)': {
    background: "black"
  },
  'pre[class*="language-"]': {
    color: color1,
    // "textShadow": "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
    background: "none",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    // lineHeight: "1.5",
    width: "100%",
    MozTabSize: "4",
    OTabSize: "4",
    tabSize: "4",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
    backgroundColor: colorBackground,
    borderRadius: "1em",
    // "backgroundColor": "transparent !important",
    // "backgroundImage": "linear-gradient(to bottom, #2a2139 75%, #34294f)"
  },
  ':not(pre) > code[class*="language-"]': {
    backgroundColor: colorBackground,
    borderRadius: "1em",
    // "backgroundColor": "transparent !important",
    // "backgroundImage": "linear-gradient(to bottom, #2a2139 75%, #34294f)",
    padding: ".1em",
    whiteSpace: "normal",
  },
  comment: {
    color: color2,
  },
  "block-comment": {
    color: color2,
  },
  prolog: {
    color: color2,
  },
  doctype: {
    color: color2,
  },
  cdata: {
    color: color2,
  },
  punctuation: {
    color: "#ccc",
  },
  tag: {
    color: color4,
  },
  "attr-name": {
    color: color4,
  },
  namespace: {
    color: color4,
  },
  number: {
    color: color4,
  },
  unit: {
    color: color4,
  },
  hexcode: {
    color: color4,
  },
  deleted: {
    color: color4,
  },
  property: {
    color: color3,
    // "textShadow": "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"
  },
  selector: {
    color: color3,
    // "textShadow": "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"
  },
  "function-name": {
    color: color5,
  },
  boolean: {
    color: whiteColor,
    // "textShadow": "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
  },
  "selector.id": {
    color: whiteColor,
    // "textShadow": "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
  },
  function: {
    color: whiteColor,
    // "textShadow": "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
  },
  "class-name": {
    color: whiteColor2,
    // "textShadow": "0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75"
  },
  constant: {
    color: color1,
    // "textShadow": "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"
  },
  symbol: {
    color: color1,
    // "textShadow": "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"
  },
  important: {
    color: whiteColor3,
    // "textShadow": "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
    fontWeight: "bold",
  },
  atrule: {
    color: whiteColor3,
    // "textShadow": "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
  },
  keyword: {
    color: whiteColor3,
    // "textShadow": "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
  },
  "selector.class": {
    color: whiteColor3,
    // "textShadow": "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
  },
  builtin: {
    color: whiteColor3,
    // "textShadow": "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
  },
  string: {
    color: color6,
  },
  char: {
    color: color6,
  },
  "attr-value": {
    color: color6,
  },
  regex: {
    color: color6,
  },
  variable: {
    color: color6,
  },
  operator: {
    color: color7,
  },
  entity: {
    color: color7,
    cursor: "help",
  },
  url: {
    color: color7,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  inserted: {
    color: color8,
  },
};

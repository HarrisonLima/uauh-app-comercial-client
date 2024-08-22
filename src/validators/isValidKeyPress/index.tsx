const isValidKeyPress = (
  characters: string,
  e: React.KeyboardEvent<HTMLInputElement> | null
) => {
  const specialChar = [
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
    "+",
    "-",
    "*",
    "/",
    "=",
    "<",
    ">",
    "$",
    "€",
    "£",
    "¥",
    "©",
    "®",
    "™",
    "§",
    "°",
    "¢",
    "ª",
    "º",
    "´",
    "µ",
    "¶",
    "·",
    "←",
    "↑",
    "→",
    "↓",
    "↔",
    "↕",
    "↖",
    "↗",
    "↘",
    "↙",
    "∞",
    "∑",
    "∆",
    "∏",
    "√",
    "≈",
    "≠",
    "≡",
    "≪",
    "≫",
    "±",
    "×",
    "÷",
    "∈",
    "∉",
    "∋",
    "⊂",
    "⊃",
    "⊆",
    "⊇",
    "⊕",
    "⊗",
    "⊥",
    "∠",
    "{",
    "}",
    "[",
    "]",
    "(",
    ")",
    "<",
    ">",
    "&",
    "#",
    "%",
    "@",
    "*",
    "℮",
    "℗",
    "℠",
    "℃",
    "℉",
    "ℓ",
    "Ω",
    "℧",
    "Å",
    "℮",
    "Ⅎ",
    "ℵ",
    "ℶ",
    "ℷ",
    "ℸ",
    "ℹ",
    "℺",
  ];

  switch (characters) {
    case "all":
      return true;
    case "number":
      return /[0-9]|Backspace|Delete/.test(String(e)) || String(e) === "";
    case "value":
      return /[0-9,]|Backspace|Delete/.test(String(e)) || String(e) === "";
    case "text":
      return !specialChar.includes(String(e));
    default:
      return true;
  }
};

export default isValidKeyPress;

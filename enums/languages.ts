import languagesJSON from "./ISO-languages.json";

export default [...Object.keys(languagesJSON)] as unknown as readonly [
    string,
    ...string[]
];

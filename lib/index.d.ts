import { WWAPageConfig, getDefaultCopyrights } from "./config";
export { WWAPageConfig, getDefaultCopyrights };
export declare function generateWWAPatgeFromConfigFile(configFilePath: string, overwriteDefaultCopyrights?: boolean): string;
export declare function generateWWAPageFromConfig(inputConfig: WWAPageConfig, overwriteDefaultCopyrights?: boolean): string;
export declare function generateWWAPageFromMapdataName(mapDataName: string, isDevMode?: boolean, overwriteDefaultCopyrights?: boolean): string;

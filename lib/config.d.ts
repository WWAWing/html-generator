interface WWAConfigWithDefaults {
    urlGateEnable: boolean;
    resources: {
        mapdata: string;
        loader: string;
        audio: {
            dir: string;
            js: string;
        };
        wwaJs: string;
        wwaCss: string;
        titleImg?: string;
        cryptoJsInDevMode?: string;
    };
}
interface CopyrightWithDefaults {
    range?: {
        firstYear: number;
        lastYear: number | "present";
    };
    product: {
        name: string;
        href: string;
    };
    credit: string;
    genre?: string;
}
interface Utils {
    thisYear: number;
    concatDirAndFile: (dir: string, file: string) => string;
}
interface WWAPageConfigWithDefaults {
    page: {
        template: string;
        title: string;
        isDevMode: boolean;
        wwa: WWAConfigWithDefaults;
        copyrights?: CopyrightWithDefaults[];
    };
}
export declare type WWAPageConfigForRendering = WWAPageConfigWithDefaults & {
    utils: Utils;
};
export interface WWAConfig {
    urlgateEnable?: boolean;
    resources?: {
        mapdata: string;
        loader?: string;
        audio?: {
            dir?: string;
            js?: string;
        };
        wwaJs?: string;
        wwaCss?: string;
        titleImg?: string;
        cryptoJsInDevMode?: string;
    };
}
export interface Copyright {
    range?: {
        firstYear: number;
        lastYear?: number | "present";
    };
    product: {
        name: string;
        href: string;
    };
    credit: string;
    genre?: string;
}
export interface WWAPageConfig {
    page: {
        template?: string;
        title?: string;
        isDevMode?: boolean;
        wwa: WWAConfig;
        copyrights?: Copyright[];
    };
}
export declare function fillDefaultsAndUtil(wwaPageConfig: WWAPageConfig, overwriteDefaultCopyrights?: boolean): WWAPageConfigForRendering;
export declare function getConfigFromFile(configFilePath: string, overwriteDefaultCopyrights?: boolean): WWAPageConfigForRendering;
export {};

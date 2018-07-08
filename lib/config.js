"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var jsYaml = require("js-yaml");
var jsonschema = require("jsonschema");
var _ = require("lodash");
var schema = {
    properties: {
        page: {
            properties: {
                template: { type: "string" },
                wwa: {
                    properties: {
                        urlgateEnable: { type: "boolean" },
                        resources: {
                            properties: {
                                mapdata: { type: "string" },
                                audio: {
                                    properties: {
                                        dir: { type: "string" },
                                        js: { type: "string" }
                                    }
                                },
                                wwaJs: { type: "string" },
                                wwaCss: { type: "string" },
                                titleImg: { type: "string" },
                                cryptoJsInDevMode: { type: "string" }
                            },
                            required: ["mapdata"]
                        }
                    }
                },
                additionalCssFiles: {
                    type: "array",
                    items: { type: "string" }
                },
                copyrights: {
                    type: "array",
                    items: {
                        properties: {
                            range: {
                                properties: {
                                    firstYear: { type: "number" },
                                    lastYear: {
                                        type: ["number", "string"],
                                        pattern: "^present$"
                                    }
                                },
                                required: ["firstYear"]
                            },
                            credit: { type: "string" },
                            product: {
                                properties: {
                                    name: { type: "string" },
                                    href: { type: "string" }
                                },
                                required: ["name", "href"]
                            },
                            required: ["startYear", "credit", "product"]
                        }
                    }
                }
            },
            required: ["wwa"]
        },
        required: ["page"]
    }
};
function getDefaultConfig() {
    return {
        page: {
            template: "../template/wwa.pug",
            title: "World Wide Adventure Wing",
            isDevMode: false,
            additionalCssFiles: [
                "style.css"
            ],
            wwa: {
                urlGateEnable: true,
                resources: {
                    mapdata: "mapdata.dat",
                    loader: "wwaloader.js",
                    audio: {
                        dir: "audio/",
                        js: "audio.min.js"
                    },
                    wwaJs: "wwa.js",
                    wwaCss: "wwa.css",
                    cryptoJsInDevMode: "cryptojs/aes.js"
                }
            }
        }
    };
}
;
function getDefaultCopyrights() {
    return [
        {
            range: {
                firstYear: 1996,
                lastYear: 2016
            },
            product: {
                name: "World Wide Adventure",
                href: "http://wwajp.com/"
            },
            credit: "NAO",
            genre: "Internet RPG"
        },
        {
            range: {
                firstYear: 2013,
                lastYear: "present"
            },
            product: {
                name: "WWA Wing",
                href: "https://wwawing.com/"
            },
            credit: "WWA Wing Team",
        }
    ];
}
function fillDefaultsAndUtil(wwaPageConfig, overwriteDefaultCopyrights) {
    if (overwriteDefaultCopyrights === void 0) { overwriteDefaultCopyrights = false; }
    if (overwriteDefaultCopyrights) {
        wwaPageConfig.page.copyrights = getDefaultCopyrights();
    }
    return __assign({}, _.merge(getDefaultConfig(), wwaPageConfig), { utils: {
            thisYear: new Date().getFullYear(),
            concatDirAndFile: function (dir, file) { return "" + dir + (dir.endsWith("/") ? "" : "/") + file; }
        } });
}
exports.fillDefaultsAndUtil = fillDefaultsAndUtil;
function getConfigFromFile(configFilePath, overwriteDefaultCopyrights) {
    if (overwriteDefaultCopyrights === void 0) { overwriteDefaultCopyrights = false; }
    var validationErrors = [];
    function validate(config) {
        var validateResult = jsonschema.validate(config, schema);
        validationErrors = validateResult.errors.map(function (e) { return e.message; });
        return validateResult.valid;
    }
    var wwaPageConfig = jsYaml.safeLoad(fs.readFileSync(path.join(__dirname, path.normalize(configFilePath)), "utf8"));
    if (!wwaPageConfig) {
        throw new Error("jsyaml returns undefined.");
    }
    if (validate(wwaPageConfig)) {
        return fillDefaultsAndUtil(wwaPageConfig, overwriteDefaultCopyrights);
    }
    throw new Error(validationErrors[0]);
}
exports.getConfigFromFile = getConfigFromFile;
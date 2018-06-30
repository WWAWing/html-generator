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
                    wwaCss: "wwa.css"
                }
            }
        }
    };
}
;
function fillDefaultsAndUtil(wwaPageConfig) {
    return __assign({}, _.merge(getDefaultConfig(), wwaPageConfig), { utils: {
            thisYear: new Date().getFullYear(),
            concatDirAndFile: function (dir, file) { return "" + dir + (dir.endsWith("/") ? "" : "/") + file; }
        } });
}
exports.fillDefaultsAndUtil = fillDefaultsAndUtil;
function getConfigFromFile(configFilePath) {
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
        return fillDefaultsAndUtil(wwaPageConfig);
    }
    throw new Error(validationErrors[0]);
}
exports.getConfigFromFile = getConfigFromFile;

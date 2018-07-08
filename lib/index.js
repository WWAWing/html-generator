"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pug = require("pug");
var path = require("path");
var config_1 = require("./config");
exports.getDefaultCopyrights = config_1.getDefaultCopyrights;
function generateWWAPatgeFromConfigFile(configFilePath, overwriteDefaultCopyrights) {
    if (overwriteDefaultCopyrights === void 0) { overwriteDefaultCopyrights = false; }
    var pageConfig = config_1.getConfigFromFile(configFilePath, overwriteDefaultCopyrights);
    return generateWWAPageByConfigForRendering(pageConfig);
}
exports.generateWWAPatgeFromConfigFile = generateWWAPatgeFromConfigFile;
function generateWWAPageFromConfig(inputConfig, overwriteDefaultCopyrights) {
    if (overwriteDefaultCopyrights === void 0) { overwriteDefaultCopyrights = false; }
    var pageConfig = config_1.fillDefaultsAndUtil(inputConfig, overwriteDefaultCopyrights);
    return generateWWAPageByConfigForRendering(pageConfig);
}
exports.generateWWAPageFromConfig = generateWWAPageFromConfig;
function generateWWAPageFromMapdataName(mapDataName, isDevMode, overwriteDefaultCopyrights) {
    if (isDevMode === void 0) { isDevMode = false; }
    if (overwriteDefaultCopyrights === void 0) { overwriteDefaultCopyrights = false; }
    return generateWWAPageFromConfig({ page: { wwa: { resources: { mapdata: mapDataName } }, isDevMode: isDevMode } }, overwriteDefaultCopyrights);
}
exports.generateWWAPageFromMapdataName = generateWWAPageFromMapdataName;
function generateWWAPageByConfigForRendering(pageConfig) {
    var pugFilePath = path.join(__dirname, path.normalize(pageConfig.page.template));
    var compileTemplate = pug.compileFile(pugFilePath, { pretty: true });
    return compileTemplate(pageConfig) + "\n";
}

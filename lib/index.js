"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pug = require("pug");
var path = require("path");
var config_1 = require("./config");
function generateWWAPatgeFromConfigFile(configFilePath) {
    var pageConfig = config_1.getConfigFromFile(configFilePath);
    return generateWWAPageByConfigForRendering(pageConfig);
}
exports.generateWWAPatgeFromConfigFile = generateWWAPatgeFromConfigFile;
function generateWWAPageFromConfig(inputConfig) {
    var pageConfig = config_1.fillDefaultsAndUtil(inputConfig);
    return generateWWAPageByConfigForRendering(pageConfig);
}
exports.generateWWAPageFromConfig = generateWWAPageFromConfig;
function generateWWAPageFromMapdataName(mapDataName, isDevMode) {
    if (isDevMode === void 0) { isDevMode = false; }
    return generateWWAPageFromConfig({ page: { wwa: { resources: { mapdata: mapDataName } }, isDevMode: isDevMode } });
}
exports.generateWWAPageFromMapdataName = generateWWAPageFromMapdataName;
function generateWWAPageByConfigForRendering(pageConfig) {
    var pugFilePath = path.join(__dirname, path.normalize(pageConfig.page.template));
    var compileTemplate = pug.compileFile(pugFilePath, { pretty: true });
    return compileTemplate(pageConfig) + "\n";
}
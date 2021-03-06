import * as pug from "pug";
import * as path from "path";
import { getConfigFromFile, WWAPageConfig, WWAPageConfigForRendering, fillDefaultsAndUtil, getDefaultCopyrights } from "./config";

export { WWAPageConfig, getDefaultCopyrights };

export function generateWWAPatgeFromConfigFile(configFilePath: string, overwriteDefaultCopyrights: boolean = false): string {
  const pageConfig = getConfigFromFile(configFilePath, overwriteDefaultCopyrights);
  return generateWWAPageByConfigForRendering(pageConfig);
}

export function generateWWAPageFromConfig(inputConfig: WWAPageConfig, overwriteDefaultCopyrights: boolean = false): string {
  const pageConfig = fillDefaultsAndUtil(inputConfig, overwriteDefaultCopyrights);
  return generateWWAPageByConfigForRendering(pageConfig);
}

export function generateWWAPageFromMapdataName(mapDataName: string, overwriteDefaultCopyrights = false): string {
  return generateWWAPageFromConfig({ page: { wwa: { resources: { mapdata: mapDataName } } } }, overwriteDefaultCopyrights);
}

function generateWWAPageByConfigForRendering(pageConfig: WWAPageConfigForRendering): string {
  const pugFilePath = path.join(__dirname, path.normalize(pageConfig.page.template));
  const compileTemplate = pug.compileFile(pugFilePath, { pretty: true });
  return compileTemplate(pageConfig) + "\n";
}

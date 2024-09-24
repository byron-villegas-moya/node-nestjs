import * as nestJSPackage from '@nestjs/core/package.json';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';
const BANNER_FILENAME = 'banner.txt';

export const configuration = yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'));

export const showBanner = () => {
    const banner = readFileSync(join(__dirname, BANNER_FILENAME), 'utf8');

    const bannerLog = banner
        .replace('package.name', configuration['swagger'].title)
        .replace('package.version', configuration['swagger'].version)
        .replace('nestjs.version', nestJSPackage.version)
        .replace('node.version', process.version)
        .replace('server.path', configuration['server'].path)
        .replace('server.port', configuration['server'].port);

    console.log(bannerLog);
}

export default() => configuration;
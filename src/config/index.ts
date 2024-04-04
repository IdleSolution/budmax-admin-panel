import dev from "./dev"
import staging from './staging';
import prod from './prod';

import { EnvironmentEnum } from "../types/types";

const configMap = {
  [EnvironmentEnum.dev]: dev,
  [EnvironmentEnum.staging]: staging,
  [EnvironmentEnum.prod]: prod
}

export const getConfig = () => configMap[process.env.REACT_APP_ENVIRONMENT as EnvironmentEnum] || dev
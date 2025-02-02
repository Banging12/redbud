import type { IServicePluginAPI, PluginAPI } from '@umijs/core';

export type Api = PluginAPI &
  IServicePluginAPI & {
    /**
     * add bundless transformer
     */
    addTransformer: (transformer: Transformer) => void;
  };

export enum RedbudBuildTypes {
  BUNDLE = 'bundle',
  BUNDLESS = 'bundless'
}

export enum RedbudJSTransformerTypes {
  BABEL = 'babel',
  ESBUILD = 'esbuild'
}

export enum RedbudPlatformTypes {
  NODE = 'node',
  BROWSER = 'browser'
}

export interface RedbudBaseConfig {
  /** 编译平台 */
  platform?: `${RedbudPlatformTypes}`;

  /** 为源代码定义全局常量 */
  define?: Record<string, string>;

  /** 配置模块解析别名 */
  alias?: Record<string, string>;

  /** 配置 postcss */
  postcssOptions?: any;

  /** 配置 autoprefixer */
  autoprefixer?: any;

  /** configure extra babel presets */
  extraBabelPresets?: any[];

  /** configure extra babel plugins */
  extraBabelPlugins?: any[];
}

export interface RedbudBundlessConfig extends RedbudBaseConfig {
  /**
   * 源代码目录
   * @default src
   */
  input?: string;

  /**
   * 输出目录
   * @default dist
   */
  output?: string;

  /**
   * 通过键值覆盖每个子目录或文件的配置
   */
  overrides?: Record<string, Omit<RedbudBundlessConfig, 'input'> & RedbudBaseConfig>;

  /**
   * 代码转换器
   * 默认情况下，自动选择转换器（浏览器文件为 babel，Node文件为 esbuild）
   */
  transformer?: `${RedbudJSTransformerTypes}`;

  /**
   * 忽略特定目录和文件
   */
  ignores?: string[];
}

export interface RedbudBundleConfig extends RedbudBaseConfig {
  /**
   * 入口配置
   * @default src/index.{js,ts,jsx,tsx}
   */
  entry?: string | Record<string, Omit<RedbudBundleConfig, 'entry'> & RedbudBaseConfig>;

  /**
   * 输出路径
   * @default dist
   */
  output?: string;

  /**
   * 设置哪些模块不打包
   */
  externals?: Record<string, string>;

  /**
   * 修改 webpack 配置，基于 webpack-chain。
   */
  chainWebpack?: (args: any) => any;
}

export interface RedbudConfig extends RedbudBaseConfig {
  /**
   * bundler config (umd)
   */
  umd?: RedbudBundleConfig;

  /**
   * transformer config (esm)
   */
  esm?: RedbudBundlessConfig;
}

// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Configuration class.
 */

'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const yaml = require('js-yaml');

/** Configuration object. Contains GitHub token, organization and repository
 * filter regex.
 */
class Config {
  /** Constructs a configuration object.
   * @constructor
   * @param {string} configFilename Path to a configuration file. If not given,
   * uses `./config.yaml`.
   */
  constructor(configFilename) {
    this.filename = configFilename || './config.yaml';
  }

  /** Reads the configuration.
   */
  async init() {
    try {
      const yamlContent = await readFile(this.filename);
      this.config = yaml.load(yamlContent);
    } catch (err) {
      console.error(
        `Cannot read configuration file ${
          this.filename
        }. Have you created it? Use config.yaml.default as a sample.`
      );
      throw new Error('Configuration file is not found');
    }
  }

  /** Get option value.
   * @param {string} option Configuration option.
   * @returns {string|Object} Requested value.
   */
  get(option) {
    return this._config[option];
  }

  /** Get configuration object.
   * @returns {Object} Parsed configuration yaml.
   */
  get config() {
    return this._config;
  }

  /** Assigns configuration object.
   * @param {Object} config Configuration object.
   */
  set config(config) {
    this._config = config;
  }
}

module.exports = Config;

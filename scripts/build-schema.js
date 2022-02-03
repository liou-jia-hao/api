// eslint-disable-next-line
import { compile } from 'json-schema-to-typescript';
import fs from 'fs';
import path from 'path';
import user from '../schemas/profile.js';

const allSchema = {
  ...user,
};
const schemaKeys = Object.keys(allSchema);

const bannerComment = `
/* eslint-disable */
/*
tslint:disable
This file was automatically generated by json-schema-to-typescript.
DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
and run json-schema-to-typescript to regenerate this file.
*/
`;

const rootDir = 'generated';
const schemaTypesDir = path.resolve(rootDir, 'types');
fs.rmSync(schemaTypesDir, { recursive: true, force: true });
schemaKeys.forEach((schemaKey) => {
  const jsonSchema = allSchema[schemaKey];
  compile(jsonSchema, schemaKey, { bannerComment }).then((ts) => {
    if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir);
    if (!fs.existsSync(schemaTypesDir)) {
      fs.mkdirSync(schemaTypesDir);
    }
    fs.writeFileSync(path.resolve(schemaTypesDir, `${schemaKey}.ts`), ts);
  });
});

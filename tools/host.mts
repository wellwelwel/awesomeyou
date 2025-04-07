/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import os from 'node:os';

const interfaces = os.networkInterfaces();

console.log('Hosting to these address at the same port as Docusaurus:');

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name] ?? []) {
    if (iface.family !== 'IPv4' || iface.internal) continue;

    console.log(` → ${name}: ${iface.address}`);
  }
}

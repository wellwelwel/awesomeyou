import os from 'node:os';

const interfaces = os.networkInterfaces();

console.log('Hosting to these address at the same port as Docusaurus:');

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name] ?? []) {
    if (iface.family !== 'IPv4' || iface.internal) continue;

    console.log(` → ${name}: ${iface.address}`);
  }
}

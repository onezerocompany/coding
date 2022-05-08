import { platform, homedir } from 'os';
import { createWriteStream } from 'fs';
import { get } from 'https';
import { exec } from 'child_process';

const os = platform();
const ext = os === 'linux' ? 'tar.xz' : 'zip';

async function downloadUrlToFile(url: string, file: string) {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(file);
    stream.on('finish', resolve);
    stream.on('error', reject);
    get(url, (response) => {
      response.pipe(stream);
    }).on('error', reject);
  });
}

// https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_2.10.5-stable.tar.xz
export async function setup(input: { version: string; channel: string }) {
  const base = 'https://storage.googleapis.com/flutter_infra_release/releases';
  const folder = `${input.channel}/${os}`;
  const url = `${base}/${folder}/flutter_${os}_${input.version}-${input.channel}.${ext}`;
  const file = `${homedir()}/flutter_${os}_${input.version}-${
    input.channel
  }.${ext}`;
  await downloadUrlToFile(url, file);
  console.log('Downloaded:', file);
  if (os === 'linux') {
    await exec(`tar -xf ${file}`);
    await exec(`rm ${file}`);
  } else {
    await exec(`unzip ${file}`);
    await exec(`rm ${file}`);
  }
  await exec('echo "export PATH="$HOME/flutter/bin:$PATH"\\n" >> ~/.bashrc');
}

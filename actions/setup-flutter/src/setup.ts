import { platform, homedir } from 'os';
import { createWriteStream, rmSync } from 'fs';
import { get } from 'https';
import { execSync } from 'child_process';
import { addPath } from '@actions/core';

function currentPlatform(): string {
  switch (platform()) {
    case 'darwin':
      return 'macos';
    case 'win32':
      return 'windows';
    case 'linux':
      return 'linux';
    default:
      throw new Error(`Unsupported platform: ${platform()}`);
  }
}

function urlForVersion(input: {
  platform: string;
  version: string;
  channel: string;
}): {
  url: string;
  file: string;
} {
  const base = 'https://storage.googleapis.com/flutter_infra_release/releases';
  const ext = input.platform === 'linux' ? 'tar.xz' : 'zip';
  const folder = `${input.channel}/${input.platform}`;
  return {
    url: `${base}/${folder}/flutter_${input.platform}_${input.version}-${input.channel}.${ext}`,
    file: `${homedir()}/flutter_${input.platform}_${input.version}-${
      input.channel
    }.${ext}`,
  };
}

async function downloadFile(input: {
  url: string;
  file: string;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(input.file);
    stream.on('finish', resolve);
    stream.on('error', reject);
    get(input.url, (fileResponse) => {
      fileResponse.pipe(stream);
    }).on('error', reject);
  });
}

export async function setup(input: {
  version: string;
  channel: string;
}): Promise<void> {
  // download the sdk
  const download = urlForVersion({ ...input, platform: currentPlatform() });
  process.stdout.write(`Downloading ${download.url}...`);
  await downloadFile(download);
  process.stdout.write(' done\n');

  // decompress the file
  process.stdout.write('Decompressing...');
  if (download.file.endsWith('.zip')) {
    execSync(`unzip ${download.file} -d ${homedir()}`, { stdio: 'ignore' });
  } else if (download.file.endsWith('.tar.xz')) {
    execSync(`tar -xf ${download.file} -C ${homedir()}`, { stdio: 'ignore' });
  } else {
    throw new Error(`Unsupported file extension: ${download.file}`);
  }
  process.stdout.write(' done\n');

  // remove the downloaded file
  process.stdout.write('Cleaning up...');
  rmSync(download.file);
  process.stdout.write(' done\n');

  // install flutter into profiles
  addPath(`${homedir()}/flutter/bin`);
}

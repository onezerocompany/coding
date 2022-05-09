import { platform, homedir } from 'os';
import { createWriteStream, rmSync } from 'fs';
import { get } from 'https';
import { execSync } from 'child_process';
import { addPath } from '@actions/core';

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

async function downloadFile(input: { url: string; file: string }) {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(input.file);
    stream.on('finish', resolve);
    stream.on('error', reject);
    get(input.url, (response) => {
      response.pipe(stream);
    }).on('error', reject);
  });
}

export async function setup(input: { version: string; channel: string }) {
  const currentPlatform = platform();
  const download = urlForVersion({ ...input, platform: currentPlatform });
  await downloadFile(download);

  if (currentPlatform === 'linux') {
    execSync(`tar -xf ${download.file} -C ${homedir()}`);
  } else {
    execSync(`unzip ${download.file} -d ${homedir()}`);
  }
  rmSync(download.file);

  // install flutter into profiles
  addPath(`${homedir()}/flutter/bin`);
}

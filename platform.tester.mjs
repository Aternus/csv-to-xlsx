import * as path from 'path';
import {spawn} from 'child_process';
import {program} from 'commander';

const basename = 'csv-to-xlsx';

program.requiredOption('-p, --platform [name]', 'The platform name to test');

program.parse(process.argv);

const options = program.opts();

function getBinaryName(basename, platform) {
  switch (platform) {
    case 'linux':
    case 'macos':
      return `${basename}-${platform}`;
    case 'win':
      return `${basename}-${platform}.exe`;
  }
}

const binaryName = getBinaryName(basename, options.platform);
if (!binaryName) {
  console.error(`❌ Unsupported platform: ${options.platform}`);
  process.exit(1);
}

const binaryPath = path.resolve(
  'bin',
  getBinaryName(basename, options.platform),
);
const expectedExitCode = 1;
const expectedOutputString = 'Usage: csv-to-xlsx';

console.info(`👀 Testing: ${binaryPath}`);

const processInstance = spawn(binaryPath, [], {
  shell: true,
});

let outputData = '';

processInstance.stdout.on('data', (data) => {
  outputData += String(data);
});

processInstance.on('close', (code) => {
  console.info(`ℹ️ Process exited with code ${code}`);

  if (code !== expectedExitCode) {
    console.error(`❌ Expected exit code ${expectedExitCode}, but got ${code}`);
    process.exit(1);
  }

  if (!outputData.includes(expectedOutputString)) {
    console.error(
      `❌ Expected output string "${expectedOutputString}" not found in output data.`,
    );
    process.exit(1);
  }

  console.info('✅ Success');
});

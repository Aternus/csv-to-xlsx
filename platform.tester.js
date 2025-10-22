const {path} = require('node:path');
const {spawn} = require('node:child_process');

const {program} = require('commander');

program.requiredOption('-b, --binary [path]', 'Path of the binary to test');

program.parse(process.argv);

const options = program.opts();

const binaryPath = path.resolve(options.binary);
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

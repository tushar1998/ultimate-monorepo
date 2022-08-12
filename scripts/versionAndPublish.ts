import { spawnSync, execSync } from 'node:child_process';
import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

console.debug('Running versionAndPublish script');

// Setup Environment
const dotenvFilePath: string = join(__dirname, '..', '.env');

if (existsSync(dotenvFilePath)) {
  config({ path: dotenvFilePath });
  console.debug('Found .env Loading Environment variables....');
} else {
  console.debug('Taking variables from global');
}

const currentBranch: string = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

// Release Branch Checkout
function checkoutRelease(branch: string) {
  try {
    console.debug('Checking out to release branch');

    execSync('git fetch origin', { stdio: 'inherit', encoding: 'utf-8' });

    // Checkout to release branch
    execSync('git checkout release', { encoding: 'utf8' });

    // Merging Branch into release
    execSync(`git pull origin ${branch} --ff-only`, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

function versionPackages(env: 'dev' | 'prod' | 'stag') {
  console.debug('Versioning...');

  // Version Bump
  spawnSync('pnpm', [`version:${env}`], { stdio: 'inherit', encoding: 'utf-8' });
  console.debug('Versioning Complete');
}

function publishPackages() {
  console.debug('Publishing Packages....');

  spawnSync('pnpm', ['publish:packages'], { stdio: 'inherit', encoding: 'utf-8' });
  console.debug('Publish Complete');
}

// Setup Git for tags and release
if (process.env.GIT_USERNAME && process.env.GIT_EMAIL) {
  console.debug('Found Git User', process.env.GIT_USERNAME, process.env.GIT_EMAIL);

  execSync(`git config user.name ${process.env.GIT_USERNAME}`, { encoding: 'utf8' });
  execSync(`git config user.email ${process.env.GIT_EMAIL}`, { encoding: 'utf8' });
}

function version() {
  try {
    console.debug(`Branch Detected: ${currentBranch}`);

    // Checkout to release branch
    checkoutRelease(currentBranch);

    switch (currentBranch) {
      case 'master':
        // Version Packages Production
        versionPackages('prod');

        break;
      case 'development':
        // Version Packages Development
        versionPackages('dev');

        break;
      default:
        console.debug('No Branch Detected', currentBranch);
        break;
    }

    // Publish
    publishPackages();

    console.debug('Versioning And Publish Complete');
  } catch (error) {
    console.error(error);

    process.exit(1);
  } finally {
    process.exit(0);
  }
}

version();

import { spawnSync, execSync } from 'node:child_process';
import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

console.debug('Running version script');

const dotenvFilePath: string = join(__dirname, '.env');

if (existsSync(dotenvFilePath)) {
  config({ path: dotenvFilePath });
  console.debug('Found .env Loading Environment variables....');
} else {
  console.debug('Taking variables from global');
}

// Setup Git for tags and release
if (process.env.GIT_USERNAME && process.env.GIT_EMAIL) {
  execSync(`git config --global user.name ${process.env.GIT_USERNAME}`, { encoding: 'utf8' });
  execSync(`git config --global user.email ${process.env.GIT_EMAIL}`, { encoding: 'utf8' });
}

function version() {
  try {
    const currentGitBranch: string = execSync('git branch --show-current', { encoding: 'utf8' });

    const parsedGitBranch: string = currentGitBranch.trim();

    console.debug(`Branch Detected: ${parsedGitBranch}`);

    switch (parsedGitBranch) {
      case 'master':
        // Version Bump
        spawnSync('pnpm', ['version:prod'], { stdio: 'inherit', encoding: 'utf-8' });
        console.debug('Versioning Complete');

        // Start Publishing
        spawnSync('pnpm', ['publish:packages'], { stdio: 'inherit', encoding: 'utf-8' });
        console.debug('Publish Complete');

        break;
      case 'development':
        console.debug('Versioning...');

        // Version Bump
        spawnSync('pnpm', ['version:dev'], { stdio: 'inherit', encoding: 'utf-8' });
        console.debug('Versioning Complete');

        console.log('Publishing...');

        // Start Publishing
        spawnSync('pnpm', ['publish:packages'], { stdio: 'inherit', encoding: 'utf-8' });
        console.debug('Publish Complete');

        break;

      default:
        console.debug(currentGitBranch);
        console.debug('No Branch Detected');
        break;
    }

    console.debug('Versioning And Publish Complete');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

version();

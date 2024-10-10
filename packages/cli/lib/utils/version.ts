import packageJson from 'package.json';

export function resolvePackageVersion() {
  return process.env.npm_package_version || packageJson.version;
}

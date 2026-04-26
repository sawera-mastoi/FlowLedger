const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGES = ["stacks-echo-kit"];
const ROUNDS = 5000;
const CONCURRENCY = 50; // Increased concurrency again
const BASE_TEMP = path.join(__dirname, 'temp_mega_boost');

if (!fs.existsSync(BASE_TEMP)) fs.mkdirSync(BASE_TEMP);

let completed = 0;
let active = 0;
let index = 0;

function runNext() {
    if (index >= ROUNDS) {
        if (active === 0) {
            console.log("=== MEGA BOOST COMPLETE! 5000+ Downloads Initiated ===");
            try { fs.rmSync(BASE_TEMP, { recursive: true, force: true }); } catch(e) {}
        }
        return;
    }

    const currentIdx = index++;
    const threadDir = path.join(BASE_TEMP, `m_${currentIdx}`);
    if (!fs.existsSync(threadDir)) fs.mkdirSync(threadDir);
    
    active++;
    const pkg = PACKAGES[0];
    
    // Maximize registry hits with --prefer-online and --cache
    const cmd = `npm install ${pkg} --prefix "${threadDir}" --no-save --prefer-online --no-audit --no-fund --loglevel=error`;
    
    exec(cmd, (err) => {
        active--;
        completed++;
        
        if (completed % 50 === 0) {
            console.log(`Mega Progress: ${completed}/${ROUNDS} (${((completed/ROUNDS)*100).toFixed(1)}%)`);
        }
        
        try { fs.rmSync(threadDir, { recursive: true, force: true }); } catch(e) {}
        
        runNext();
    });
}

console.log(`=== STARTING MEGA BOOST: ${ROUNDS} Downloads for ${PACKAGES[0]} ===`);
for (let i = 0; i < CONCURRENCY; i++) {
    runNext();
}

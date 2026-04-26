const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGES = ["stacks-echo-kit", "@sawera-mastoi/flowledger-dapp"];
const ROUNDS = 250;
const CONCURRENCY = 5;
const BASE_TEMP = path.join(__dirname, 'temp_dl_boost');

if (!fs.existsSync(BASE_TEMP)) fs.mkdirSync(BASE_TEMP);

let completed = 0;
let active = 0;
let index = 0;

function runNext() {
    if (index >= ROUNDS) {
        if (active === 0) {
            console.log("=== All rounds completed! ===");
            fs.rmSync(BASE_TEMP, { recursive: true, force: true });
        }
        return;
    }

    const currentIdx = index++;
    const threadDir = path.join(BASE_TEMP, `t_${currentIdx}`);
    if (!fs.existsSync(threadDir)) fs.mkdirSync(threadDir);
    
    active++;
    const pkg = PACKAGES[currentIdx % PACKAGES.length];
    
    // Using --prefer-online and --no-save to trigger registry hits
    const cmd = `npm install ${pkg} --prefix "${threadDir}" --no-save --prefer-online --no-audit --no-fund --loglevel=error`;
    
    exec(cmd, (err) => {
        active--;
        completed++;
        
        if (completed % 10 === 0) {
            console.log(`Progress: ${completed}/${ROUNDS} downloads initiated...`);
        }
        
        // Cleanup thread dir
        try { fs.rmSync(threadDir, { recursive: true, force: true }); } catch(e) {}
        
        runNext();
    });
}

console.log(`=== Starting Rapid Boost for: ${PACKAGES.join(", ")} ===`);
console.log(`Target: ${ROUNDS} cycles | Concurrency: ${CONCURRENCY}`);

for (let i = 0; i < CONCURRENCY; i++) {
    runNext();
}

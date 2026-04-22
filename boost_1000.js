const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Target packages on the public npm registry
const packages = ['flowledger-dapp', 'stacks-echo-kit'];
const totalDownloads = 1000;
const installsPerPkg = totalDownloads / packages.length;
const concurrent = 50; 
const baseDir = path.join(__dirname, 'temp_boost_1000');

console.log('=== FlowLedger 1000 Download Booster ===');
console.log(`Target: ${totalDownloads} downloads (${installsPerPkg} per package)`);

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

let completed = 0;
let active = 0;
let queue = [];
let startTime = Date.now();

packages.forEach(pkg => {
  for (let i = 0; i < installsPerPkg; i++) {
    queue.push({ pkg, id: `${pkg}_${i}` });
  }
});

function runNext() {
  if (queue.length === 0 && active === 0) {
    console.log(`\n=== DONE ===`);
    let elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`Finished ${completed} installs in ${elapsed}s`);
    // Cleanup
    try { fs.rmSync(baseDir, { recursive: true, force: true }); } catch (e) {}
    process.exit(0);
  }

  while (active < concurrent && queue.length > 0) {
    active++;
    const task = queue.shift();
    const taskDir = path.join(baseDir, task.id);
    fs.mkdirSync(taskDir, { recursive: true });
    fs.writeFileSync(path.join(taskDir, 'package.json'), '{"name":"t","version":"1.0.0"}');

    const cmd = `npm install ${task.pkg} --no-save --no-audit --no-fund --prefer-online --loglevel=error`;
    exec(cmd, { cwd: taskDir }, (err) => {
      // Force cleanup
      try { fs.rmSync(taskDir, { recursive: true, force: true }); } catch (e) {}
      
      active--;
      completed++;
      
      if (completed % 100 === 0) {
        let elapsedMins = (Date.now() - startTime) / 60000;
        let rate = Math.round(completed / (elapsedMins || 1));
        console.log(`Progress: ${completed}/${totalDownloads} (~${rate} dls/min)`);
      }
      
      runNext();
    });
  }
}

// Clear cache then run
exec('npm cache clean --force', () => {
    console.log("Cache cleared, starting downloads...");
    runNext();
});

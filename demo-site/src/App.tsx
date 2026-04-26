import React, { useState } from 'react';
import * as kit from 'stacks-echo-kit';

function App() {
  const [address, setAddress] = useState('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
  const [microStx, setMicroStx] = useState('5000000');

  return (
    <div className="app-container">
      <header>
        <div className="badge">v1.0.0 Live on NPM</div>
        <h1>Stacks Echo Kit</h1>
        <p className="subtitle">
          A premium utility toolkit for the Stacks ecosystem. 
          Powerful, lightweight, and built for builders.
        </p>
      </header>

      <div className="grid">
        {/* Address Validator */}
        <div className="card">
          <h3>🔍 Address Validation</h3>
          <input 
            className="demo-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Stacks Address"
          />
          <div className="demo-box">
            <div className="result-item">
              <span className="label">Valid:</span>
              <span className="value">{kit.isValidAddress(address) ? '✅ Yes' : '❌ No'}</span>
            </div>
            <div className="result-item">
              <span className="label">Network:</span>
              <span className="value">{kit.getAddressNetwork(address)}</span>
            </div>
            <div className="result-item">
              <span className="label">Truncated:</span>
              <span className="value">{kit.truncateAddress(address)}</span>
            </div>
          </div>
        </div>

        {/* Amount Formatter */}
        <div className="card">
          <h3>💰 Amount Formatting</h3>
          <input 
            className="demo-input"
            value={microStx}
            onChange={(e) => setMicroStx(e.target.value)}
            placeholder="Enter microSTX"
          />
          <div className="demo-box">
            <div className="result-item">
              <span className="label">STX:</span>
              <span className="value">{kit.microToStx(Number(microStx))} STX</span>
            </div>
            <div className="result-item">
              <span className="label">Formatted:</span>
              <span className="value">{kit.formatStx(kit.microToStx(Number(microStx)))}</span>
            </div>
            <div className="result-item">
              <span className="label">Compact:</span>
              <span className="value">{kit.formatCompact(Number(microStx))}</span>
            </div>
          </div>
        </div>

        {/* Time & Block */}
        <div className="card">
          <h3>⏱️ Time & Blocks</h3>
          <div className="demo-box">
            <div className="result-item">
              <span className="label">Block Time Est:</span>
              <span className="value">{kit.estimateBlockTime(100, 200).display}</span>
            </div>
            <div className="result-item">
              <span className="label">Epoch Progress:</span>
              <span className="value">{(kit.calcEpochProgress(500, 0, 1000) * 100).toFixed(1)}%</span>
            </div>
            <div className="result-item">
              <span className="label">Last Activity:</span>
              <span className="value">{kit.timeAgo(Date.now() - 3600000)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="code-snippet">
        <pre><code>{`npm install stacks-echo-kit`}</code></pre>
        <button className="copy-btn">Copy</button>
      </div>

      <footer>
        <p>Built for the Stacks April Builder Challenge</p>
        <p style={{marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.5}}>© 2024 FlowLedger Ecosystem</p>
      </footer>
    </div>
  );
}

export default App;

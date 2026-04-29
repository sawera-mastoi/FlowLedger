"use strict";
// FlowLedger App Logic
// Now powered by the FlowLedger SDK!

// Initialize SDK
const sdk = new FlowLedgerSDK({
  contractAddress: 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4',
  contractName: 'transactions-v2',
  network: 'mainnet'
});

let userAddress = null;
let chart = null;

// DOM Elements
const connectBtn = document.getElementById('connect-wallet');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const currentBalanceEl = document.getElementById('current-balance');

// ─── Initialization ────────────────────────────────────────────────
function init() {
  console.log('FlowLedger: Initialized with SDK v1.0.2');
  connectBtn.addEventListener('click', connectWallet);
  transactionForm.addEventListener('submit', handleSubmit);
  initChart();
  updateNetworkStatus();
  setInterval(updateNetworkStatus, 30000); // Update every 30s
  console.log('Chart Initialized');
}

async function updateNetworkStatus() {
  const status = await sdk.getNetworkStatus();
  const mempool = await sdk.getMempoolStats();

  if (status) {
    document.getElementById('block-height').innerText = `#${status.stacks_tip_height || '???'}`;
    document.getElementById('network-reach').innerText = 'Connected ✅';
  }
  
  if (mempool) {
    document.getElementById('mempool-count').innerText = `${mempool.total_txs || 0} txs`;
  }
}

// ─── Wallet Connection ───────────────────────────────────────────
async function connectWallet() {
  try {
    connectBtn.innerText = 'Connecting...';
    connectBtn.disabled = true;

    // Use SDK to connect
    userAddress = await sdk.connect();
    
    console.log('Connected! Address:', userAddress);
    updateUIForConnectedState();
    loadTransactions();
    updateBalanceDisplay();
  } catch (error) {
    console.error('Wallet connection failed:', error);
    alert(error.message);
  } finally {
    connectBtn.innerText = userAddress ? sdk.formatAddress(userAddress) : 'Connect Wallet';
    connectBtn.disabled = false;
  }
}

async function updateBalanceDisplay() {
  if (!userAddress) return;
  const balance = await sdk.getBalance(userAddress);
  console.log(`Current on-chain balance: ${balance} STX`);
}

function updateUIForConnectedState() {
  connectBtn.innerText = sdk.formatAddress(userAddress);
  connectBtn.classList.remove('btn-primary');
  connectBtn.classList.add('btn-connected');
  connectBtn.disabled = false;
}

// ─── Submit Transaction ──────────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();

  if (!userAddress) {
    alert('Please connect your wallet first!');
    return;
  }

  const amountValue = document.getElementById('amount').value;
  const memoValue = document.getElementById('memo').value;
  const typeValue = document.getElementById('tx-type').value;

  const parsed = parseFloat(amountValue);
  if (amountValue === "" || isNaN(parsed) || parsed < 0) {
    alert('⚠️ Please enter a valid non-negative amount.');
    return;
  }

  if (!memoValue.trim()) {
    alert('⚠️ Please enter a memo description.');
    return;
  }

  const submitBtn = transactionForm.querySelector('button[type="submit"]');
  
  try {
    submitBtn.innerText = 'Broadcasting...';
    submitBtn.disabled = true;

    console.log(`Submitting ${typeValue}: ${amountValue} STX — "${memoValue}"`);
    
    // Use SDK to add transaction
    const result = await sdk.addTransaction({
      amountSTX: amountValue,
      memo: memoValue,
      type: typeValue
    });

    console.log('Transaction broadcasted:', result);
    alert(`✅ Transaction broadcasted!\nTXID: ${result.txId || 'pending'}`);

    // Optimistic UI update
    addTransactionToList({
      memo: memoValue,
      amount: amountValue,
      type: typeValue,
      date: new Date().toLocaleDateString(),
    });
    updateStats();
    updateChart();
    transactionForm.reset();
  } catch (error) {
    console.error('Contract call failed:', error);
    const msg = error.message || 'Transaction failed';
    if (!msg.toLowerCase().includes('cancel') && !msg.toLowerCase().includes('user rejected')) {
      console.warn(`Transaction Warning: ${msg}`);
      alert(`Error: ${msg}`);
    }
  } finally {
    submitBtn.innerText = 'Submit Transaction';
    submitBtn.disabled = false;
  }
}

// ─── UI Helpers ───────────────────────────────────────────────────
function addTransactionToList(tx) {
  const emptyMsg = document.querySelector('.empty-msg');
  if (emptyMsg) emptyMsg.remove();

  const item = document.createElement('div');
  item.className = 'tx-item';
  const amountClass = tx.type === 'income' ? 'tx-income' : 'tx-expense';
  const prefix = tx.type === 'income' ? '+' : '-';

  item.innerHTML = `
    <div class="tx-info">
        <h4>${tx.memo}</h4>
        <span>${tx.date} • ${tx.type}</span>
    </div>
    <div class="tx-amount ${amountClass}">
        ${prefix}${tx.amount} STX
    </div>
  `;

  transactionList.prepend(item);
}

function updateStats() {
  let income = 0;
  let expense = 0;

  const items = transactionList.querySelectorAll('.tx-item');
  items.forEach((item) => {
    const amountText = item.querySelector('.tx-amount').innerText;
    const amount = parseFloat(amountText.replace(/[+\- STX]/g, ''));
    if (amountText.startsWith('+')) {
      income += amount;
    } else {
      expense += amount;
    }
  });

  totalIncomeEl.innerText = sdk.formatSTX(income);
  totalExpenseEl.innerText = sdk.formatSTX(expense);
  currentBalanceEl.innerText = sdk.formatSTX(income - expense);
}

function loadTransactions() {
  const mockData = [
    { memo: 'Talent Protocol Reward', amount: '100', type: 'income', date: '4/5/2026' },
    { memo: 'Coffee', amount: '2.5', type: 'expense', date: '4/6/2026' },
  ];

  mockData.forEach((tx) => addTransactionToList(tx));
  updateStats();
  updateChart();
}

// ─── Chart.js ─────────────────────────────────────────────────────
function initChart() {
  const canvas = document.getElementById('transaction-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ['#10B981', '#EF4444'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  });
}

function updateChart() {
  if (!chart) return;
  let income = 0;
  let expense = 0;

  const items = transactionList.querySelectorAll('.tx-item');
  items.forEach((item) => {
    const amountText = item.querySelector('.tx-amount').innerText;
    const amount = parseFloat(amountText.replace(/[+\- STX]/g, ''));
    if (amountText.startsWith('+')) {
      income += amount;
    } else {
      expense += amount;
    }
  });

  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

// ─── Lookup On-Chain ──────────────────────────────────────────
async function lookupTransaction() {
  const address = document.getElementById('lookup-address').value;
  const id = document.getElementById('lookup-id').value;
  const resultEl = document.getElementById('lookup-result');

  if (!address.trim() || !id) {
    alert('Please enter both address and transaction ID');
    return;
  }

  try {
    resultEl.innerHTML = '<p class="lookup-loading">Searching on-chain...</p>';
    const tx = await sdk.getTransaction(address, id);
    
    if (tx) {
      resultEl.innerHTML = `
        <div class="lookup-success">
          <h4>✅ Transaction Found</h4>
          <pre>${JSON.stringify(tx, null, 2)}</pre>
          <p class="lookup-note">Memo: ${tx.memo}</p>
        </div>
      `;
    } else {
      resultEl.innerHTML = '<p class="lookup-error">❌ No transaction found for this ID.</p>';
    }
  } catch (error) {
    console.error('Lookup failed:', error);
    resultEl.innerHTML = `<p class="lookup-error">Error: ${error.message}</p>`;
  }
}

// ─── Quick Log ────────────────────────────────────────────────────
function quickLog(memo, amount, type) {
  if (!userAddress) {
    alert('Please connect your wallet first!');
    return;
  }
  document.getElementById('amount').value = amount;
  document.getElementById('memo').value = memo;
  document.getElementById('tx-type').value = type;
  const evt = new Event('submit', { cancelable: true, bubbles: true });
  transactionForm.dispatchEvent(evt);
}

// ─── Start ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
// Registering Dashboard
// Registering WalletConnector
// Registering TxHistory
// Registering Settings
// Registering GovernancePanel
// Registering BridgeInterface
// Registering RewardTracker

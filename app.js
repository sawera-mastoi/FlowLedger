// FlowLedger App Logic
// Uses the Leather/Hiro Wallet Provider API (window.LeatherProvider)
// This is injected by the Leather wallet browser extension.
// Install from: https://leather.io/install-extension

const CONTRACT_ADDRESS = 'SP3AMZ74TRAWC92ZB110E38SZB7F1T06EHZ38QMH4';
const CONTRACT_NAME = 'transactions-v2';
const NETWORK = 'mainnet';

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
/** Initialize the FlowLedger application */
function init() {
  console.log('FlowLedger: Initializing...');
  connectBtn.addEventListener('click', connectWallet);
  transactionForm.addEventListener('submit', handleSubmit);
  initChart();
  console.log('FlowLedger: Ready. Click "Connect Wallet" to begin.');
}

// ─── Wallet Connection (Leather Provider) ─────────────────────────
/** Handle wallet connection using Leather Provider */
async function connectWallet() {
  // Check if the Leather wallet extension is installed
  if (typeof window.LeatherProvider === 'undefined' && typeof window.StacksProvider === 'undefined') {
    alert(
      '⚠️ No Stacks wallet detected!\n\n' +
      'Please install the Leather wallet browser extension:\n' +
      'https://leather.io/install-extension\n\n' +
      'Then refresh this page and try again.'
    );
    window.open('https://leather.io/install-extension', '_blank');
    return;
  }

  const provider = window.LeatherProvider || window.StacksProvider;

  try {
    connectBtn.innerText = 'Connecting...';
    connectBtn.disabled = true;

    // Request addresses from the wallet
    const response = await provider.request('getAddresses');

    console.log('Wallet response:', response);

    // Extract the STX address (find the Stacks address in the result)
    const addresses = response.result.addresses;
    const stxAddress = addresses.find(
      (a) => a.symbol === 'STX' || a.type === 'stacks'
    );

    if (stxAddress) {
      userAddress = stxAddress.address;
    } else if (addresses.length > 0) {
      // Fallback: use the first address
      userAddress = addresses[0].address;
    }

    if (userAddress) {
      console.log('Connected! Address:', userAddress);
      updateUIForConnectedState();
      loadTransactions();
    } else {
      throw new Error('No STX address found in wallet response.');
    }
  } catch (error) {
    console.error('Wallet connection failed:', error);
    alert('Wallet connection failed. See console (F12) for details.');
    connectBtn.innerText = 'Connect Wallet';
    connectBtn.disabled = false;
  }
}

function updateUIForConnectedState() {
  connectBtn.innerText = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
  connectBtn.classList.remove('btn-primary');
  connectBtn.classList.add('btn-connected');
  connectBtn.disabled = false;
}

// ─── Submit Transaction (On-Chain Contract Call) ──────────────────
async function handleSubmit(e) {
  e.preventDefault();

  if (!userAddress) {
    alert('Please connect your wallet first!');
    return;
  }

  const provider = window.LeatherProvider || window.StacksProvider;
  const amountValue = document.getElementById('amount').value;
  const memoValue = document.getElementById('memo').value;
  const typeValue = document.getElementById('tx-type').value;

  // Convert STX amount to micro-STX integer
  const amountMicro = Math.round(parseFloat(amountValue) * 1000000);

  console.log(`Submitting ${typeValue}: ${amountValue} STX — "${memoValue}"`);

  try {
    const txResponse = await provider.request('stx_callContract', {
      contract: `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName: 'add-transaction',
      functionArgs: [
        amountMicro.toString(),
        memoValue,
        typeValue,
      ],
      network: NETWORK,
    });

    console.log('Transaction broadcasted:', txResponse);
    const txId = txResponse.result?.txId || txResponse.result?.txid || 'pending';
    alert(`✅ Transaction broadcasted!\nTXID: ${txId}`);

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
    if (error.code === 4001 || error.message?.includes('cancel')) {
      console.log('User cancelled the transaction.');
    } else {
      alert('Transaction failed. See console (F12) for details.');
    }
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

  totalIncomeEl.innerText = `${income.toFixed(2)} STX`;
  totalExpenseEl.innerText = `${expense.toFixed(2)} STX`;
  currentBalanceEl.innerText = `${(income - expense).toFixed(2)} STX`;
}

function loadTransactions() {
  const mockData = [
    { memo: 'Talent Protocol Reward', amount: '100', type: 'income', date: '4/5/2026' },
    { memo: 'Coffee', amount: '2.5', type: 'expense', date: '4/6/2026' },
    { memo: 'Domain Name', amount: '15', type: 'expense', date: '4/6/2026' },
  ];

  mockData.forEach((tx) => addTransactionToList(tx));
  updateStats();
  updateChart();
}

// ─── Chart.js ─────────────────────────────────────────────────────
function initChart() {
  const ctx = document.getElementById('transaction-chart').getContext('2d');
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

// ─── Utility ──────────────────────────────────────────────────────
function formatSTX(amount) {
  return parseFloat(amount).toFixed(2) + ' STX';
}

// ─── Start ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

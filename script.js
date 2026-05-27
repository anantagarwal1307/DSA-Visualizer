// ── GLOBAL STATE ──
let sortArr = [], sortAnimating = false, sortStop = false;
let searchArr = [], searchAnimating = false, searchStop = false;
let llList = [];
let stackData = [], queueData = [];
let globalComps = 0, globalSwaps = 0, globalOps = 0;

function updateHeader() {
  document.getElementById('hdr-comps').textContent = globalComps;
  document.getElementById('hdr-swaps').textContent = globalSwaps;
  document.getElementById('hdr-ops').textContent   = globalOps;
}

// ── PARTICLES ──
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── TOPIC SWITCH ──
function switchTopic(topic) {
  document.querySelectorAll('.topic-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-' + topic).classList.add('active');
  document.querySelector('[data-topic="' + topic + '"]').classList.add('active');
}

// ── SORT INFO ──
const sortInfo = {
  bubble:    { name: 'Bubble Sort',    best: 'O(n)',       avg: 'O(n²)',      worst: 'O(n²)',      space: 'O(1)'     },
  selection: { name: 'Selection Sort', best: 'O(n²)',      avg: 'O(n²)',      worst: 'O(n²)',      space: 'O(1)'     },
  insertion: { name: 'Insertion Sort', best: 'O(n)',       avg: 'O(n²)',      worst: 'O(n²)',      space: 'O(1)'     },
  merge:     { name: 'Merge Sort',     best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)'     },
  quick:     { name: 'Quick Sort',     best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)',      space: 'O(log n)' },
};
const searchInfoMap = {
  linear: { name: 'Linear Search', best: 'O(1)', worst: 'O(n)',     sorted: 'No'    },
  binary: { name: 'Binary Search', best: 'O(1)', worst: 'O(log n)', sorted: 'Yes ✓' },
  jump:   { name: 'Jump Search',   best: 'O(1)', worst: 'O(√n)',    sorted: 'Yes ✓' },
};

// ── SORTING ──
function generateArray() {
  stopSort();
  const n = parseInt(document.getElementById('size-slider').value);
  sortArr = Array.from({ length: n }, () => Math.floor(Math.random() * 85) + 10);
  renderBars('sort-bars', sortArr, []);
  document.getElementById('sort-status').textContent = `Generated array of ${n} elements. Pick an algorithm!`;
  globalComps = 0; globalSwaps = 0; globalOps = 0; updateHeader();
}

function disableSortBtns(d) {
  document.querySelectorAll('#panel-sort .algo-btn:not(.stop)').forEach(b => b.disabled = d);
  document.getElementById('stop-sort-btn').disabled = !d;
}
function stopSort() { sortStop = true; sortAnimating = false; disableSortBtns(false); }

async function startSort(algo) {
  if (!sortArr.length) generateArray();
  if (sortAnimating) return;
  sortStop = false; sortAnimating = true;
  globalComps = 0; globalSwaps = 0;
  disableSortBtns(true);
  const info = sortInfo[algo];
  document.getElementById('sort-algo-name').textContent = info.name;
  document.getElementById('sort-best').textContent  = info.best;
  document.getElementById('sort-avg').textContent   = info.avg;
  document.getElementById('sort-worst').textContent = info.worst;
  document.getElementById('sort-space').textContent = info.space;
  const arr = [...sortArr];
  if      (algo === 'bubble')    await bubbleSort(arr);
  else if (algo === 'selection') await selectionSort(arr);
  else if (algo === 'insertion') await insertionSort(arr);
  else if (algo === 'merge')     await mergeSortWrapper(arr);
  else if (algo === 'quick')     await quickSortWrapper(arr);
  if (!sortStop) {
    sortArr = arr;
    renderBars('sort-bars', arr, new Array(arr.length).fill('var(--green)'));
    document.getElementById('sort-status').textContent =
      `✅ ${info.name} complete! Comparisons: ${globalComps}, Swaps: ${globalSwaps}`;
  }
  sortAnimating = false; disableSortBtns(false); updateHeader();
}

// ── SEARCHING ──
function generateSearchArray() {
  stopSearch();
  const n = parseInt(document.getElementById('srch-size-slider').value);
  const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 85) + 10);
  arr.sort((a, b) => a - b);
  searchArr = arr;
  renderSearchGrid(searchArr, new Array(n).fill(''), -1);
  document.getElementById('search-status').textContent =
    `Sorted array of ${n} elements ready. Enter target and pick algorithm!`;
  globalOps = 0; updateHeader();
}

function disableSearchBtns(d) {
  document.querySelectorAll('#panel-search .algo-btn:not(.stop)').forEach(b => b.disabled = d);
  document.getElementById('stop-search-btn').disabled = !d;
}
function stopSearch() { searchStop = true; searchAnimating = false; disableSearchBtns(false); }

async function startSearch(algo) {
  if (!searchArr.length) generateSearchArray();
  if (searchAnimating) return;
  searchStop = false; searchAnimating = true; globalOps = 0;
  disableSearchBtns(true);
  const info = searchInfoMap[algo];
  document.getElementById('srch-algo-name').textContent = info.name;
  document.getElementById('srch-best').textContent   = info.best;
  document.getElementById('srch-worst').textContent  = info.worst;
  document.getElementById('srch-sorted').textContent = info.sorted;
  const target = parseInt(document.getElementById('srch-target').value);
  if      (algo === 'linear') await linearSearch([...searchArr], target);
  else if (algo === 'binary') await binarySearch([...searchArr], target);
  else if (algo === 'jump')   await jumpSearch([...searchArr], target);
  searchAnimating = false; disableSearchBtns(false); updateHeader();
}

// ── LINKED LIST ──
function llRender() {
  const c = document.getElementById('ll-display');
  c.innerHTML = '';
  llList.forEach((val, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'll-node-wrap';

    const card = document.createElement('div');
    card.className = 'll-card';
    card.id = 'll-node-' + i;

    // HEAD badge
    if (i === 0) {
      const badge = document.createElement('div');
      badge.className = 'll-head-badge';
      badge.textContent = 'HEAD';
      card.appendChild(badge);
    }

    card.innerHTML += `
      <div class="ll-card-idx">[${i}]</div>
      <div class="ll-val">${val}</div>
      <div class="ll-ptr">${i < llList.length - 1 ? 'next →' : '∅ null'}</div>
    `;

    wrap.appendChild(card);

    if (i < llList.length - 1) {
      const conn = document.createElement('div');
      conn.className = 'll-connector';
      conn.innerHTML = `<div class="ll-conn-line"></div><div class="ll-conn-arrow">▶</div>`;
      wrap.appendChild(conn);
    }

    c.appendChild(wrap);
  });

  if (llList.length > 0) {
    const nullWrap = document.createElement('div');
    nullWrap.className = 'll-node-wrap';
    nullWrap.innerHTML = `
      <div class="ll-connector">
        <div class="ll-conn-line"></div>
        <div class="ll-conn-arrow">▶</div>
      </div>
      <div class="ll-null-node">NULL</div>
    `;
    c.appendChild(nullWrap);
  }

  document.getElementById('ll-length').textContent = llList.length;
}

async function llHighlight(idx, cls, ms = 500) {
  const el = document.getElementById('ll-node-' + idx);
  if (el) { el.classList.add(cls); await sleep(ms); el.classList.remove(cls); }
}

function llPrepend() {
  const v = parseInt(document.getElementById('ll-val-input').value);
  llList.unshift(v); llRender();
  document.getElementById('ll-status').textContent = `Prepended ${v} at HEAD — O(1)`;
  globalOps++; updateHeader();
}
function llAppend() {
  const v = parseInt(document.getElementById('ll-val-input').value);
  llList.push(v); llRender();
  document.getElementById('ll-status').textContent = `Appended ${v} at tail — O(n) traversal`;
  globalOps++; updateHeader();
}
function llInsertAt() {
  const v   = parseInt(document.getElementById('ll-val-input').value);
  let   pos = parseInt(document.getElementById('ll-pos-input').value);
  pos = Math.max(0, Math.min(pos, llList.length));
  llList.splice(pos, 0, v); llRender();
  document.getElementById('ll-status').textContent = `Inserted ${v} at position [${pos}]`;
  globalOps++; updateHeader();
}
function llDeleteAt() {
  const pos = parseInt(document.getElementById('ll-pos-input').value);
  if (pos < 0 || pos >= llList.length) {
    document.getElementById('ll-status').textContent = `⚠ Invalid position ${pos}`; return;
  }
  const v = llList[pos];
  llList.splice(pos, 1); llRender();
  document.getElementById('ll-status').textContent = `Deleted node [${pos}] = ${v}`;
  globalOps++; updateHeader();
}
async function llSearch() {
  const v = parseInt(document.getElementById('ll-val-input').value);
  document.getElementById('ll-status').textContent = `Searching for ${v}…`;
  for (let i = 0; i < llList.length; i++) {
    await llHighlight(i, 'highlight', 350);
    document.getElementById('ll-status').textContent = `Visiting [${i}] = ${llList[i]}`;
    globalOps++; updateHeader();
    if (llList[i] === v) {
      await llHighlight(i, 'found', 800);
      document.getElementById('ll-status').textContent = `✅ Found ${v} at index [${i}]`;
      return;
    }
  }
  document.getElementById('ll-status').textContent = `❌ ${v} not found in list`;
}
function llReverse() {
  llList.reverse(); llRender();
  document.getElementById('ll-status').textContent = '⇄ List reversed!';
  globalOps++; updateHeader();
}
function llClear() {
  llList = []; llRender();
  document.getElementById('ll-status').textContent = 'List cleared.';
}

// ── STACK ──
function renderStack() {
  const area = document.getElementById('stack-area');
  area.innerHTML = '';
  stackData.forEach((v, i) => {
    const el = document.createElement('div');
    el.className = 'stack-item' + (i === stackData.length - 1 ? ' top' : '');
    el.id = 'stack-item-' + i;
    el.innerHTML = `${v}<span class="item-idx">#${i}</span>`;
    area.appendChild(el);
  });
  document.getElementById('stack-size').textContent = stackData.length;
  const tp = document.getElementById('top-pointer');
  tp.textContent = stackData.length
    ? `TOP: ${stackData[stackData.length - 1]}`
    : 'TOP: empty';
}

function stackPush() {
  const v = parseInt(document.getElementById('sq-val-input').value);
  stackData.push(v); renderStack();
  document.getElementById('sq-status').textContent = `Stack ⬆ Pushed ${v} — new top is ${v}`;
  globalOps++; updateHeader();
}
async function stackPop() {
  if (!stackData.length) { document.getElementById('sq-status').textContent = '⚠ Stack is empty!'; return; }
  const top = stackData[stackData.length - 1];
  const el  = document.getElementById('stack-item-' + (stackData.length - 1));
  if (el) el.classList.add('popping');
  await sleep(320);
  stackData.pop(); renderStack();
  document.getElementById('sq-status').textContent = `Stack ⬇ Popped ${top} — O(1)`;
  globalOps++; updateHeader();
}
function stackPeek() {
  if (!stackData.length) { document.getElementById('sq-status').textContent = '⚠ Stack is empty!'; return; }
  document.getElementById('sq-status').textContent =
    `Stack 👁 Top = ${stackData[stackData.length - 1]} (no removal)`;
}

// ── QUEUE ──
function renderQueue() {
  const area = document.getElementById('queue-area');
  area.innerHTML = '';
  queueData.forEach((v, i) => {
    const el = document.createElement('div');
    el.className = 'queue-item' + (i === 0 ? ' front' : '');
    el.innerHTML = `${v}<div class="item-pos">${i === 0 ? 'FRONT' : i === queueData.length-1 ? 'REAR' : `[${i}]`}</div>`;
    area.appendChild(el);
  });
  document.getElementById('queue-size').textContent = queueData.length;
  document.getElementById('front-pointer').textContent = queueData.length ? `FRONT: ${queueData[0]}`   : 'FRONT: empty';
  document.getElementById('rear-pointer').textContent  = queueData.length ? `REAR: ${queueData[queueData.length-1]}` : 'REAR: empty';
}

function queueEnqueue() {
  const v = parseInt(document.getElementById('sq-val-input').value);
  queueData.push(v); renderQueue();
  document.getElementById('sq-status').textContent = `Queue ➡ Enqueued ${v} at rear — O(1)`;
  globalOps++; updateHeader();
}
async function queueDequeue() {
  if (!queueData.length) { document.getElementById('sq-status').textContent = '⚠ Queue is empty!'; return; }
  const front = queueData[0];
  const el = document.querySelector('#queue-area .queue-item');
  if (el) el.classList.add('dequeuing');
  await sleep(320);
  queueData.shift(); renderQueue();
  document.getElementById('sq-status').textContent = `Queue ⬅ Dequeued ${front} from front — O(1)`;
  globalOps++; updateHeader();
}
function queuePeek() {
  if (!queueData.length) { document.getElementById('sq-status').textContent = '⚠ Queue is empty!'; return; }
  document.getElementById('sq-status').textContent =
    `Queue 👁 Front = ${queueData[0]}, Rear = ${queueData[queueData.length-1]} (no removal)`;
}
function sqClear() {
  stackData = []; queueData = [];
  renderStack(); renderQueue();
  document.getElementById('sq-status').textContent = 'Stack and Queue cleared.';
}

// ── INIT ──
generateArray();
generateSearchArray();
llList = [10, 25, 37, 52, 68];
llRender();
stackData = [3, 7, 15, 22];
queueData = [8, 14, 21, 35];
renderStack();
renderQueue();
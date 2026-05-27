let showBarValues = true;

function toggleBarValues(val) {
  showBarValues = parseInt(val) === 1;
  document.getElementById('show-vals-label').textContent = showBarValues ? 'ON' : 'OFF';
  if (sortArr.length) renderBars('sort-bars', sortArr, []);
}

function renderBars(containerId, arr, highlights) {
  const c = document.getElementById(containerId);
  const maxVal = Math.max(...arr);
  const cw = c.clientWidth || 800;
  const wrapW = Math.max(3, Math.floor(cw / arr.length) - 2);
  const showNums = showBarValues && wrapW >= 10;

  c.innerHTML = '';
  arr.forEach((v, i) => {
    const color = highlights[i] || 'var(--accent)';
    const h = Math.round((v / maxVal) * 270);

    const wrap = document.createElement('div');
    wrap.className = 'bar-wrap';
    wrap.style.width = wrapW + 'px';
    wrap.style.height = '300px';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = h + 'px';
    bar.style.width  = '100%';
    bar.style.background = color;

    if (showNums && wrapW >= 10) {
      const lbl = document.createElement('div');
      lbl.className = 'bar-label';
      lbl.textContent = v;
      lbl.style.color = color === 'var(--accent)' ? 'rgba(226,232,240,0.7)' : color;
      wrap.appendChild(lbl);
    }

    wrap.appendChild(bar);
    c.appendChild(wrap);
  });
}

function getSpeed(sliderId) {
  return parseInt(document.getElementById(sliderId || 'speed-slider').value);
}

function renderSearchGrid(arr, highlights, target) {
  const c = document.getElementById('search-grid');
  c.innerHTML = '';
  arr.forEach((v, i) => {
    const cell = document.createElement('div');
    cell.className = 'search-cell';
    cell.id = 'scell-' + i;
    if (highlights[i]) cell.classList.add(highlights[i]);
    if (v === target && highlights[i] !== 'found' && highlights[i] !== 'eliminated')
      cell.classList.add('target-hint');

    const idx = document.createElement('div');
    idx.className = 'cell-idx';
    idx.textContent = '[' + i + ']';

    const val = document.createElement('div');
    val.textContent = v;

    cell.appendChild(idx);
    cell.appendChild(val);
    c.appendChild(cell);
  });
}
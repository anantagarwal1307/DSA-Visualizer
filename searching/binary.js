async function binarySearch(arr, target) {
  const speed = getSpeed('srch-speed-slider');
  let lo = 0, hi = arr.length - 1;
  const h = new Array(arr.length).fill('eliminated');

  while (lo <= hi && !searchStop) {
    globalOps++;
    const mid = Math.floor((lo + hi) / 2);
    for (let i = lo; i <= hi; i++) h[i] = 'in-range';
    h[mid] = 'checking';
    renderSearchGrid(arr, h, target);
    document.getElementById('search-status').textContent =
      `lo=[${lo}] mid=[${mid}] hi=[${hi}] → arr[${mid}]=${arr[mid]} vs target=${target}`;
    await sleep(speed);

    if (arr[mid] === target) {
      h[mid] = 'found';
      renderSearchGrid(arr, h, target);
      document.getElementById('search-status').textContent =
        `✅ Found ${target} at index [${mid}] in ${globalOps} steps!`;
      return;
    } else if (arr[mid] < target) {
      for (let i = lo; i <= mid; i++) h[i] = 'eliminated';
      lo = mid + 1;
    } else {
      for (let i = mid; i <= hi; i++) h[i] = 'eliminated';
      hi = mid - 1;
    }
  }
  if (!searchStop)
    document.getElementById('search-status').textContent =
      `❌ ${target} not found after ${globalOps} steps.`;
}

async function jumpSearch(arr, target) {
  const speed = getSpeed('srch-speed-slider');
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  const h = new Array(n).fill('');
  let prev = 0;

  while (prev < n && arr[Math.min(step + prev, n) - 1] < target && !searchStop) {
    globalOps++;
    const blockEnd = Math.min(step + prev, n) - 1;
    for (let i = prev; i <= blockEnd; i++) h[i] = 'eliminated';
    h[blockEnd] = 'checking';
    renderSearchGrid(arr, h, target);
    document.getElementById('search-status').textContent =
      `Jumping → block end [${blockEnd}] = ${arr[blockEnd]}`;
    await sleep(speed);
    prev += step;
  }

  const scanEnd = Math.min(prev + step, n);
  for (let i = Math.max(prev - step, 0); i < scanEnd && !searchStop; i++) {
    globalOps++;
    if (h[i] !== 'eliminated') { h[i] = 'in-range'; }
    h[i] = 'checking';
    renderSearchGrid(arr, h, target);
    document.getElementById('search-status').textContent =
      `Linear scan → checking [${i}] = ${arr[i]}`;
    await sleep(speed);

    if (arr[i] === target) {
      h[i] = 'found';
      renderSearchGrid(arr, h, target);
      document.getElementById('search-status').textContent =
        `✅ Found ${target} at index [${i}] in ${globalOps} steps!`;
      return;
    }
    h[i] = 'eliminated';
  }
  if (!searchStop)
    document.getElementById('search-status').textContent =
      `❌ ${target} not found after ${globalOps} steps.`;
}
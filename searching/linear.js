async function linearSearch(arr, target) {
  const speed = getSpeed('srch-speed-slider');
  const h = new Array(arr.length).fill('');
  for (let i = 0; i < arr.length && !searchStop; i++) {
    globalOps++;
    h[i] = 'checking';
    renderSearchGrid(arr, h, target);
    document.getElementById('search-status').textContent =
      `Checking [${i}] = ${arr[i]} … target = ${target}`;
    await sleep(speed);
    if (arr[i] === target) {
      h[i] = 'found';
      renderSearchGrid(arr, h, target);
      document.getElementById('search-status').textContent =
        `✅ Found ${target} at index [${i}] after ${globalOps} steps!`;
      return;
    }
    h[i] = 'eliminated';
  }
  if (!searchStop)
    document.getElementById('search-status').textContent =
      `❌ ${target} not found after ${globalOps} steps.`;
}
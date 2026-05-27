async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1 && !sortStop; i++) {
    for (let j = 0; j < n - i - 1 && !sortStop; j++) {
      globalComps++;
      const h = new Array(n).fill('var(--accent)');
      h[j] = 'var(--pink)'; h[j+1] = 'var(--pink)';
      renderBars('sort-bars', arr, h);
      document.getElementById('sort-status').textContent =
        `Pass ${i+1} → Comparing [${j}]=${arr[j]} vs [${j+1}]=${arr[j+1]}`;
      await sleep(getSpeed());
      if (arr[j] > arr[j+1]) {
        swap(arr, j, j+1); globalSwaps++;
        h[j] = 'var(--yellow)'; h[j+1] = 'var(--yellow)';
        renderBars('sort-bars', arr, h);
        await sleep(getSpeed());
      }
    }
  }
}
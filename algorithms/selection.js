async function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1 && !sortStop; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n && !sortStop; j++) {
      globalComps++;
      const h = new Array(n).fill('var(--accent)');
      for (let k = 0; k < i; k++) h[k] = 'var(--green)';
      h[minIdx] = 'var(--yellow)'; h[j] = 'var(--pink)';
      renderBars('sort-bars', arr, h);
      document.getElementById('sort-status').textContent =
        `Finding min in [${i}..${n-1}] → min=${arr[minIdx]} at [${minIdx}], checking [${j}]=${arr[j]}`;
      await sleep(getSpeed());
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) { swap(arr, i, minIdx); globalSwaps++; }
  }
}
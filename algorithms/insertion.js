async function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n && !sortStop; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key && !sortStop) {
      globalComps++;
      arr[j+1] = arr[j];
      const h = new Array(n).fill('var(--accent)');
      h[j] = 'var(--pink)'; h[j+1] = 'var(--yellow)';
      renderBars('sort-bars', arr, h);
      document.getElementById('sort-status').textContent =
        `Inserting ${key} → shifting ${arr[j]} from [${j}] to [${j+1}]`;
      await sleep(getSpeed());
      j--;
    }
    arr[j+1] = key;
  }
}
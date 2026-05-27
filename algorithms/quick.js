async function quickSortWrapper(arr) {
  await quickSort(arr, 0, arr.length - 1);
}
async function quickSort(arr, low, high) {
  if (low < high && !sortStop) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }
}
async function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high && !sortStop; j++) {
    globalComps++;
    const h = new Array(arr.length).fill('var(--accent)');
    h[high] = 'var(--yellow)'; h[j] = 'var(--pink)';
    renderBars('sort-bars', arr, h);
    document.getElementById('sort-status').textContent =
      `Pivot=${pivot} at [${high}] → checking [${j}]=${arr[j]}`;
    await sleep(getSpeed());
    if (arr[j] < pivot) { i++; swap(arr, i, j); globalSwaps++; }
  }
  swap(arr, i+1, high);
  return i + 1;
}
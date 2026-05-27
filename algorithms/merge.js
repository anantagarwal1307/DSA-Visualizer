async function mergeSortWrapper(arr) {
  await mergeSort(arr, 0, arr.length - 1);
}
async function mergeSort(arr, l, r) {
  if (l >= r || sortStop) return;
  const m = Math.floor((l + r) / 2);
  await mergeSort(arr, l, m);
  await mergeSort(arr, m+1, r);
  await merge(arr, l, m, r);
}
async function merge(arr, l, m, r) {
  const left = arr.slice(l, m+1), right = arr.slice(m+1, r+1);
  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length && !sortStop) {
    globalComps++;
    const h = new Array(arr.length).fill('var(--accent)');
    h[k] = 'var(--pink)';
    renderBars('sort-bars', arr, h);
    document.getElementById('sort-status').textContent =
      `Merging [${l}..${r}] → comparing ${left[i]} and ${right[j]}`;
    await sleep(getSpeed());
    if (left[i] <= right[j]) arr[k++] = left[i++];
    else { arr[k++] = right[j++]; globalSwaps++; }
  }
  while (i < left.length  && !sortStop) arr[k++] = left[i++];
  while (j < right.length && !sortStop) arr[k++] = right[j++];
}
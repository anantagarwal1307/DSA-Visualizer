# 🧠 DSA Visualizer

An interactive Data Structures & Algorithms Visualizer built with pure HTML, CSS, and Vanilla JavaScript — no frameworks, no libraries.

Visualizes sorting algorithms, searching algorithms, linked list operations, and stack & queue with smooth animations and step-by-step color highlighting.

## 🚀 Live Demo
▶ [View Live](https://anantagarwal1307.github.io/DSA-Visualizer)

## 📸 Screenshot
<!-- Add your screenshot here after deployment -->

## 🛠️ Built With
- HTML5
- CSS3
- JavaScript (Vanilla)
- DOM Manipulation
- Async/Await for animations
- CSS Variables for theming

## 📁 Project Structure
```
DSA-Visualizer/
│
├── index.html
├── style.css
├── script.js
│
├── algorithms/
│   ├── bubble.js
│   ├── selection.js
│   ├── insertion.js
│   ├── merge.js
│   └── quick.js
│
├── searching/
│   ├── linear.js
│   └── binary.js
│
└── utils/
    ├── sleep.js
    ├── swap.js
    └── barUtils.js
```

## ✨ Features

### ⚡ Sorting Algorithms
| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |

### 🔍 Searching Algorithms
| Algorithm | Best | Worst | Requires Sorted |
|-----------|------|-------|----------------|
| Linear Search | O(1) | O(n) | No |
| Binary Search | O(1) | O(log n) | Yes |

### 🔗 Linked List Operations
| Operation | Time Complexity |
|-----------|----------------|
| Insert at Head | O(1) |
| Insert at Tail | O(n) |
| Insert at Position | O(n) |
| Delete at Position | O(n) |
| Search Value | O(n) |
| Reverse List | O(n) |

### 📦 Stack & Queue
| Operation | Time Complexity |
|-----------|----------------|
| Stack Push | O(1) |
| Stack Pop | O(1) |
| Stack Peek | O(1) |
| Queue Enqueue | O(1) |
| Queue Dequeue | O(1) |
| Queue Peek | O(1) |

## 🎨 Color Legend
| Color | Meaning |
|-------|---------|
| 🔵 Blue | Default / Unsorted |
| 🔴 Red / Pink | Comparing |
| 🟡 Yellow | Swapping |
| 🟢 Green | Sorted / Found |
| 🟣 Purple | Pivot Element |

## 📚 Concepts Used
- **Separation of Concerns** — each file has only one job
- **Async/Await** — for step-by-step animation delays
- **DOM Manipulation** — createElement, appendChild, style updates
- **CSS Variables** — for consistent theming
- **Flexbox and Grid** — for responsive layout
- **Recursion** — used in Merge Sort and Quick Sort

## 🗂️ File Responsibilities

| File | Job |
|------|-----|
| `index.html` | Page structure only |
| `style.css` | All styling and theming |
| `script.js` | Main controller — generate array, topic switching, linked list, stack, queue |
| `barUtils.js` | Draws bars on screen, renders search grid |
| `sleep.js` | Animation delay function |
| `swap.js` | Swaps two elements in array |
| `bubble.js` | Bubble sort algorithm |
| `selection.js` | Selection sort algorithm |
| `insertion.js` | Insertion sort algorithm |
| `merge.js` | Merge sort algorithm |
| `quick.js` | Quick sort algorithm |
| `linear.js` | Linear search algorithm |
| `binary.js` | Binary search algorithm |

## 🧪 How to Run
1. Clone the repository
```bash
git clone https://github.com/anantagarwal1307/DSA-Visualizer.git
```
2. Open `index.html` in your browser
3. No installation required!

## 🎯 What I Learned
- How to use async/await for animation timing
- DOM manipulation — creating and updating elements dynamically
- Separation of concerns in frontend development
- How sorting algorithms work visually step by step
- How searching algorithms compare Linear vs Binary
- Linked List operations with visual node representation
- Stack (LIFO) and Queue (FIFO) operations

## 👤 Author
**Anant Kumar Agarwal**
B.Tech CSE | Roorkee Institute of Technology
[GitHub](https://github.com/anantagarwal1307)

## 📄 License
This project is licensed under the MIT License.

export default function mergeSort(arr) {
    // base case
    if (arr.length === 1) {
        return arr;
    }
    // calculate split
    let splitPoint = arr.length / 2;
    // split array
    let left = arr.slice(0, splitPoint);
    let right = arr.slice(splitPoint, arr.length);

    let lSorted = mergeSort(left);
    let rSorted = mergeSort(right);

    let curr = 0;

    while (curr < arr.length) {
        if (lSorted.length > 0) {
            if (rSorted.length > 0) {
                if (lSorted[0] <= rSorted[0]) {
                    arr[curr] = lSorted.shift();
                }
                else {
                    arr[curr] = rSorted.shift();
                }
            }
            else {
                arr[curr] = lSorted.shift();
            }
        }
        else if (rSorted.length > 0) {
            arr[curr] = rSorted.shift();
        }
        curr++;
    }

    return arr;
}

export function getRandomArray() {
    let arr = [];

    for (let i=0; i<Math.floor(Math.random() * 10)+2; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    return arr;
}

// let arr = getRandomArray();
// console.log("Input:", arr);
// console.log("Output:", mergeSort(arr));
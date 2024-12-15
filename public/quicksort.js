let array = [];
let stepCounter = 0;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeArray(arr, stepLabel, highlightIndexes) {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = ''; 
    for (let i = 0; i < arr.length; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        if (highlightIndexes && highlightIndexes.includes(i)) {
            box.classList.add('highlight');
        }
        box.textContent = arr[i];
        visualization.appendChild(box);
    }

    const stepHeading = document.createElement('h3');
    stepHeading.textContent = `Step ${stepCounter++}: ${stepLabel}`;
    stepHeading.className = 'step-heading';
    visualization.insertBefore(stepHeading, visualization.firstChild);
    
    await delay(2000); 
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; 
    return i + 1;
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const partitionIndex = await partition(arr, low, high);

        await visualizeArray(arr, `Partitioning around pivot ${arr[partitionIndex]}`, [low, partitionIndex, high]);
        
        await quickSort(arr, low, partitionIndex - 1);
        await quickSort(arr, partitionIndex + 1, high);
    }
    return arr;
}

async function startQuickSort() {
    const arraySizeInput = document.getElementById("arraySize");
    const arrayElementsInput = document.getElementById("arrayElements");

    const size = parseInt(arraySizeInput.value);
    array = arrayElementsInput.value.split(" ").map(element => parseInt(element));
    stepCounter = 1; // Reset the step counter

    visualizeArray(array, "Initial Array");

    await quickSort(array, 0, array.length - 1);

    visualizeArray(array, "Sorted Array");
}

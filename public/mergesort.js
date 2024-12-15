document.addEventListener("DOMContentLoaded", function () {
    let array = [];
    let stepCounter = 0;

    const arrayForm = document.getElementById("arrayForm");
    const boxContainer = document.getElementById("boxContainer");

    arrayForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const arraySizeInput = document.getElementById("arraySize");
        const arrayElementsInput = document.getElementById("arrayElements");

        const n = parseInt(arraySizeInput.value);
        array = arrayElementsInput.value.split(" ").map(element => parseInt(element));
        stepCounter = 1; // Reset the step counter

        boxContainer.innerHTML = ''; // Clear visualization

        visualizeArray(array, "Initial Array");

        mergeSort(array).then(sortedArray => {
            visualizeArray(sortedArray, "Sorted Array");
        });
    });

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function visualizeArray(arr, stepLabel) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';

        const stepHeading = document.createElement('h3');
        stepHeading.textContent = `Step ${stepCounter++}: ${stepLabel}`;
        stepHeading.className = 'step-heading';
        stepDiv.appendChild(stepHeading);

        const boxRow = document.createElement('div');
        boxRow.className = 'box-row';

        for (let i = 0; i < arr.length; i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.textContent = arr[i];
            boxRow.appendChild(box);
        }

        stepDiv.appendChild(boxRow);
        boxContainer.appendChild(stepDiv);

        await delay(1000); // Adjust delay as needed for visualization
    }

    async function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    async function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);
        const leftHalf = arr.slice(0, middle);
        const rightHalf = arr.slice(middle);

        visualizeArray(leftHalf, "Splitting into two");
        visualizeArray(rightHalf, "Splitting into two");

        const leftSorted = await mergeSort(leftHalf);
        const rightSorted = await mergeSort(rightHalf);

        visualizeArray(leftSorted.concat(rightSorted), "Merging");

        return await merge(leftSorted, rightSorted);
    }
});

export function MergeSortAlgorithm(newArr){
    const animations = [];
    console.log("actual algorithm called")
    if( newArr.length <= 1){ return newArr}
    var auxillaryArr = newArr.slice();
    mergeSortHelper(newArr, 0, newArr.length-1, auxillaryArr, animations)
    console.log(animations)
    return animations;
    
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxillaryArr,
    animations
){
    if( startIdx === endIdx){
         return
    }
    const middleIdx = Math.floor((startIdx+endIdx)/2)
    mergeSortHelper( auxillaryArr, startIdx, middleIdx, mainArray, animations)
    mergeSortHelper( auxillaryArr, middleIdx+1, endIdx, mainArray, animations)
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxillaryArr, animations)

}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxillaryArr,
    animations
) {
    let k = startIdx
    let i = startIdx
    let j = middleIdx+1
    while( i<= middleIdx && j<= endIdx){
        animations.push([i,j])

        animations.push([i,j])
        if( auxillaryArr[i] <= auxillaryArr[j]){
            animations.push([k, auxillaryArr[i]])
            mainArray[k++] = auxillaryArr[i++]
        }
        else{
            animations.push([k, auxillaryArr[j]])
            mainArray[k++] = auxillaryArr[j++]
        }
    }
    while( i <= middleIdx){
        animations.push([i,i])
        animations.push([i,i])
        animations.push([k, auxillaryArr[i]])
        mainArray[k++] = auxillaryArr[i++]
    }

    while(j<= endIdx){
        animations.push([j,j])
        animations.push([j,j])
        animations.push([k, auxillaryArr[j]])
        mainArray[k++] = auxillaryArr[j++]
    }
}







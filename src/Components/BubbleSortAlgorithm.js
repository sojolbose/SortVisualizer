export function bubbleSortAlgorithm(newArr){
    const animations = [];
    const auxArr = newArr.slice();
    bubbleSortHelper(animations, newArr)
    return animations;
}

function bubbleSortHelper(animations, mainArr){
    const length = mainArr.length-1;
    for(let i =0; i< length; i++){
        for(let j=0; j<length-i;j++){
            animations.push([j,j+1])
            animations.push([j,j+1])
            if(mainArr[j]>mainArr[j+1]){
                animations.push([j, j+1])
                let temp = mainArr[j]
                mainArr[j] = mainArr[j+1]
                mainArr[j+1] = temp
            }else{
                animations.push(["no swap"])
            }
        }
    }

}
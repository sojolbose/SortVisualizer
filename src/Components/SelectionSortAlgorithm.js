export function SelectionSortAlgorithm(newArr){
    const animations = [];
    SelectionSortHelper(animations, newArr)
    return animations;

}

function SelectionSortHelper(animations, mainArr){
    console.log(mainArr)
    const length= mainArr.length;
    for(let i =0; i<length; i++){
        let index = i;
        let min = mainArr[index];
        console.log(min)
        animations.push(["min",index])
        for(let j =i+1;j<length; j++){
            animations.push(["comp", j,index])
            animations.push(["comp-back", j,index])
            if(mainArr[j]<min){
                const previous=index;
                min = mainArr[j]
                index = j;
                animations.push(["min-swap", previous, index])
            }
            
        }
        let temp = mainArr[i];
        mainArr[i] = min;
        mainArr[index] = temp;
        animations.push(["value-swap", index,i])
    }
    console.log(mainArr)
}   
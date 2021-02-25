export function quickSortAlgorithm(array){
    const animations = [];
    var l= 0;
    var h= array.length;
    quickSortAlgorithmHelper(animations , array, l , h)
    return animations;

}



function quickSortAlgorithmHelper(animations, array,l ,h){
    if(l<h){
      var partition_index= partition(animations, array,l,h)
        quickSortAlgorithmHelper(animations, array,l,partition_index);
        quickSortAlgorithmHelper(animations, array,partition_index+1, h)
        return array;
    }
}
    
function partition(animations, array, l,h){
    var pivot= array[l];
    animations.push(["pivot", l])
    var i=l;
    var j=h;
    while(i<j){
        // do{
        //     i++;
        //     animations.push(["comp",i])
        //     animations.push(["comp-back", i])
        // }while(array[i]<=pivot)
        // animations.push(["comp",i])
        // do{
        //     j--;
        //     animations.push(["comp",j])
        //     animations.push(["comp-back", j])
        // }while(array[j]>pivot)
        // do{
        //     console.log("inside loop")
        //     if(array[i]<=pivot){
        //         i++;
        //     }
        //     if(array[j]>pivot){
        //         j--;
        //     }
        //     animations.push(["comp", i, j]);
        //     animations.push(["comp-back", i, j])
        // }while(array[i]<=pivot||array[j]>pivot)


        i++;
        j--;

        while(array[i]<=pivot||array[j]>pivot){
            // console.log("inside loop")
            if(i>j || i>=array.length-1){
                break;
            }
            if(array[i]<=pivot){
                i++;
            }
            if(array[j]>pivot){
                j--;
            }
            animations.push(["comp", i, j]);
            animations.push(["comp-back", i, j])
        }


        // animations.push(["comp",j])
        if(i<j){
            animations.push(["comp-swap",i,j])
            var temp=array[i];
            array[i]= array[j];
            array[j]= temp;
        }
    }
    animations.push(["pivot-swap",l,j])
    var temp1= array[l];
    array[l]= array[j];
    array[j]= temp1;
    return j;
}


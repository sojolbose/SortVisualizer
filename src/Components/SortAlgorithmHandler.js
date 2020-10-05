import {quickSortAlgorithm} from "./QuickSortAlgorithm"




export function QuickSortHandler(array, animation_speed){
    const animations = quickSortAlgorithm(array)
       console.log(animations)
       const ANIMATION_SPEED= animation_speed;
       const pivotColor = this.state.pivotColor;
       const compOneColor = this.state.compOneColor;
       const compTwoColor = this.state.compTwoColor;
       const barColor = this.state.barColor;
       const graphBars = document.getElementsByClassName('graphBar')
       for(let i =0; i<animations.length; i++){
        const animationElement = animations[i]
        setTimeout(()=>{
            if(animationElement[0] === "pivot"){
                const barIdx = animationElement[1]
                const barStyle = graphBars[barIdx].style;
                barStyle.backgroundColor = pivotColor;
            }
            // else if(animationElement[0] === "comp"){
            //     const barIdx = animationElement[1]
            //     const barStyle = graphBars[barIdx].style;
            //     barStyle.backgroundColor = compColor;
            // }
            // else if(animationElement[0] === "comp-back"){
            //     const barIdx = animationElement[1]
            //     const barStyle = graphBars[barIdx].style;
            //     barStyle.backgroundColor = barColor;    
            // }
            else if(animationElement[0] === "comp"){
                const barOneIdx= animationElement[1];
                const barTwoIdx= animationElement[2];
                const barOneStyle= graphBars[barOneIdx].style;
                const barTwoStyle= graphBars[barTwoIdx].style;
                barOneStyle.backgroundColor = compOneColor;
                barTwoStyle.backgroundColor = compTwoColor
            }
            else if(animationElement[0] === "comp-back"){
                const barOneIdx= animationElement[1];
                const barTwoIdx= animationElement[2];
                const barOneStyle= graphBars[barOneIdx].style;
                const barTwoStyle= graphBars[barTwoIdx].style;
                barOneStyle.backgroundColor = barColor;
                barTwoStyle.backgroundColor = barColor;
            }
            else if(animationElement[0] === "comp-swap"){
                const barOneIdx= animationElement[1];
                const barTwoIdx= animationElement[2];
                const barOneStyle= graphBars[barOneIdx].style;
                const barTwoStyle= graphBars[barTwoIdx].style;
                const barOneHeight= barOneStyle.height;
                const barTwoHeight= barTwoStyle.height;
                barOneStyle.height= barTwoHeight;
                barTwoStyle.height= barOneHeight;
            }
            else if(animationElement[0] === "pivot-swap"){
                const barOneIdx= animationElement[1];
                const barTwoIdx= animationElement[2];
                const barOneStyle= graphBars[barOneIdx].style;
                const barTwoStyle= graphBars[barTwoIdx].style;
                const barOneHeight= barOneStyle.height;
                const barTwoHeight= barTwoStyle.height;
                barOneStyle.height= barTwoHeight;
                barTwoStyle.height= barOneHeight;
                barOneStyle.backgroundColor= barColor;
                // barTwoStyle.backgroundColor="green";
            }
        }, i*ANIMATION_SPEED)
       }
}
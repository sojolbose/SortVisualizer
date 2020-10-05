import React from "react"
import "./Homepage.css"
import SortVisualizer from "./SortVisualizer"
import {MergeSortAlgorithm} from "./MergeSortAlgorithm"
import {bubbleSortAlgorithm} from "./BubbleSortAlgorithm"
import {SelectionSortAlgorithm} from "./SelectionSortAlgorithm"
import {quickSortAlgorithm} from "./QuickSortAlgorithm"
import {QuickSortHandler} from "./SortAlgorithmHandler"

class Homepage extends React.Component{

    constructor(){
        super();
        this.state = {
            dataSet : [],
            dataSize : 100,
            barColor:"#cbff8c",
            finalColor:"#15d9d5",
            compColor: "#4E0110",
            compOneColor: "#4E0110",
            compTwoColor: "#881600",
            pivotColor: "#218380",
            minColor: "#313638",
            ANIMATION_SPEED_STATE:10,
            reset_array_key: false,
            active_algorithm:"",
            timeOutArray:[]
        }
        this.resetArray = this.resetArray.bind(this)
        this.handleMergeSort = this.handleMergeSort.bind(this)
        this.handleBubbleSort = this.handleBubbleSort.bind(this)
        this.handleSelectionSort = this.handleSelectionSort.bind(this)
        this.handleQuickSort = this.handleQuickSort.bind(this)
        this.resetColor = this.resetColor.bind(this)
        this.timeOutArrayPopulate = this.timeOutArrayPopulate.bind(this)
        this.timeOutRemover = this.timeOutRemover.bind(this)
        this.dataSizeHandler = this.dataSizeHandler.bind(this)
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        if(this.state.timeOutArray.length!==0){
            for(let i=0; i<this.state.timeOutArray.length;i++){
                clearTimeout(this.state.timeOutArray[i])
            }
        }
        this.setState({
            reset_array_key:true,
            timeOutArray:[]
        }, ()=>{
            console.log("state updated")
            var newArr = [];
            for(var i = 0; i<=this.state.dataSize; i++ ){
                newArr.push(randomIntFromInterval(10,850))
            }
            this.setState({
                dataSet: newArr,
                active_algorithm:""
            }, ()=>{
                const graphBars = document.getElementsByClassName('graphBar')
                for(let i =0; i<graphBars.length; i++){
                    graphBars[i].style.backgroundColor= this.state.barColor;
                }
                console.log(this.state)
            })
        })
    }

    resetColor(){
        const graphBars = document.getElementsByClassName('graphBar')
        for(let i =0; i<graphBars.length; i++){
            graphBars[i].style.backgroundColor= this.state.barColor;
        }
    }

    timeOutArrayPopulate(timeOut){
        let array = this.state.timeOutArray;
        array.push(timeOut);
        console.log(array)
        this.setState({
            timeOutArray:array
        })
    }

    timeOutRemover(timeOutArray){
        if(timeOutArray.length===0){
            return;
        }
        for(let i =0; i<timeOutArray.length; i++){
            clearTimeout(timeOutArray[i])
        }
    
    }

    handleQuickSort(){
        if(this.state.active_algorithm!==""){
            return;
        }
       this.setState({
           reset_array_key:false,
           active_algorithm:"quick sort"
       },()=>{
           console.log(this.state)
           console.log("quick sort running")
        const animations = quickSortAlgorithm(this.state.dataSet)
        // console.log(animations)
        const ANIMATION_SPEED= this.state.ANIMATION_SPEED_STATE;
        const pivotColor = this.state.pivotColor;
        const compOneColor = this.state.compOneColor;
        const compTwoColor = this.state.compTwoColor;
        const barColor = this.state.barColor;
        const graphBars = document.getElementsByClassName('graphBar')
        const timeOutArray=[];
        for(let i =0; i<=animations.length; i++){
            // console.log(this.state.reset_array_key)
            // if(this.state.reset_array_key===true){
            //     break;
            // }
         const animationElement = animations[i];
        //  let timeOut;
         let timeOut = setTimeout(()=>{
            //  console.log(i)
            //  console.log(this.state.reset_array_key)
            if(this.state.reset_array_key===true){
                this.timeOutRemover(timeOutArray);
                return;
            }
            if(i===animations.length){
                console.log("final color change")
                const graphBars = document.getElementsByClassName('graphBar')
                for(let j =0; j<graphBars.length; j++){
                    graphBars[j].style.backgroundColor= this.state.finalColor;
                }
                console.log(timeOutArray)
                this.setState({
                    active_algorithm:""
                },()=>{
                    return;
                })  
                return;
            }
             if(animationElement[0] === "pivot"){
                 const barIdx = animationElement[1]
                 const barStyle = graphBars[barIdx].style;
                 barStyle.backgroundColor = pivotColor;
             }
        
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
        //  this.timeOutArrayPopulate(timeOut);
        timeOutArray.push(timeOut);
        }
       })

    //    this.setState({
    //        active_algorithm:""
    //    },()=>{
    //        return;
    //    })  
    }

    handleSelectionSort(){
        if(this.state.active_algorithm!==""){
            return;
        }   
        this.setState({
            reset_array_key:false,
            active_algorithm:"selection sort"
        }, ()=>{
            console.log("selection sort running")
            const ANIMATION_SPEED=this.state.ANIMATION_SPEED_STATE;
        const minColor = this.state.minColor;
        const barColor = this.state.barColor;
        const compColor = this.state.compColor;
        const animations = SelectionSortAlgorithm(this.state.dataSet)
        const graphBars = document.getElementsByClassName('graphBar');
        // console.log(animations)
        const timeOutArray=[];
        for(let i=0; i<=animations.length; i++){
            const animationElement = animations[i]
            // console.log(animationElement)    
            let timeOut;

            timeOut = setTimeout(()=>{
                if(this.state.reset_array_key===true){
                    this.timeOutRemover(timeOutArray);
                    return;
                }
                if(i===animations.length){
                    console.log("final color change")
                    const graphBars = document.getElementsByClassName('graphBar')
                    for(let j =0; j<graphBars.length; j++){
                        graphBars[j].style.backgroundColor= this.state.finalColor;
                    }
                    this.setState({
                        active_algorithm:""
                    },()=>{
                        return;
                    })
                    return;
                }
                if(animationElement[0] === "min-swap"){
                    // console.log("Color is Changing")
                    const barOneIdx= animationElement[1];
                    const barTwoIdx= animationElement[2];
                    const barOneStyle= graphBars[barOneIdx].style;
                    const barTwoStyle= graphBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = barColor;
                    barTwoStyle.backgroundColor= minColor;
                }
                else if(animationElement[0] ==="comp"){
                    const barOneIdx= animationElement[1];
                    const barTwoIdx= animationElement[2];
                    const barOneStyle= graphBars[barOneIdx].style;
                    const barTwoStyle= graphBars[barTwoIdx].style;
                    barOneStyle.backgroundColor= compColor;
                    barTwoStyle.backgroundColor= minColor;                   
                }
                else if(animationElement[0] ==="comp-back"){
                    const barOneIdx= animationElement[1];
                    const barTwoIdx= animationElement[2];
                    const barOneStyle= graphBars[barOneIdx].style;
                    const barTwoStyle= graphBars[barTwoIdx].style;
                    barOneStyle.backgroundColor= barColor;
                    barTwoStyle.backgroundColor= barColor;      
                }
                else if(animationElement[0] ==="value-swap"){
                    const barOneIdx= animationElement[1];
                    const barTwoIdx= animationElement[2];
                    const barOneStyle= graphBars[barOneIdx].style;
                    const barTwoStyle= graphBars[barTwoIdx].style;
                    const barOneHeight= barOneStyle.height;
                    const barTwoHeight= barTwoStyle.height;
                    // console.log(barOneHeight)
                    // console.log(barTwoHeight)
                    barOneStyle.height= barTwoHeight;
                    barTwoStyle.height= barOneHeight;
                    
                }
            },i*ANIMATION_SPEED)
            timeOutArray.push(timeOut)
            

        }
        })
        // this.setState({
        //     active_algorithm:""
        // },()=>{
        //     return;
        // })
    }

    handleMergeSort(){
        if(this.state.active_algorithm!==""){
            return;
        }   
        this.setState({
            reset_array_key:false,
            active_algorithm:"merge sort"
        }, ()=>{
            console.log("running merge sort")
            const ANIMATION_SPEED= this.state.ANIMATION_SPEED_STATE;
            console.log("homepage merge sort called")
            const animations = MergeSortAlgorithm(this.state.dataSet)
            // console.log(animations)
            const graphBars = document.getElementsByClassName('graphBar')
            const timeOutArray=[];
            
            for( let i = 0; i<= animations.length; i++){
            // if(this.state.reset_array_key){
            //     break;
            // }
            
            let timeOut;
            let timeOut1;
            let timeOut2;
            const isColorChange = i%3 !== 2;
            timeOut = setTimeout(()=>{
                console.log(i)

                if(this.state.reset_array_key===true){
                    this.timeOutRemover(timeOutArray);
                    return;
                }
                if(i===animations.length){
                    console.log("final color change")
                    const graphBars = document.getElementsByClassName('graphBar')
                    for(let j =0; j<graphBars.length; j++){
                        graphBars[j].style.backgroundColor= this.state.finalColor;
                    }
                    this.setState({
                        active_algorithm:""
                    },()=>{
                        return;
                    })
                    return;
                }
                
                if( isColorChange){
                    const [barOneIdx, barTwoIdx] = animations[i]
                    const barOneStyle = graphBars[barOneIdx].style;
                    // console.log(barOneStyle)
                    const barTwoStyle = graphBars[barTwoIdx].style;
                    const color = i%3 === 0 ? this.state.compColor: this.state.barColor
                    
                    // timeOut1 = setTimeout(() =>{
                    //     if(this.state.reset_array_key===true){
                    //         clearTimeout(timeOut1)
                    //         return;
                    //     }
                    //     if(i===animations.length){
                    //         console.log("final color change")
                    //         const graphBars = document.getElementsByClassName('graphBar')
                    //         for(let j =0; j<graphBars.length; j++){
                    //             graphBars[j].style.backgroundColor= this.state.finalColor;
                    //         }
                    //         return;
                    //     }
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                }   
                
                else{
                    const[barOneIdx, newHeight] = animations[i]
                    const barOneStyle = graphBars[barOneIdx].style;
                    // console.log(barOneStyle)
                    barOneStyle.height = `${newHeight/10}%`;
                } 
                
                
            },i*ANIMATION_SPEED )
            timeOutArray.push(timeOut)

            }
        



        //     if( isColorChange){
        //         const [barOneIdx, barTwoIdx] = animations[i]
        //         const barOneStyle = graphBars[barOneIdx].style;
        //         // console.log(barOneStyle)
        //         const barTwoStyle = graphBars[barTwoIdx].style;
        //         const color = i%3 === 0 ? this.state.compColor: this.state.barColor
                
        //         timeOut1 = setTimeout(() =>{
        //             if(this.state.reset_array_key===true){
        //                 clearTimeout(timeOut1)
        //                 return;
        //             }
        //             if(i===animations.length){
        //                 console.log("final color change")
        //                 const graphBars = document.getElementsByClassName('graphBar')
        //                 for(let j =0; j<graphBars.length; j++){
        //                     graphBars[j].style.backgroundColor= this.state.finalColor;
        //                 }
        //                 return;
        //             }
        //             barOneStyle.backgroundColor = color;
        //             barTwoStyle.backgroundColor = color;
        //         }, i*ANIMATION_SPEED)
        //     }
        //     else{
        //         timeOut2 = setTimeout(() =>{
        //             if(this.state.reset_array_key===true){
        //                 clearTimeout(timeOut2)
        //                 return;
        //             }
        //             if(i==animations.length){
        //                 console.log("final color change")
        //                 const graphBars = document.getElementsByClassName('graphBar')
        //                 for(let j =0; j<graphBars.length; j++){
        //                     graphBars[j].style.backgroundColor= this.state.finalColor;
        //                 }
        //                 return;
        //             }
        //             const[barOneIdx, newHeight] = animations[i]
        //             const barOneStyle = graphBars[barOneIdx].style;
        //             // console.log(barOneStyle)
        //             barOneStyle.height = `${newHeight/10}%`;
        //         }, i*ANIMATION_SPEED)
        //     }
        // }
        // })
       
        })  
        // this.setState({
        //     active_algorithm:""
        // },()=>{
        //     return;
        // })
    }

    handleBubbleSort(){
        if(this.state.active_algorithm!==""){
            return;
        }   
        this.setState({
            reset_array_key:false,
            active_algorithm:"bubble sort"
        },() =>{
            console.log("running bubble sort")
            const ANIMATION_SPEED= this.state.ANIMATION_SPEED_STATE;
            const animations = bubbleSortAlgorithm(this.state.dataSet)
            // console.log(animations)
            const timeOutArray =[];
            for( let i = 0; i<=animations.length; i++){
                const graphBars = document.getElementsByClassName("graphBar")
                const isColorChange = i%3 !== 2;
                // let timeOut1;
                // let timeOut2;
                let timeOut;

                timeOut = setTimeout(()=>{
                    if(this.state.reset_array_key===true){
                        this.timeOutRemover(timeOutArray)
                        return;
                    }
                    if(i===animations.length){
                        console.log("final color change")
                        const graphBars = document.getElementsByClassName('graphBar')
                        for(let j =0; j<graphBars.length; j++){
                            graphBars[j].style.backgroundColor= this.state.finalColor;
                        }
                        this.setState({
                            active_algorithm:""
                        },()=>{
                            return;
                        })  
                        return;
                    }

                    if( isColorChange){
                        const [barOneIdx, barTwoIdx] = animations[i]
                        // console.log(barOneIdx+" "+barTwoIdx)
                        const barOneStyle = graphBars[barOneIdx].style;
                        // console.log(barOneStyle)
                        const barTwoStyle = graphBars[barTwoIdx].style;
                        const color = i%3 === 0 ? this.state.compColor: this.state.barColor
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }
                    else{
                        // console.log(i)
                        if(animations[i][0] !== "no swap"){
                            const[barOneIdx, barTwoIdx] = animations[i]
                            const barOneHeight = graphBars[barOneIdx].style.height;
                            const barTwoHeight = graphBars[barTwoIdx].style.height;
                            const barOneStyle = graphBars[barOneIdx].style;
                            const barTwoStyle = graphBars[barTwoIdx].style;
                            barOneStyle.height = barTwoHeight;
                            barTwoStyle.height = barOneHeight;
                        }
                    }
                }, i*ANIMATION_SPEED)
                timeOutArray.push(timeOut)
            }
        })
        // this.setState({
        //     active_algorithm:""
        // },()=>{
        //     return;
        // })  
    }

    dataSizeHandler(e){
        e.preventDefault();
        const value = e.target.name;
        console.log("datasize handler")
        console.log(value)
        if(this.state.active_algorithm!==""){
            return;
        }
        if(value ==="4"){
            console.log("changing to light speed")
            this.setState({
                dataSize:150,
                ANIMATION_SPEED_STATE:0.5
            }, ()=>{this.resetArray()})
        }

        if(value ==="3"){
            this.setState({
                dataSize:100,
                ANIMATION_SPEED_STATE:10
            }, ()=>{this.resetArray()})
        }

        if(value ==="2"){
            this.setState({
                dataSize:50,
                ANIMATION_SPEED_STATE:25
            }, ()=>{this.resetArray()})
        }

        if(value ==="1"){
            this.setState({
                dataSize:25,
                ANIMATION_SPEED_STATE:100
            }, ()=>{this.resetArray()})
        }
    }



    render(){
        console.log("rerendering...")
        const elements = this.state.dataSet.map((height, idx)=>{
            let height1 = height/10
            return(
                    <div className="graphBar" key={idx} style={{"height":`${height1}%`, "width":`${65/this.state.dataSize}%`}}></div>
                
            )
        })
        return(
            <div className="main_container">
                <h1>SORTING VISUALIZER</h1>
                {/* <nav className="navbar navbar-expand-sm bg-light navbar-light"> */}
                <nav>
                    {/* <ul className="navbar-nav"> */}
                    <ul>
                        <li>
                            {/* <button className="nav-link btn btn-light" onClick={this.resetArray}>Generate new Array</button> */}
                            <a onClick={this.resetArray}>Generate new Array</a>
                        </li>
                        <li>
                            <a>Dataset size</a>
                            <span className="dropBottom"></span>
                            <ul>
                                <li><a name="4" onClick={this.dataSizeHandler}>LightSpeed fast</a></li>
                                <li><a name="3" onClick={this.dataSizeHandler}>Normal</a></li>
                                <li><a name="2" onClick={this.dataSizeHandler}>Slow</a></li>
                                <li><a name="1" onClick={this.dataSizeHandler}>Turtle Speed</a></li>
                            </ul>
                        </li>
                        <li>
                            <a onClick={this.handleBubbleSort}>Bubble Sort</a>
                            {/* <button className="nav-link btn btn-light" onClick={this.handleBubbleSort}>Bubble Sort</button> */}
                        </li>
                        <li>
                            <a onClick={this.handleMergeSort}>Merge Sort</a>
                        </li>
                        <li>
                        <a onClick={this.handleSelectionSort}>Selection Sort</a>
                        </li>
                        <li>
                            <a onClick={this.handleQuickSort}>Quick Sort</a>
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link btn btn-light" onClick={this.handleSelectionSort}>Selection Sort</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-light" onClick={this.handleMergeSort}>Merge Sort</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-light" onClick={this.handleQuickSort}>Quick Sort</button>
                        </li> */}
                    </ul>
                </nav>
                
                <br></br>

                <div className="graph">
                {elements}
                </div>
                

            </div>
        )
    }
}

export default Homepage


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function QuickSortTest(){
    for(var i=0; i<100; i++){
        var testArray = [];
        for(var j=0; j<100; j++){
            testArray.push(randomIntFromInterval(10,500))
        }
        var l= 0;
        var h= testArray.length;
        var quickSortedArray= quickSortAlgorithm(testArray, l , h)
        var sortedArray = testArray.sort()
        if(sortedArray.length!== quickSortedArray.length){
            console.log("false")
            return;
        }
        for(var k = 0; k<quickSortedArray.length; k++){
            if(quickSortedArray[k]!==sortedArray[k]){
                console.log("false")
                return;
            }
        }
        console.log("true")
        return;
    }
}
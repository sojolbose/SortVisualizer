import React from "react"
import "./SortVisualizer.css"

class SortVisualizer extends React.Component{
    render(){
        const elements = this.props.dataSet.map((height)=>{
            return(
                <div>
                    <div>{height}</div>
                    <div className="graphBar" style={{"width":"5px", "height":height}}></div>
                </div>
                
            )
        })
        return(
            <div className="graph">
                {elements}
            </div>
        )
    }
}

export default SortVisualizer

import { Fragment, useEffect,useState } from "react";
import classes from "./GraphPage.module.css"

const GraphPage = () =>{
    return (
        <Fragment>
            <div className= {classes.image}>

                <img src={require ('../../images/plain_graph.jpg') } className={classes.element}/>
                
            </div>
        </Fragment>
    )
}

export default GraphPage
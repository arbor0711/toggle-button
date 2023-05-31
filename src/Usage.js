import React , {useState, useContext, useEffect} from 'react'
import {switch} from '../switch'

const ToggleContext = React.createContext

function Toggle(props){
    
    const [on, setOn]= useState(false)
    
    const toggle = ()=>setOn(oldOn => !oldOn )
    
    useEffect(()=>{
        props.onToggle(on)
    }, [on])

    return (
        <ToggleContext.provider value={{on, toggle}}>
            {props.children}
        </ToggleContext.provider>
    )
} 

function ToggleConsumer(props) => {
    return (
        <ToggleContext.Consumer {...props}>
            {context =>{
                if (!context){
                    throw new Error (
                        'Toggle compound components cannot be rendered outside the toggle component'
                    )
                }
            }}
        </ToggleContext.Consumer>
    )
}


Toggle.On = ({children})=>{
    const {on}= useContext(ToggleContext)
    return on ? children : null
}


Toggle.Off = ({children})=>{
    const {on}= useContext(ToggleContext)
    return on ? null : children
}

Toggle.Button = props =>{
    const {on , toggle} = useContext(ToggleContext)
    return  <Switch on={on} onClick={toggle} {...props} />
}


function Usage({
    onToggle = (...args) => console.log('onToggle', ...arguments),
}){


return (
    <div>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <div>
            <Toggle.Button />
        </div>
    </div>
)
}

Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}

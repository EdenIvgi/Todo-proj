import { ToggleButton } from "../cmps/ToggleButton.jsx"

const { useState } = React

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section style={{marginBlock:'20px'}} className="home">
            <ToggleButton val={isOn} setVal={setIsOn} />
            <h1>Todo's R Us!</h1>
            {isOn && <img src="../assets/img/todo.png" alt="" />}
        </section>
    )
}
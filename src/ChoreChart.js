import { useState, useEffect } from 'react'
import ChoreForm from './ChoreForm'
import Chores from './Chores'

const ChoreChart = () => {

    const [chores, setChores] = useState([])
    const [toggleForm, setToggleForm] = useState(false)

    useEffect(()=> {
        const getChores = async () => {
            const choresFromServer = await fetchChores()
            setChores(choresFromServer)
        }
        getChores()
    },[])

    const fetchChores = async () => {
       const res = await fetch('http://localhost:5000/chores')
       const data = res.json()
       return data
    }

    const addChore = async (chore) => {
        const res = await fetch('http://localhost:5000/chores', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chore)
        })
        const data = await res.json()
        setChores([...chores, data])
    }

    const deleteChore = async (id) => {
        await fetch(`http://localhost:5000/chores/${id}`, {
            method: "DELETE"
        })
        setChores(chores.filter((chore) => chore.id !== id))
    }

    const fetchChore = async (id) => {
        const res = await fetch(`http://localhost:5000/chores/${id}`)
        const data = await res.json()

        return data
    }

    const toggleReminder = async (id) => {
        const choreToToggle = await fetchChore(id)
        const updatedChore = {...choreToToggle, reminder: !choreToToggle.reminder}

        const res = await fetch(`http://localhost:5000/chores/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(updatedChore)
        })

        const data = await res.json()

        setChores(chores.map((chore) => chore.id === id ? {...chore, reminder: !data.reminder} : chore))

    }

    return (
        <>
            <h1>My Chores</h1>
            <input type="button" value={toggleForm ? "close form" : "add chore"} onClick={() => setToggleForm(!toggleForm)} />
            {toggleForm && <ChoreForm addChore={addChore} />}
            <Chores chores={chores} deleteChore={deleteChore} toggleReminder={toggleReminder}/>
        </>
    )
}

export default ChoreChart

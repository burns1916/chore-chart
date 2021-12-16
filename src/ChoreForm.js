import { useState } from "react"

const ChoreForm = ({ addChore }) => {

    const [name, setName] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!name || !day) {
            alert("Please set name and day")
        } else {
            addChore({ name, day, reminder })
        }
        setName("")
        setDay("")
        setReminder(false)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="day">Day: </label>
                    <input type="text" name="day" value={day} onChange={(e) => setDay(e.target.value)} />
                <label htmlFor="reminder">Reminder: </label>
                    <input type="checkbox" value={reminder} checked={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}

export default ChoreForm

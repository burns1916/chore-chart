
const Chores = ({ chores, deleteChore, toggleReminder }) => {
    return (
        <>   
        {chores.map((chore) => 
        <div key={chore.id} onDoubleClick={() => toggleReminder(chore.id)} style={chore.reminder ? {backgroundColor: "blue"} : {backgroundColor: "red"}}>
        <li >
            {chore.name} on {chore.day} 
            <input 
                type="button" 
                value="delete" 
                onClick={() => {deleteChore(chore.id)}} />
            </li> 
            </div>)}
        </>
    )
}

export default Chores

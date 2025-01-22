import { useMutation } from "@apollo/client";
import { Set_BIRTH_YEAR, ALL_AUTHORS } from "../queries";    
import { useState } from "react";
import Select from 'react-select';

const SetBirthYear = ({authors}) => {
    const [name, setName] = useState("");
    const [born, setBorn] = useState("");
    
    const [setBirthYear] = useMutation(Set_BIRTH_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });
    
    const submit = (event) => {
        event.preventDefault();
        setBirthYear({ variables: { name: name.value, born: parseInt(born) } });
    
        setName("");
        setBorn("");
    };
    
    return (
        <div>
        <h2>Set birth year</h2>
        <form onSubmit={submit}>
            <div>
            name
            <Select
                defaultValue={name}
                onChange={setName}
                options={authors.map(a => ({value: a.name, label: a.name}))}
            />
            </div>
            <div>
            born
            <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
            />
            </div>
            <button type="submit">update author</button>
        </form>
        </div>
    );
};

export default SetBirthYear;
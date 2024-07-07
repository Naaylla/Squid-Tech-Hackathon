import React, { useState } from "react";
import axios from "axios"

export default function Form() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/login", { // change the port depends on port chosen on backend
                email, password
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (

        <div>
            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Mot de passe" />
                <button type="submit">Connexion</button>
            </form>
        </div>
    )
}
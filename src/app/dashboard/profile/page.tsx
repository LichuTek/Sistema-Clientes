"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

function ProfilePage() {
    const {data:session,status} = useSession()
    console.log(session,status)
    return (
        <div>
            <h1>Profile</h1>
            <pre>
                {JSON.stringify({
                    session,
                    status
                },null, 2)}
            </pre>
            <button onClick={()=>{
                signOut()
            }}>Logout</button>
        </div>
    )
}

export default ProfilePage
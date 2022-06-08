import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import users from './api/users'


export default function Home() {
  return (
    <>
      <div className="home_container">

          <div className="navbar">
              <div>
                <h1>Header</h1>
              </div>

              <div>
                <Link href='/login'><button>Login</button></Link>
                <Link href='/signup'><button>Register</button></Link>

              </div>
          </div>

          <div className="card_container">
            {
              users.map((data,index)=>{
                return(
                    <div className="card" key={index} >
                      <div>
                        <img src='/profile.png'></img>
                      </div>
                      <div>
                        <h3><span>Name</span> : {data.name}</h3><br />
                        <h3><span>Email</span> : {data.email}</h3><br />
                        <h3><span>Contact</span> : {data.contact}</h3><br />
                        <h3><span>DOB</span> : {data.dateofbirth}</h3><br />
                        <h3><span>Address</span> : {data.address}</h3>
                      </div>
                    </div>
                )
              })
            }
              
          </div>

      </div>
    </>
  )
}

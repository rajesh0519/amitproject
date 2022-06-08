import users from './api/users'
import { useState , useEffect , useContext } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import Link from 'next/link'

import AppContext from './../StateContext/appContext'


export default function Dashboard(){

    const {curUser , setCurUser} = useContext(AppContext);
    const [user, setUser] = useState({
        contact: "",dateofbirth:"",address: ""
    })

    let name , value ;

    const handleInputs = (e) => {
        
        name=e.target.name;
        value=e.target.value;
        
        if(e.target.name==="email"){
            const email = e.target.value.toLowerCase();
            setUser({...user , [name]:email});
        }
        else{
            setUser({...user , [name]:value});
        }
    }

    const updateData = () => {

        const currentUser = users.find(data=>{
            if(data.email == curUser.email){
                return data;
            }
        } )

        const { contact , dateofbirth , address} = user;

        if(currentUser && contact && dateofbirth && address){
            currentUser.contact = contact;
            currentUser.dateofbirth = dateofbirth;
            currentUser.address = address;
            showNotification("SUCCESSFULL!" , "Update Successfull" , "success")
    
        }else{
            showNotification("UNSUCCESSFULL!" , "Plz Fill All The Details !" , "danger")

        }
        

    }

    const showNotification = (title , message , type) => {
       
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "bottom-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
              showIcon:true
            },
          });

    }

    console.log(curUser);
    
    return(
        <>
            <div className="dashboard_container">

            <ReactNotifications />

                <div className="dash_nav">
                    <Link href='/'><button>Back To Home</button></Link>
                    <h1>Dashboard</h1>

                </div>

                <div className="dashboard_form">

                    <div>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Full Name" value={curUser ? curUser.name : ""} disabled></input>
                    </div>
                    
                    <div>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Full Name" value={curUser ? curUser.email : ""} disabled></input>
                    </div>

                    <div>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Full Name" value={curUser ? curUser.password : ""} disabled></input>
                    </div>

                    <div>
                    <label>Contact</label>
                    <input type="tel" 
                    onChange={e=>{handleInputs(e)}}
                    name="contact" placeholder="Contact"></input>
                    </div>

                    <div>
                    <label>Date of birth</label>
                    <input type="date" 
                    onChange={e=>{handleInputs(e)}}
                    name="dateofbirth" placeholder="DOB"></input>
                    </div>

                    <div>
                    <label>Address</label>
                    <textarea type="text" 
                    onChange={e=>{handleInputs(e)}}
                    name="address" placeholder="Address"></textarea>
                    </div>

                    <div>
                        <button onClick={updateData}>Update</button>
                    </div>

                </div>

                <div>
                    Footer
                </div>
            </div>
        </>
    )
} 
import {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { ReactNotifications, Store } from 'react-notifications-component'

import users from './api/users'


export default function Signup(){

    const [user, setUser] = useState({
        fullName: "",email:"",password: ""
    })

    const router = useRouter()

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

    const postData = () => {
        const { fullName , email , password } = user;

        if(fullName && email && password){

           const checkUser = users.find(data=>data.email == email)

            if(checkUser){
                showNotification("UNSUCCESSFULL!" , "Email Already Used !" , "warning")
            }else{
                const newUser = { 
                    name : fullName,
                    email : email,
                    password : password,
                }
    
                users.push(newUser);
                
                showNotification("SUCCESSFULL!" , "Registration Successfull" , "success")
    
                console.log(users);
            }
            
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

    return(
        <>
            <div className="login_container">

                <ReactNotifications />

                <div>
                <Link href="/"><button className="login_back_btn">Back To Home Page</button></Link>
                </div>

                <div className="login">

                    <div>
                        <img src="/favicon.ico" className="login_img"></img>
                    </div>

                    <div className="vl">
                        <span ></span>
                    </div>

                    <div className="login_form"> 
                        <div>
                            <h3>WELCOME</h3>
                            <hr />
                        </div>

                        <div >

                            <label>Full Name - </label> <br />
                            <input type="text" name="fullName"
                            value={user.fullName}
                            onChange={handleInputs}
                            placeholder="Full Name" ></input> 

                            <br />

                            <label>EMAIL - </label> <br />
                            <input type="email" name="email"
                            value={user.email}
                            onChange={handleInputs}
                            placeholder="example@gmail.com" ></input> 
                            
                            <br />

                            <label>PASSWORD - </label> <br />
                            <input type="password" name="password"
                            value={user.password}
                            onChange={handleInputs}
                            placeholder="min 6 characters long" ></input>

                            <br />

                        </div>

                        <div>
                        <button type="submit"
                        onClick={postData}
                        >Create Account</button>
                        
                        </div>
                    </div>    
                </div>

                <div className="div_a">
                  <Link href="/login"><a>Already have an account?</a></Link>  
                </div>

            </div>
        </>
    )
}
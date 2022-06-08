import Link from 'next/link';
import {useState , useEffect ,useContext} from 'react'
import { useRouter } from 'next/router'
import { ReactNotifications, Store } from 'react-notifications-component'
// import AppContext from './../StateContext/appContext'
import AppContext from './../StateContext/appContext'


import users from './api/users'

export default function Login(){

    const {curUser , setCurUser} = useContext(AppContext)

    const router = useRouter()

    // console.log(users);

    const [user, setUser] = useState({
        email:"",password: ""
    })

    const checkUser = () => {

        console.log(user.email);

       const email_checking = users.find(data=>{
       if(data.email == user.email){
        return data
       }
       })

       console.log(email_checking);

        if(email_checking){

            if(email_checking.password == user.password){
                setCurUser(email_checking)
              showNotification("SUCCESSFULL!" , "Login Successfull" , "success")
              setTimeout(()=>{router.push('/dashboard')}, 4000)
                
            }else{
                showNotification("UNSUCCESSFULL!" , "Incorrect Password" , "warning")
            }

        }
        else{
            showNotification("UNSUCCESSFULL!" , "Incorrect Email" , "warning")

        }

    }

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
                            <h3>LOGIN</h3>
                            <hr />
                        </div>

                        <div >
                            
                                
                            <label>EMAIL - </label> <br />
                            <input type="email" name="email" placeholder="example@gmail.com" 
                                onChange={handleInputs}
                            required ></input> 
                            
                            <br />

                            <label>PASSWORD - </label> <br />
                            <input type="password" name="password" placeholder="min 6 characters long" 
                                onChange={handleInputs}
                            required ></input>

                        </div>

                        <div>
                          <button type="submit" onClick={checkUser}>Login</button>
                        </div>
                       
                    </div>    
                </div>

                <div className="div_a">
                <Link href="/signup"><a>Do not have an account?</a></Link>

                </div>

              

            </div>
        </>
    )
}
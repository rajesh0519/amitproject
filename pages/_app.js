import '../styles/globals.css'
import '../styles/login.css'
import '../styles/dashboard.css'

import 'react-notifications-component/dist/theme.css'

import AppContext from './../StateContext/appContext'
import { useState , useEffect} from 'react'

function MyApp({ Component, pageProps }) {

const [ curUser , setCurUser ] = useState();

  return <AppContext.Provider value={{curUser:curUser,setCurUser:setCurUser }} > 
<Component {...pageProps} />
</AppContext.Provider>
}

export default MyApp

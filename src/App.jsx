import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/axios.service'
import { AuthContext } from './components/context/auth.context'
import { useContext, useEffect } from 'react'
import { Spin } from 'antd';

const App = () => {

  const { setUser, isLoading, setIsLoading } = useContext(AuthContext);


  useEffect(() => {
    fetchUserAccount();
  }, []);

  const delay = (miliSeconds) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, miliSeconds)
    })
  }

  const fetchUserAccount = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
      await delay(2000)
    }
    setIsLoading(false);
  }
  return (

    <>
      {isLoading === true ?
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: "translate(-50%, -50%)"

        }}>
          <Spin />
        </div>

        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App

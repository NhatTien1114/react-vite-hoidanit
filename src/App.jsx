import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/axios.service'
import { AuthContext } from './components/context/auth.context'
import { useContext, useEffect } from 'react'

const App = () => {

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserAccount();
  }, []);

  const fetchUserAccount = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

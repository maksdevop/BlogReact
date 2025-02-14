
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Articles from './components/Articles/Articles'
import { Spin , Alert  } from 'antd'
import MoreInfoPage from './components/more-info-page/MoreInfoPage'
import SignIn from './components/sign-in/SignIn'
import SignUp from './components/sign-up/SignUp'
import Header from './components/header/Header'
function App() {
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const [articles , setArticles] = useState([])
  const [isloading, setIsLoading] = useState(false); 
  const [isError , setIsError] = useState(false)
  const fetchArticles = ((page) => {
    setIsLoading(true)
    const offset = (page - 1) * 10;
    axios.get(`https://blog-platform.kata.academy/api/articles?limit=10&offset=${offset}`)
    .then(resp => {
      console.log(resp.data)
      setArticles(resp.data.articles)
      setTotalPages(resp.data.articlesCount)
      setIsLoading(false)
    })
    .catch(error => {
      setIsError(true)
      console.error(error)
    })
  })
  
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isError) {
    return (
      <div className='error'>
        <Alert  
        message="Ошибка"
        description={isError}
        type="error"
        showIcon/> 
      </div>
    )
  }
  if (isloading) {
    return (
      <div className='loading'>
         <Spin size='large' />
      </div>
    )
  }



  return (
    <>
      <Header />
      <Routes>
        {!isloading && <Route  path='/' element={<Articles articles={articles} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>}/>}
        <Route path='/articles/:slug' element={<MoreInfoPage />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        {/* <Route path='/profile ' element={<Profile />} />
        <Route path='*' element={<NotFound />} /> */}


      </Routes>
    </>
  )
}

export default App

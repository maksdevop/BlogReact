// src/App.js
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Articles from './components/Articles/Articles';
import MoreInfoPage from './components/more-info-page/MoreInfoPage';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Header from './components/header/Header';
import EditProfile from './components/edit-profile/EditProfile';
import CreateArticle from './components/create-new-article/CreateArticle';
import EditArticle from './components/edit-article/EditArticle';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:slug" element={<MoreInfoPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/createArticle" element={<CreateArticle />} />
        <Route path="/editArticle/:slug" element={<EditArticle />} />

      </Routes>
    </>
  );
}

export default App;

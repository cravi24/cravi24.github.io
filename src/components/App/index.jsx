import Header from '../Header';
import Footer from '../Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from '../../constants/Routes';
import Pages from '../../pages';

function App() {
  return (
    <div className="AppComponent">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Header />
        <Routes>
          <Route path={AppRoutes.AboutMe} element={<Pages.AboutMePage />} />
          <Route path={AppRoutes.ResumeBuilder} element={<Pages.ResumeBuilder />} />
          <Route path={AppRoutes.TechBlogs} element={<Pages.TechBlogsPage />} />
          <Route path={AppRoutes.PersonalBlogs} element={<Pages.PersonalBlogsPage />} />
          <Route path={AppRoutes.Home} element={<Pages.HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

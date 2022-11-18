import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loading } from './features/productListSlice'


function App() {
  const Loading = useSelector(loading)
  return (
    <Router>
      {
        Loading ?
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
          : <></>
      }
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/product/:slug' element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

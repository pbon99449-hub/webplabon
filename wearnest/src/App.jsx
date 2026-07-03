import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './component/layout/Layout'
import Aboutwearnest from './component/page/Aboutwearnest'
import Contact from './component/page/Contact'
import Home from './component/page/Home'
import Condition from './component/page/condition'
import PrivacyPolicy from './component/page/PrivacyPolicy'
import Return from './component/page/return'
import FaqDetail from './component/page/faqdetail'
import AllItem from './component/page/allitem'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Aboutwearnest />} />
          <Route path="condition" element={<Condition />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="return" element={<Return />} />
          <Route path="faqdetail" element={<FaqDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="allitem" element={<AllItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

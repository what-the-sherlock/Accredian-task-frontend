import logo from './assets/img/logo-accredian.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Steps } from "./components/Steps";
import { Footer } from "./components/Footer";
import ReferralBenefits from './components/ReferralBenefits';
import FAQComponent from './components/FAQComponent';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Steps />
      <ReferralBenefits/>
      <FAQComponent/>
      <Footer />
    </div>
  );
}

export default App;

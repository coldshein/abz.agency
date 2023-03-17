
import './App.scss';
import GetSection from './components/GetSection';
import Header from './components/Header';
import PostSection from './components/PostSection';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <main className="hero">
          <div className="hero-inner">
            <div className="mini-container">
              <h1 className="hero-title">Test assignment for front-end developer</h1>
              <p className="hero-subtitle">What defines a good front-end developer is one that has skilled knowledge
                of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web
                interfaces with accessibility in mind. They should also be excited to learn, as the world of
                Front-End Development keeps evolving.</p>
              <button className="yellow-btn center-btn">Sign up</button>
            </div>
          </div>
        </main>
      </div>
      <GetSection/>
      <PostSection/>
    </div >
    
  );
}

export default App;

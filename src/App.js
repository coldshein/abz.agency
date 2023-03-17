import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <div class="container">
          <div class="header-inner">
            <div class="logo-container">
              <img src="assets/logo.svg" alt="" />
            </div>
            <div class="header-menu">
              <button class="yellow-btn">Users</button>
              <button class="yellow-btn">Sign up</button>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <main class="hero">
          <div class="hero-inner">
            <div class="mini-container">
              <h1 class="hero-title">Test assignment for front-end developer</h1>
              <p class="hero-subtitle">What defines a good front-end developer is one that has skilled knowledge
                of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web
                interfaces with accessibility in mind. They should also be excited to learn, as the world of
                Front-End Development keeps evolving.</p>
              <button class="yellow-btn">Sign up</button>
            </div>
          </div>
        </main>
      </div>
      <section class="get-request">
        <div class="container">
            <div class="get-request__inner">
                <h1 class="section-title">Working with GET request</h1>
                <div class="get-block">
                    <div class="get-item">
                        <div class="item-img">
                            <img src="assets/photo-cover.svg" alt=""/>
                        </div>
                        <p class="item-name">Salvador Stewart Flynn Thomas Salva...</p>
                        <p class="item-position">asdasdasda</p>
                        <p class="item-email">Lorem ipsum dolor sit amet.</p>
                        <p class="item-phone">12312312</p>
                    </div>
                </div>
                <button class="yellow-btn">Show more</button>
            </div>
        </div>
    </section>
    <section class="post-request">
        <div class="post-requset__inner">
            <h1 class="section-title">Working with POST request</h1>
            <div class="mini-container">
                <div class="input-block">
                    <input type="text" name="name" id="name" placeholder=" "/>
                    <label for="name">Your name</label>
                </div>
                <div class="input-block">
                    <input type="text" name="email" id="email" placeholder=" "/>
                    <label for="email">Email</label>
                </div>
                <div class="input-block">
                    <input type="text" name="Phone" id="Phone" placeholder=" "/>
                    <label for="Phone">Phone</label>
                </div>
                <div class="radio-block">
                    <p>Select your position </p>
                    <div class="radio-item">
                        <input type="radio" name="1" id="1"/>
                        <label for="1">Frontend developer</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="1" id="2"/>
                        <label for="2">Backend developer</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="1" id="3"/>
                        <label for="3">Designer</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="1" id="4"/>
                        <label for="4">QA</label>
                    </div>
                </div>
                <div class="image-block">
                    <div class="file-upload btn btn-primary">
                        <span>BROWSE</span>
                        <input type="file" name="FileAttachment" id="FileAttachment" class="upload" />
                    </div>
                    <input type="text" id="fileuploadurl" readonly placeholder="Maximum file size is 1GB"/>
                </div>
            </div>
        </div>
    </section>
    </div >
    
  );
}

export default App;

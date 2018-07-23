import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <Link id="homepage" to='/' alt="Homepage">  Wave Jams  </Link>
            <Link id="librarypage" to='/library' alt="My Music Library">  ♪My Library♪  </Link>
          </nav>
          <h1 id="site-title">
            Wave Jams
            <img id="title-logo" src="https://images.vexels.com/media/users/3/143528/isolated/preview/cc4fe6d36794d677dbd7090cb2c9a9b2-eighth-note-music-by-vexels.png" alt="musical note logo" />
          </h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;

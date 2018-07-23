import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import '.././styles/library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className='library'>
       {
         this.state.albums.map( (album, index) =>
         <div className="clearfix" key={index}>
          <ul className="l-album">
            <li>
              <Link to={ `/album/${album.slug}`} key={index}>
                <img id="l-album-cover" src={album.albumCover} alt="cover" />
                <div id="test" className="l-album-title">{album.title}</div>
                <div className="l-album-artist">{album.artist}</div>
                <div className="l-album-songs-length">{album.songs.length} songs</div>
              </Link>
            </li>
          </ul>
         </div>
         )
       }
      </section>
    );
  }
}

export default Library;

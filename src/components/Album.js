import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0,
      isPlaying: false,
      isHovered: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = this.state.volume;

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex-1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    if (currentIndex+1 === this.state.album.songs.length) {
      let newIndex = 0;
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }
    else {
      let newIndex = Math.min(this.state.album.songs.length, currentIndex+1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  formatTime(time) {
    if (isNaN(time) || !typeof time === "number") {
      return "-:--";
    }
    const integerTime = Math.floor(time);
    const minTime = Math.floor(integerTime / 60);
    var timeDuration = minTime + ':';
    var leftoverSec = integerTime % 60;
    if (leftoverSec < 10) {
      timeDuration += "0"
    }
    return timeDuration + leftoverSec;
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  volumeStatus() {
    if (this.audioElement.volume === 0) {
      return "ion-md-volume-off";
    } else if (this.audioElement.volume < .5) {
      return "ion-md-volume-low";
    } else {
      return "ion-md-volume-high"
    }
  }

  handleMouseEnter(index) {
    this.setState({ isHovered: index+1});
  }

  handleMouseLeave() {
    this.setState({ isHovered: false});
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
          <tbody>
            <tr>
              <th></th>
              <th>Songs</th>
              <th>Duration</th>
            </tr>
            {
              this.state.album.songs.map((song, index) =>
               <tr key={index} className="song"
                onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => {this.handleMouseEnter(index)}}
                onMouseLeave={() => {this.handleMouseLeave()}}>
                <td>
                  <button id="playbtn" >
                    { (this.state.currentSong.title === song.title) ?
                      <span className={this.state.isPlaying && this.state.currentSong === song ? "ion-md-pause" : "ion-md-play"} ></span>
                      :
                      (this.state.isHovered === index+1) ?
                      <span className="ion-md-play"></span>
                      :
                      <span className="song-number">{ index+1 }</span>
                    }
                  </button>
                </td>
                <td className="song-title">{ this.state.album.songs[index].title }</td>
                <td className="song-duration">{ this.state.album.songs[index].duration }s</td>
               </tr>
              )
            }
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(e) => this.formatTime(e)}
        />
      </section>
    );
  }
}

export default Album;

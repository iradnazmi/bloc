import React from 'react';
import '.././styles/landing.css';

const Landing = () => (
  <section className="landing">
    <div className="second">Turn up the music!</div>
    <section className="selling-points">
      <div className="point">
        <span className="ion-ios-musical-note"></span>
        <h3 className="point1">Choose your music</h3>
        <p className="point1-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <span className="ion-ios-wifi"></span>
        <h3 className="point2">Unlimited, streaming, ad-free</h3>
        <p className="point2-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <span className="ion-ios-phone-portrait"></span>
        <h3 className="point3">Mobile enabled</h3>
        <p className="point3-description">Listen to your music on the go. This streaming service is available on all mobile platforms!</p>
      </div>
    </section>
  </section>
);

export default Landing;

import React from 'react';
import '.././styles/landing.css';

const Landing = () => (
  <section className="landing">
    <div className="second">Feel the summer vibes!</div>
    <section className="selling-points">
      <div className="point">
        <span className="ion-ios-musical-note"></span>
        <h3 className="point1">Choose your music</h3>
        <p className="point1-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point">
        <span className="ion-ios-wifi"></span>
        <h3 className="point2">Unlimited, streaming, ad-free. Enjoy the perfect day with a perfect stream of music!</h3>
        <p className="point2-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point">
        <span className="ion-ios-phone-portrait"></span>
        <h3 className="point3">Mobile enabled</h3>
        <p className="point3-description">Whether you are at the beach or enjoying a day in, listen to your music on the go. This streaming service is available on all mobile platforms!</p>
      </div>
    </section>
  </section>
);

export default Landing;

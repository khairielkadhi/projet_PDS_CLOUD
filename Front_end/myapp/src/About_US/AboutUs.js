import React from 'react';
import Header from '../header';
import Footer from '../footer';
import './AboutUs.css';

function AboutUs() {

    const videoId = "lZEZAFuylPQ";
  return (
    <div>
    <div className="sticky-header">
    <Header />
  </div>
    <div>
   <br></br> <br></br>
    <section className="about-content">
  <div className="about-text">
    <h3>Notre mission est de contribuer au<br />développement des Ressources<br />Humaines dans les organisations</h3>
    <p>Nous concevons des solutions technologiques pour aider au quotidien les DRH dans<br /> l'exercice de leur métier et pour accompagner les collaborateurs dans leur parcours<br /> professionnel. Nous guidons les entreprises dans la transformation digitale vers les <br /> RH de demain grâce à nos services et à nos experts.</p>
  </div>
  
  
</section>
<section className="about-video">
  <h2>Our Story in Video</h2>
  <div className="video-container">
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}`} // Remplacez "VOTENUMERO" par le code d'intégration de votre vidéo YouTube
      title="Our Story Video"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    
  </div>
  <div className="about-content" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', maxWidth: '1050px', margin: '0 auto',marginTop:'0px' }}>
        <div className="about-numbers">
          <div className="about-number">
          <h3 className="about-number-color"> <span>12 millions</span>
            <span>1800</span>
            <span>1 million</span>
            </h3>
          </div>
          <div className="about-description">
          <p><span>d'employés gérés</span>
            
            <span style={{marginLeft:"50px"}}>experts au plus près de vous</span>
            <span>de paies en cloud</span></p>
          </div>
        </div>
       
        
      </div>
</section>




<br></br>





    </div>
    <Footer />
    </div>
  );
}

export default AboutUs;

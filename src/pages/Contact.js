import React from 'react';
import Main from '../Main';
import SocialCard from '../components/SocialCard';

function Contact() {
  return (
    <div>
      <Main>
        <div className ="row">
          <div className ="col-md-3 col-lg-4">
            <SocialCard title="GitHub" imageName="git.jpg" username="Cocololco" link="https://facebook.com"  />
            <SocialCard title="Instagram" imageName="insta.png" username="Cocololco" link="https://facebook.com"  />
            <SocialCard title="Twitter" imageName="twitter.png" username="Coc00z" link="https://twitter.com/C0c00z"  />
            <SocialCard title="Facebook" imageName="facebook.png" username="Corentin Hillion" link="https://www.facebook.com/corentin.hillion"  />
            <SocialCard title="Resume" imageName="resume.png" username="Corentin" link="/asset/CV_Corentin_Hillion.pdf"  />
          </div>
          
        </div>  
      </Main>
    </div>
  );
}

export default Contact;
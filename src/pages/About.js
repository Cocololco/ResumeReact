import React from 'react';
import Main from '../Main';
import AboutCard from '../components/AboutCard';
const Engineer={
  imagePath:'/img/profil.jpg',
  title:'Engineer',
  content: (
    <>
      Founder of the startup <a href="https://fablense.com" target="_blank" rel="noopener noreferrer">FabLense</a>
      &nbsp; with over 10 years of experience in manufacturing as an engineer.
      <br />
      I’m a self-taught programmer with a passion for problem-solving through coding.
      <br />
      In my 20s, I began by selling custom Excel spreadsheets using VBA, which evolved into developing PHP web applications.
      I’m a quick learner, highly adaptable, and capable of mastering new software or programming languages as needed.
    </>
  )
}
const Passion={
  imagePath:'/img/kite.jpg',
  title:'Passionate',
  content: (
    <>
      Very active, I love any water sport and kitesurf in particular.<br/>
      I have been involved in local soccer club for 13 years.
    </>
  )
}
function About() {
  return (
    <div>
      <Main>
        <AboutCard entry={Engineer}/>
        <AboutCard entry={Passion}/>
            
           
      </Main>
    </div>
  );
}

export default About;
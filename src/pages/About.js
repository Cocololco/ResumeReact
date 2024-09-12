import React from 'react';
import Main from '../Main';
import AboutCard from '../components/AboutCard';
const Engineer={
  imagePath:'/img/profil.jpg',
  title:'Engineer',
  content: (
    <>
      Found of startup <a href="https://fablense.com" target="_blank" rel="noopener noreferrer">FabLense</a>, an engineer with over ten years experience, turned programmer with a passion for problem‑solving through coding.<br />
      Highly efficient, adaptable and capable of mastering new software and programming languages.<br />
      Proficient in Development PHP, Laravel, HTML5/CSS, Javascript, React, RESTAPI, MySQL, SQL, Python, JAVA, C, VBA, Microsoft Office Suite, PowerBI,
      Solidworks, Autocad and Android Studio.
    </>
  )
}
const Interest={
  imagePath:'/img/kite.jpg',
  title:'Interest',
  content: (
    <>
      <li>Watersports, particulary kitesurfing</li>
      <li>Playing for my soccer club</li>
      <li>Being a dad to two little girls</li>
      <li>Currently renovating our family home</li>
      <li>Enjoying exploring the Northern Rivers</li>
      <li>Visiting friends and family back in France</li>
    </>
  )
}
function About() {
  return (
    <div>
      <Main>
        <AboutCard entry={Engineer}/>
        <AboutCard entry={Interest}/>
            
           
      </Main>
    </div>
  );
}

export default About;
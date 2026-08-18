import React, { useEffect } from 'react';
import Main from '../Main';
import SkillTable from '../components/SkillTable';

const engSkills = [
  ['Product Development','product.png',5,''],
  ['Project Management','project.png',5,''],
  ['SolidWorks','sw.png',5,''],
  ['Lean Manufacturing','lean.png',4,''],
  ['AutoCad','cad.png',3,''],
];
const devSkills = [
  ['Office','office.jpg',5,''],
  ['PHP','php.jpg',5,''],
  ['Laravel','laravel.png',4,''],
  ['HTML & CSS','htmlcss.png',4,''],
  ['RestAPI','restapi.png',4,''],
  ['Linux Server Management','linux.png',3,''],
  ['Javascript','javascript.jpg',3,''],
  ['Mysql','mysql.png',4,''],
  ['SQL','sql.jpg',5,''],
  ['PowerBI','powerbi.jpg',3,''],
  ['Python','python.jpg',3,''],
  ['Android Studio','android.png',3,''],
  ['React','react.svg',2,''],
  ['C C#','c.png',2,''],
];
const langSkills = [
  ['English','england.png',5,''],
  ['French','france.png',5,''],
  ['Spanish','spain.png',1,''],
  ['German','germany.png',1,''],
];

function Skills() {
  useEffect(() => {
    document.title = 'Skills Corentin';
  }, []); // This will run when the component is mounted
  return (
    <div>
      <Main >
        <div className ="row">
          <div className ="col-md-3 col-lg-4"><SkillTable skills={engSkills} title="Engineering" /></div>
          <div className ="col-md-3 col-lg-4"><SkillTable skills={devSkills} title="Development" /></div>
          <div className ="col-md-3 col-lg-4"><SkillTable skills={langSkills} title="Language" /></div>
        </div>        
      </Main>
    </div>
  );
}

export default Skills;
import React, { useEffect } from 'react';
import Main from '../Main';
import TimelineCard from '../components/TimelineCard';
import TimelineDetails from '../components/TimelineDetails';

const Fablense = {
  id: 'Fablense',
  active: 'active',
  company: 'Fablense',
  image: 'fablense.jpg',
  location: 'Gold Coast, Australia',
  title: 'Founder',
  content: 'Startup developing software and hardware for Industry 4.0',
  details: [
    'Created a hardware/software solution to gather manufacturing data.',
    'Built an electronic tracking device using a Raspberry Pi base, custom PCB, custom interface, and firmware in Python.',
    'Built a web application on Laravel/MySQL, and deployed the application for each new customer on a private or cloud based Linux server.',
    'Custom web application manages devices, stores and analyses data and enables customised dashboards and tools to view and analyse data.',
    'Built an android app to manage and install the devices.',
    'Identifying potential clients and developing strategies to generate leads.',
    'Engaging with prospective customers to demonstrate product capabilities and benefits.',
    'Managing customer relationships and providing ongoing support to ensure satisfaction and product success.',
  ],
  'dateStart': '2022',
  'dateEnd': 'now',
};
const Sicame2 = {
  id: 'Sicame2',
  company: 'Sicame',
  image: 'sicame.png',
  location: 'Brisbane, Australia',
  title: 'Industrial Engineer',
  content: 'Lean manufacturing using smart tools',
  details: [
    'Built and deployed a web application built using native PHP and SQL to:',
    [
      'real‑time tracking of production labour cost.',
      'manage production planning (operators, tools, and machines schedules).',
      'manage quality control and production planning.',
      'track work health and safety issues.',
      'provide a 3D view of stock location.',
      'assist HR management (daily schedule, leave, and training management).',
      'enable live monitoring of machines using custom Arduino devices.',
      'provide controlled document management.',
    ],
    'Developed a custom integration between web application and third‑party software (Sybiz).',
    'Redesigned and built assembly lines to minimise labour and optimise production efficiency.',
    'Redesigned products to reduce material and manufacturing costs.',
    'Redesigned factory layout to optimize material and product flows.',
    'Project managed the design, fabrication and on‑site installation of new solar farm connectors.',
  ],
  'dateStart': '2016',
  'dateEnd': '2022',
};
const Sicame1 = {
  id: 'Sicame1',
  company: 'Sicame',
  image: 'sicame.png',
  location: 'Brisbane, Australia',
  title: 'Product Engineer',
  content: 'Designing innovative electrical connectors',
  details: [
    'Designed, developed and introduced new products for low and medium voltage overhead connectors.',
    'Tested products to ANSI/IEC/AS Standards (American/European/Australian) in in‑house NATA certified laboratory.',
    'Responsible for design, testing, patent application, industrialisation and customer training of the MechaSplice, an overhead connector patented in the USA.',
    'Monitored and improved procedures to adhere to ISO 9001:2015 and ISO 14001:2015 within the engineering office and test laboratories.',
    'Provided remote and on‑site customer support and training.',
  ],
  'dateStart': '2011',
  'dateEnd': '2016',
};
const Icam = {
  id: 'Icam',
  company: 'Icam',
  image: 'icam.png',
  location: 'Nantes, France',
  title: 'Engineer Student',
  content: 'Generalists/multidisciplinary engineers school',
  details: [
    'Generalists/multidisciplinary engineers school.',
  ],
  'dateStart': '2006',
  'dateEnd': '2011',
};


function Experiences() {
  useEffect(() => {
    document.title = 'Skills Corentin';
  }, []); // This will run when the component is mounted
  return (
    <div>
      <Main>
        <div className="row list-group py-3 list-group-horizontal w-100">
          <div className="list-group col-md-4">
            <TimelineCard entry={Fablense}  />
            <TimelineCard entry={Sicame2}  />
            <TimelineCard entry={Sicame1}  />
            <TimelineCard entry={Icam}  />
          </div>
          <div className="list-group col-md-8">
            <div className="accordion" id="accordionExample">
              <TimelineDetails entry={Fablense}  />
              <TimelineDetails entry={Sicame2}  />
              <TimelineDetails entry={Sicame1}  />
              <TimelineDetails entry={Icam}  />
            </div>
          </div>
        </div>
      </Main>

    </div>
  );
}

export default Experiences;
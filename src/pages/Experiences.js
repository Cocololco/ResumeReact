import React from 'react';
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
    'Created a Hardware/Software solution to gather manufacturing data.',
    'Built an electronic tracking device using a Raspberry Pi base, custom PCB, custom interface, and firmware in Python.',
    'Built a web application on Laravel/MySQL, and deployed the application for each new customer on private or cloud-based Linux server.',
    'Custom web application manages devices, stores and analyzes data, and enables customized dashboards and tools to view and analyze data.',
    'Built an Android app to manage and install the device.',
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
      'live track production labour cost',
      'manage production planning (operators, tools, and machine schedules)',
      'manage quality control and production planning',
      'track work health and safety issues',
      'provide a 3D view of stock location',
      'assist HR management (daily schedule, leave, and training management)',
      'enable live monitoring of machines using custom Arduino devices',
      'provide controlled document management',
    ],
    'Although many features of the web application were standalone, it was integrated with a third-party ERP software (Sybiz) to retrieve key data such as job orders, product names, and sales information.',
    'Redesigned and built assembly lines to minimize labor and optimize production efficiency.',
    'Redesigned products to reduce material and manufacturing costs.',
    'Redesigned factory layout to optimize material and product flows.',
    'Project managed the design, fabrication, and on-site installation of new solar farm connectors.',
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
  content: 'Designing Innovative Electrical Connectors',
  details: [
    'Designed, developed, and introduced new products for low and medium voltage overhead connectors.',
    'Tested new products to ANSI/IEC/AS Standards (American/European/Australian) in our in-house NATA laboratory.',
    'Responsible for every stage of the development of the MechaSplice, an overhead connector patented in the USA. Stages included design, testing, patent application, industrialization, and customer training.',
    'Maintained and improved procedures following the ISO 9001:2015 and ISO 14001:2015 within the engineering office and test laboratories.',
    'Customer support and training (utilities and solar farms).',
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
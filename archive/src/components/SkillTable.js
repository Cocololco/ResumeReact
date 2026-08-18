import React from 'react';
import starImage from '../assets/img/star.png';  // Adjust the path based on your project structure

const SkillTable = ({ skills, title }) => {
  return (
    <table className="table table-light table-bordered">
      <thead className="table-primary">
        <tr>
          <th colSpan="100%" style={{textAlign:"center"}}>{title}</th>
        </tr>
      </thead>
      <thead className="table-primary">
        <tr>
          <th><br /></th>
          <th>Skill</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill, index) => (
          <tr key={index}>
            <td>
              <img className="rounded mx-auto d-block" height="20" src={`/img/skills/${skill[1]}`} alt="" />
            </td>
            <td>{skill[0]}</td>
            <td>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {[...Array(skill[2])].map((_, i) => (
                  <img key={i} className="rounded" height="15" src={starImage} alt="star" />
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkillTable;

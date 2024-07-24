import React from 'react';

const Opportunity = () => {
    const opportunities = [
        {
          title: 'Full-Stack Developer Training',
          description: 'Join our intensive training program to enhance your skills in both front-end and back-end development.',
        },
        {
          title: 'Cloud Computing Certification',
          description: 'Get certified in AWS, Azure, or Google Cloud Platform and boost your career in cloud technologies.',
        },
        {
          title: 'Cybersecurity Workshop',
          description: 'Participate in our cybersecurity workshop to learn about the latest trends and best practices in information security.',
        },
        {
          title: 'Leadership Development Program',
          description: 'Develop your leadership skills with our comprehensive development program designed for aspiring managers.',
        },
      ];
      
  return (
    <div className="fixed h-80 w-80 p-4 bg-white rounded-3xl shadow-lg overflow-hidden">
      <h2 className="text-xl text-white font-bold bg-black p-2 rounded-t-lg">Opportunity Board</h2>
      <div className="h-full overflow-y-auto bg-white p-2 rounded-b-lg">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="mb-4 p-2 bg-white shadow-lg rounded-md">
            <h3 className="text-black text-lg font-semibold">{opportunity.title}</h3>
            <p className="text-gray-600">{opportunity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunity;

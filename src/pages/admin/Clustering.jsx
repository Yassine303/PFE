import React from 'react';

const Clustering = () => {
  const data = [
    { level: 'Moderate Risk', count: 46, color: '#FDB94E', description: 'Students requiring regular monitoring and preventive intervention' },
    { level: 'High Risk', count: 33, color: '#FA3C35', description: 'Students needing immediate and intensive support' },
    { level: 'Low Risk', count: 21, color: '#2C9E3E', description: 'Students on track with minimal support needed' }
  ];
  
  const totalStudents = data.reduce((total, item) => total + item.count, 0);
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 font-sans bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-center text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Student Risk Level Distribution</h1>
      <p className="text-center text-gray-600 mb-8">Total Students: <span className="font-bold">{totalStudents}</span></p>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="rounded-xl p-4 shadow-md transform hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: `${item.color}20` }} // Using color with transparency
          >
            <div className="text-center">
              <p className="font-bold text-lg" style={{ color: item.color }}>{item.level}</p>
              <p className="text-4xl font-bold mt-1" style={{ color: item.color }}>{item.count}</p>
              <p className="text-gray-600 text-sm mt-1 font-medium">{(item.count / totalStudents * 100).toFixed(1)}% of students</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative w-full h-64 mb-12 bg-gray-100 rounded-lg shadow-inner p-4">
        <div className="absolute inset-0 flex items-end justify-around p-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-1/4 rounded-t-lg flex flex-col items-center justify-end transition-all duration-500 hover:opacity-90 relative group"
              style={{
                backgroundColor: item.color,
                height: `${(item.count / totalStudents) * 100}%`
              }}
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                {item.count} students
              </div>
              <span className="text-white font-bold mb-1">{item.count}</span>
              <span className="text-white text-xs pb-1">{item.level}</span>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-8 w-full flex justify-around">
          {data.map((item, index) => (
            <div key={index} className="text-xs text-gray-500">
              {(item.count / totalStudents * 100).toFixed(1)}%
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="font-bold text-xl mb-4 text-gray-800">Risk Level Insights</h2>
        <ul className="space-y-4">
          {data.map((item, index) => (
            <li key={index} className="flex items-start">
              <div className="w-5 h-5 mt-1 mr-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
              <div>
                <span className="font-bold block" style={{ color: item.color }}>{item.level}</span>
                <span className="text-gray-700">{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Last updated: April 10, 2025</p>
      </div>
    </div>
  );
};

export default Clustering;
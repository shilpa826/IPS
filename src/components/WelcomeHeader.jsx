// import React from 'react'
// import img from '../assets/notice.jpg'
// const MainContent = () => {
//   return (
//     // <main className="flex-1 bg-white p-6">
//           <div className="bg-gradient-to-r from-blue-900 to-amber-700 h-12 shadow-md flex justify-center items-center px-4 text-white font-bold text-5xl h-30">
//         Welcome to the Login Portal 
//       </div>
       
//   )
// }
// export default MainContent

   /* <div className="text-center text-lg border-b border-gray-300 text-blue-600 font-semibold mx-4 my-2 ">
            URGENT NOTICE TO UG STUDENTS 31/08/2025 🔴
          </div>
          <h3 className="text-red-600 font-bold text-center mt-8">Urgent Notice</h3>
          <div className="flex justify-center mt-4">
            <img
              src={img}
              alt="Urgent Notice"
              className="max-w-full h-auto border shadow-md"
            />
          </div> */
        // </main>

        import React from 'react';
      import img from '../assets/notice.jpg';

const WelcomeHeader = () => {
  return (
    <main className="flex-1 bg-white">
      <div className="bg-gradient-to-r from-blue-900 to-amber-700 shadow-md flex justify-center items-center px-4 py-6 text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        Welcome to the Login Portal
      </div>
    </main>
  );
};

export default WelcomeHeader;
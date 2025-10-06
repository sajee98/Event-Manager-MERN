 import { Link } from "react-router-dom";
 
 const Intro = () => {
    return (
        
        <div className="w-full flex items-center jsutify-center mb-[100px] md:mb-[150px]"> 
            <div className="lg:container mx-auto">
                <div className="technology_container md:relative w-full min-h-[576px] rounded-2xl md:py-0 p-8">
                    <div className="max-w-[920px] w-full bg-white rounded-2xl p-5 md:absolute -bottom-15 right-0 shadow">
                        <div className="flex items-center justify-between gap-2 mb-6">
                            <h5 className="text-base text-primary-dark-gray font-bold font-roboto uppercase">Who are WE</h5>
                            <span style={{ fontFamily: 'Roboto, sans-serif' }} className="text-sm text-secondary-dark-gray font-roboto font-semibold capitalize">28 June 2025</span>
                        </div>
                        <h3 className="text-3xl text-gray-800 font-raleway font-bold mb-5"> Lorem ipsum dolor sit amet consectetur adipisicing  reiciendis. Adipisci ullam asperiores</h3>
                        <p style={{ fontFamily: 'Roboto, sans-serif' }} className="text-base text-gray-600 font-roboto font-normal mb-6"> Lorem ipsum dolor sit amet consequatur possimus enim, animi, ad autem at tempore, totam obcaecati exercitationem quam quia incidunt iste? Tempora, molestias corporis Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae reiciendis qui blanditiis consequatur possimus enim, animi, ad autem at tempore, totam obcaecati exercitationem quam quia incidunt iste? Tempora, molestias corporis.</p>
                        <Link to="/about" className="text-base text-gray-800 font-raleway  font-bold capitalize px-10 py-4 bg-white rounded-2xl border boreder-voilet-500 inline-block">
                                      Read More
                                    </Link>
                    </div>
                </div>
            </div>
        </div>
    //   <div className="w-full h-auto bg-gray-100 py-20">
    //      <div className="lg:container mx-auto px-6">
    //         <h2 className="text-3xl font-bold text-center mb-10">Our Technologies</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //           {/* Technology Cards */}
    //           <div className="bg-white p-6 rounded-lg shadow-lg">
    //              <h3 className="text-xl font-semibold mb-4">React</h3>
    //              <p>Build user interfaces with React.</p>
    //           </div>
    //           <div className="bg-white p-6 rounded-lg shadow-lg">
    //              <h3 className="text-xl font-semibold mb-4">Node.js</h3>
    //              <p>Server-side development with Node.js.</p>
    //           </div>
    //           <div className="bg-white p-6 rounded-lg shadow-lg">
    //              <h3 className="text-xl font-semibold mb-4">Tailwind CSS</h3>
    //              <p>Utility-first CSS framework for styling.</p>
    //           </div>
    //         </div>
    //      </div>
    //   </div>
    );

 }
 export default Intro
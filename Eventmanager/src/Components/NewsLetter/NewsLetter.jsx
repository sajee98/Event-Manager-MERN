

const NewsLetter = () => {

    return (
          <div className='w-full min-h-[534px] h-full banner_section flex items-center justify-center  mb-[20px] md:py-0 py-14 px-4'  style={{ backgroundColor: "#79A085" }}>
            <div className="lg:container mx-auto flex items-center justify-center">

                <div className="flex flex-col items-center justify-center max-w-[768px] w-full text-center md:gap-7 gap-5">
                    <h3 className='text-4xl md:text-6xl text-white font-raleway font-bold md:mb-4'>Get our stories delivered Form us to your inbox weekly.</h3>
                    <form action="#" className='max-w-[494px] w-full md:flex items-center gap-2.5 space-y-3 md:space-y-0'>
                        <input type="email" className='max-w-[320px] w-full  bg-white pl-3 rounded-lg outline-0 h-[56px]' placeholder='Your Email..' />
                        <button type='submit' className='text-lg text-white font-raleway font-bold capitalize cursor-pointer max-w-[166px] w-full border-white border rounded-lg h-[56px]'>get started</button>
                    </form>
                    <p className='text-base  font-raleway font-normal max-w-[555px] w-full leading-7 text-gray-1000'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eos modi repellat veniam saepe quam nulla praesentium? Odio, debitis delectus.</p>
                </div>
            </div>
        </div>
    );
}

export default NewsLetter;
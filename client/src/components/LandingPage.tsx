const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center overflow-x-hidden">
            <div className="text-white flex flex-col items-center mb-6 w-full max-w-screen-xl">
                <h1 className="text-5xl text-center font-bold mb-6">Movie Squad</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-200 mb-8">
            <div className="bg-orange-500 text-black p-8 md:p-12 lg:p-16 rounded-lg shadow-lg text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex items-center justify-center">

                <p className="font-bold text-5xl md:text-7xl lg:text-7xl">
                        Discover new movies 
                        <br />Create Watch list
                        <br />Engage with a community of Cinema Lovers!
                    </p>
                </div>

                <div className="bg-orange-500 text-black p-4 rounded-lg shadow-lg text-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-1">
                    <p className="font-bold text-2xl md:text-3xl lg:text-4xl">
                        Sign Up 
                    </p>
                </div>
            </div>
            <h2 className="text-lg font-bold mb-2">Top Rated Movies</h2>
        </div>
    );
};

export default LandingPage;

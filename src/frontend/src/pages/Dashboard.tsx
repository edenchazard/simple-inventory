import { useAPI } from "../hooks";

export default function Dashboard(){
    const [stats, loaded] = useAPI('/stats');

    if(loaded){
        return (
            <section>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col rounded-lg shadow-lg w-1/3 p-10 bg-zinc-800  text-white">
                        <div className="flex justify-center text-center text-white">
                            <h2 className="text-4xl">{stats.stocksBelowMinimum}</h2>
                        </div>
                        <p className="text-center text-3xl mt-8 ">Stocks requiring attention</p>
                        <div className="flex flex-row-reverse mt-14 items-end gap-5">
                        <button className="text-gray-600 hover:bg-gray-100 hover:text-gray-700 py-4 px-2">
                            Go
                        </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    else{
        return <div>Loading...</div>;
    }

}

//                    <p className="text-center text-gray-700 font-light mt-5"> Stay up-to-date on news and features, take advantage of benefits and offers, and help improve Google One through research and surveys </p>

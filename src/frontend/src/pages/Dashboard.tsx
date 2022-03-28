import { useContext } from "react";
import { faTriangleExclamation, faFaceFrown, faCubes } from '@fortawesome/free-solid-svg-icons';
import { useAPI, UserContext } from "../hooks";
import Card from "../components/DashboardCard";

function determine_verb(adjust: number): string{
    return (adjust > 0 ? "added" : "removed")
}

function removeSign(adjust: number): number{
    return parseInt(adjust.toString().replace('-', ''));
}

export default function Dashboard(){
    const [stats, loaded] = useAPI('/stats');
    //const [changes, setChanges] =useAPI
    const user = useContext(UserContext);

    if(loaded){
        return (
            <div>
                <div className="text-center">
                    Welcome, <span className='user'>{user.first_name} {user.last_name}</span>
                </div>
                <div className="flex flex-row justify-center">
                    <div id="left">
                        <section>
                            <div className="flex flex-row justify-center">
                                <Card
                                    number={stats.dash.totalStocks}
                                    icon={faCubes}
                                    description="Total stocks." />
                                <Card
                                    number={stats.dash.stocksBelowMinimum}
                                    icon={faFaceFrown}
                                    description="Stocks requiring immediate attention." />
                                <Card
                                    number={stats.dash.stocksWithinThreshold}
                                    icon={faTriangleExclamation}
                                    description="Stocks within threshold." />
                            </div>
                        </section>
                        <section>
                            <h2>Today's changes</h2>
                            <ul>
                                {
                                    stats.dash.changesToday.map(change =>
                                    <li>
                                        {`[${change.name}] ${change.agent.first_name} ${change.agent.last_name}
                                        ${determine_verb(change.adjust)}
                                        ${removeSign(change.adjust)}`}
                                    </li>)
                                }
                            </ul>
                        </section>
                    </div>
                    <div id='right'>
                        <section>
                            <ul>
                                {
                                    Object.entries(stats.other).map((value, stat) => {
                                        return (<><span>{stat}: </span><span>{value}</span></>)
                                    })
                                }
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return <div>Loading...</div>;
    }
}
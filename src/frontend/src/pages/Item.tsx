import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../api";
import {CategoryScale} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0
    }]
  };

const CHART = {
    utils: {
        addDays(date, days: number){
            let d = new Date(date);
            d.setDate(d.getDate() + days);

            return d;
        },

        removeDays(date:string|Date, days: number){
            let d = new Date(date);
            d.setDate(d.getDate() - days);
        
            return d;
        },

        daysOfTheWeek(): Array<string>{
            return "mon|tues|wednes|fri|sat|sun"
                .split("|")
                .map(day => day+"day");
        }
    },

    api: {
        getRange(){

        }
    },

    display:{
        async inDays(stockID: number, daysPrevious: number){
            try{
                const
                    curDate = new Date().toString(),
                    from = CHART.utils.removeDays(curDate, daysPrevious),
                    records = await fetch(`/api/get-records/${stockID}/${from}/${curDate}`);

                console.log(records)
                const sum = (dates) => {
                    
                }

                // calculate what dates we need to sum
                const dates = (() => {

                })();
            }
            catch(e){

            }
        }
    }
}

export default function Item(){
    const
        params = useParams(),
        id = parseInt(params.itemId);

    const [data, setData] = useState({
        name: null,
        changes: [],
        notes: [],
        id: null,
        category: null,
        minimum: null
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.fetchItem(id);
                const json = await response.json();
                setData({
                    ...json,
                    changes: [],
                    notes: []
                });
                setLoaded(true);
                console.log(json);
            }
            catch (error) {
                console.log("error", error);
            }
        };
    
        fetchData();
    }, [id]);

    function sign(value: number): string{
        return (value > 0 ? "+"+value : ""+value)
    }

    if(loaded){
        return (
            <div>
                <section>
                    <h1>{data.name}</h1>
                    <span>id#{data.id} in the category '{data.category.label}'</span>
                </section>
                <section>
                    <h3>Notes</h3>
                    {
                        data.notes.map((note) => 
                            <div className="flex items-start">
                                <div className="mr-5">{note.date}</div>
                                <p>
                                    {note.text}
                                </p>
                            </div>
                        )
                    }
                </section>
                <section>
                    <h3>History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Data Time</th>
                                <th>Quantity</th>
                                <th>Agent</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.changes.map((change, index) =>
                                    <tr>
                                        <td>{change.date_time}</td>
                                        <td>{change.quantity}</td>
                                        <td>{change.agent}</td>
                                        <td>{sign(change.adjust)}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </section>
                <section>                
                    
                </section>
            </div>
        );
    }
    else{
        return <div>Loading...</div>;
    }
}
//<Chart type='line' data={chartData} />
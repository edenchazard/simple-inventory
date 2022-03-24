import { useParams } from "react-router-dom";
import { useState } from "react";
import { items } from "../test-data";
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

    display:{
        inDays(daysPrevious: number){
            const curDate = new Date().toString();

            const sum = (dates) => {
                
            }

            // calculate what dates we need to sum
            const dates = (() => {

            })();
        }
    }
}

export default function Item(){
    let params = useParams();
    const id = params.itemId;
    let d = items.find((entry) => entry.id == id);



    const [data] = useState({
        changes: [],
        notes: [],
        ...d
    });

    /*function calculateChange(index){
        const
            curQuantity = data.changes[index].quantity,
            prevQuantity = data.changes[index-1]?.quantity || data.changes[0].quantity,
            change = prevQuantity - curQuantity;
        return change;
    }*/

    function sign(value:number): string{
        return (value > 0 ? "+"+value : ""+value)
    }
    return (
        <div>
            <section>
                <h1>{data.label}</h1>
                <span>id#{data.id}</span>
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
                                    <td>{change.dateTime}</td>
                                    <td>{change.quantity}</td>
                                    <td>{change.agent}</td>
                                    <td>{sign(change.change)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
            <section>                
                <Chart type='line' data={chartData} />
            </section>
        </div>
    );
}
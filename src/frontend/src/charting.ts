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
//<Chart type='line' data={chartData} />
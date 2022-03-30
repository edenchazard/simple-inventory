const {formatDate} = require("./Utils");

const Charting = {
    // from and to must be Date objects
    async hourly(dbcon, stockID, from, to){
        // the idea here is we find the datetime one full day before the
        // specified date (defaults to today) and then
        // fetch the max level of the stock every hour
        // because this query won't return hours where
        // there's no records, we'll then fill in the blanks
        // make it nicely formatted.
        const sql = `
        SELECT date_time, quantity
        FROM adjustments
        WHERE id IN (
           SELECT MAX(id)
           FROM adjustments
           WHERE stockID = ?
           AND date_time BETWEEN ? AND ?
           GROUP BY YEAR(date_time),
                    MONTH(date_time),
                    DAY(date_time),
                    HOUR(date_time)
        )
        ORDER BY date_time DESC`;

        // format as y-m-d h:i:s
        const query = await dbcon.execute(sql, [stockID, formatDate(from), formatDate(to)]);

        const a = performance.now();
        const chart = new Chart(generateHourlyRange(from, to), query[0], date =>{
            const y = new Date(date);
            y.setMinutes(0, 0, 0);
            return y.toISOString();
        });

        console.log("time taken", performance.now() - a);
        return chart.data;
    }
}
class Chart {
    constructor(fill, fixedPoints, neutralizeFunction){
        this.setFill(fill);
        this.setFixedPoints(fixedPoints);
        this.applyFixedPoints(neutralizeFunction);
        this.fillGaps();
    }

    setFill(data){
        this.data = data;
    }

    setFixedPoints(fixedPoints){
        this.fixedPoints = fixedPoints;
    }

    // applies fixed points from an sql result to the 'filled' array
    applyFixedPoints(neutralizeFunction){
        if(!this.fixedPoints){
            throw new Error("fixed points not set")
        }

        if(!this.data){
            throw new Error("no initial data set")
        }

        //console.log("fixed", this.fixedPoints);
        //console.log("filled", this.data)
        this.fixedPoints.forEach(fixed =>{
            const period = neutralizeFunction(fixed.date_time);
            //console.log("ah", period)
            const index = this.data.findIndex((p) => p.period == period);
            // bug fix
            if(index !== -1){
                this.data[index].quantity = fixed.quantity;
            }
            else{
                this.data.push({ period, quantity: fixed.quantity })
            }
        });
    }

    fillGaps(){
        if(!this.fixedPoints){
            throw new Error("fixed points not set")
        }

        if(!this.data){
            throw new Error("no initial data set")
        }

        let index = 0;
        let curFixed = this.fixedPoints[index];
    
        for(let i = 0; i < this.data.length; i++){
            // fill in the blank with our first fixed point
            if(this.data[i].quantity == null){
                this.data[i].quantity = curFixed.quantity;
            }
            // change fixed point reference
            else{
                if(this.fixedPoints[index]){
                    curFixed = this.fixedPoints[index];
                    index++;
                }
            }
        }
    }
}

// create an array of dates starting from our 
// 'to' point and descend downwards until we match
// our beginning datetime
const generateHourlyRange = (beginDate, endDate) => {
    let arr = [];

    const cur = new Date(endDate.getTime());

    // neutralize date by zeroing s, m, ms
    cur.setMinutes(0, 0, 0);

    const begin = beginDate.getTime();
    //console.log(beginDate.toISOString(), ' TO ', endDate.toISOString())
    while(cur.getTime() > begin){
        arr.push({ period: cur.toISOString(), quantity: null });
        cur.setHours(cur.getHours() - 1);
    }

    return arr;
}

module.exports = Charting;
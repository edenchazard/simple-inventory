const {formatDate} = require("./Utils");

const Charting = {
    async hour24(dbcon, stockID, to = new Date()){
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

        // ensure it's a date obj
        if(typeof to == "string"){
            to = new Date(to);
        }

        // subtract one day from our date to create the minimum part (to)
        // of the range
        from = new Date(to);
        // amend this so we aren't limited to 23 hours before our to
        from.setHours(from.getHours() - 23);

        // format as y-m-d h:i:s
        from = formatDate(from);
        to = formatDate(to);
        console.log('beginning from ', from, "to", to);

        const query = await dbcon.execute(sql, [stockID, from, to]);

        const a = performance.now();
        const chart = new Chart();

        chart.make(periodsLast24Hours(to), query[0], date =>{
            const y = new Date(date);
            y.setMinutes(0, 0, 0);
            return y.toISOString();
        })

        console.log("time taken", performance.now() - a)
        console.log(chart.data)
        return chart.data;
    }
}
class Chart {
    constructor(){
        this.data = [];
        this.fixedPoints = [];
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

        this.fixedPoints.forEach(fixed =>{
            const period = neutralizeFunction(fixed.date_time);
            const index = this.data.findIndex((p) => p.period == period);
            this.data[index].quantity = fixed.quantity;
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

    make(fill, fixedPoints, neutralizeFunction){
        this.setFill(fill);
        this.setFixedPoints(fixedPoints);
        this.applyFixedPoints(neutralizeFunction);
        this.fillGaps();
    }
}

// create an array of dates starting from our 
// 'to' point and descend downwards 24 hours
const periodsLast24Hours = (endDate) => {
    let arr = [];

    const y = new Date(endDate);

    // neutralize date by removing s, m, ms
    y.setMinutes(0, 0, 0);

    for(let i = 0; i < 23; i++){
        arr.push({
            period: y.toISOString(),
            quantity: null
        });
        y.setHours(y.getHours() - 1);
    }

    return arr;
}

module.exports = Charting;
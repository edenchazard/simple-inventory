const {formatDate} = require("./Utils");

const Charting = {
    async hour24(dbcon, stockID, from = new Date()){
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
           AND date_time >= ?
           GROUP BY YEAR(date_time),
                    MONTH(date_time),
                    DAY(date_time),
                    HOUR(date_time)
        )
        ORDER BY date_time DESC`;

        // ensure it's a date obj
        if(typeof from == "string"){
            from = new Date();
        }

        //subtract one day from our date
        from.setHours(from.getHours() - 23);

        const query = await dbcon.execute(sql, [stockID, formatDate(from)]);
    
        // create an array of dates starting from our 
        // 'from' point and descend downwards 24 hours
        const fill = (beginDate) => {
            let arr = [];
            const y = new Date(beginDate);
            for(let i = 0; i < 23; i++){
                arr.push({
                    period: y.getHours(),
                    quantity: null
                });
                y.setHours(y.getHours() - 1);
            }

            return arr;
        }

        // generate array with defaults
        const applyFixedPoints = (filled, fixedPoints) => {
            fixedPoints.forEach(fixed =>{
                const hour = new Date(fixed.date_time).getHours();
                console.log(hour, fixed.quantity)
                const index = filled.findIndex((p) => p.period == hour);
                filled[index].quantity = fixed.quantity;
            });

            return filled;
        };

        const fillGaps = (arr, fixedPoints) => {
            let index = 0;
            let curFixed = fixedPoints[index];

            for(let i = 0; i < arr.length; i++){
                // fill in the blank with our first fixed point
                if(arr[i].quantity == null){
                    arr[i].quantity = curFixed.quantity;
                }
                // change fixed point reference
                else{
                    if(fixedPoints[index]){
                        curFixed = fixedPoints[index];
                        index++;
                    }
                    continue;
                }
            }

            return arr;
        };
        
        let chartData = fill(from);
        const fixedPoints = query[0];
        chartData = applyFixedPoints(chartData, fixedPoints);
        chartData = fillGaps(chartData, fixedPoints);

        return chartData;
    }
}

module.exports = Charting;
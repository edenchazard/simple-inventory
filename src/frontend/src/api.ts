export const Api = {
    fetchItem(stockID: number){
        return fetch(`/api/stock/${stockID}`);
    },

    fetchStocks(){
        return fetch(`/api/stocks`);
    }
};
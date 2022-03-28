module.exports ={
    async getUser(id){
        let sql = `SELECT agentID, email, last_name, first_name FROM agents WHERE agentID=?`;
        const user = await this.con.execute(sql, [id]);
        return user[0][0];
    },

    async getPermissionsForUser(id){
        let sql = `SELECT * FROM agents_perms WHERE agentID=?`;
        const user = await this.con.execute(sql, [id]);
        return user[0][0];
    }
}
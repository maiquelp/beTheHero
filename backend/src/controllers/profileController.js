const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const user_id = req.userId;

        const asset = await connection('asset').where('user_id', user_id).select('*');
   
        const [totalValue] = await connection('asset').where('user_id', user_id).sum('value');
        
        asset.map(e => {
          const percent = e.value / totalValue['sum(`value`)'];
          e.percent = percent;
        });
           
        return res.json(asset)
    }
}    
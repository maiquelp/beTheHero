const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;

        const [ count ] = await connection('asset').count(); 

        //console.log(count);

        const asset = await connection('asset').join('user', 'user.id', '=', 'asset.user_id')
        .limit(5).offset((page - 1) * 5)
        .select(['asset.*']);
        //.select(['asset.*', 'user.name' ,'user.email']);
        
        res.header('X-Total-Count', count['count(*)']);

        return res.json(asset)
    },

    async indexmobile(req, res) {
      const {id} = req.params; 

      const asset = await connection('asset').join('user', 'user.id', '=', 'asset.user_id')
      .where('user_id', id)
      .select(['asset.*']);
      
      return res.json(asset)
  },

    async create(req, res) {
        const {title, value} = req.body;

        const user_id = req.userId;

        try {
            //const [id] = await connection('asset').insert({ //heroku error fix try
            await connection('asset').insert({
                title, value, user_id 
            });
        
            return res.sendStatus(204);
            //return res.status(204).send(id); //heroku error fix try
        } catch (err) {
            return res.status(400).send('Registration failed');
        };
    
    },

    async update(req, res){
      const {title, value} = req.body;

      const user_id = req.userId;

      const {id} = req.params;

      const asset = await connection('asset').where('id', id).select('user_id').first();

      if(asset == undefined || asset.user_id !== user_id) {
        return res.status(401).send('Asset not found or operation not permitted.')
      }

      try {
        await connection('asset').where('id', id).update({
          title: title,
          value: value
        });
        
        return res.json(req.body)
        
      } catch (err) {
        return res.status(500).send('Update failed, try again later');
      };

    },

    async delete(req, res) {
        const {id} = req.params;
        const user_id = req.userId;
        
        try {
          const asset = await connection('asset').where('id', id).select('user_id').first();

          if(asset == undefined || asset.user_id !== user_id) {
            return res.status(401).send('Asset not found or operation not permitted.')
          }

          await connection('asset').where('id', id).delete();

          return res.status(204).send()

        } catch (err) {
          return res.status(500).send('Update failed, try again later');
        };
    }
}
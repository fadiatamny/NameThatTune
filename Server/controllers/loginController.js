
const con = new (require('../database/connector'))();
const ErrHandler = require('../util/errorHandler');

class LoginController {
    static async signUp(req,res){
        try{
            let query = `INSERT INTO Users (id, password) VALUES (?, ?);`;
            await con.query(query,[req.body.id, req.body.password]);
            res.status(200).send('Inserted Successfully');
        }catch(err){
            ErrHandler.handle(res, err);
        }
    };

    static async login(req,res){
        try{
            let query = `SELECT * FROM Users WHERE Users.id = ?;`;
            let result = await con.getData(query, [req.body.id]);
            if(result.length == 0) throw { status: 409, message: 'User doesnt exist' };
            result = result[0];
            if(result.password != req.body.password) throw { status: 409, message: 'Incorrect Password' };
            res.status(200).send('Succesfully Connected');
        }catch(err){
            ErrHandler.handle(res, err);
        }
    };
}

module.exports = LoginController;
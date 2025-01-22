const pool = require('../utils/db');
const Boom = require('@hapi/boom');

exports.getUsers = async() =>{
    try{
        const result = await pool.query('select * from users');
        return result.rows;
    }
    catch (error){
        throw Boom.badRequest('failed to fetch users:'+ error.message);
    }
};

exports.addUser = async({name,email})=>{
    try{
        const result = await pool.query(
            'insert into users(name,email) values($1, $2)',
            [name,email]
        );
        return {
            message:"user added sucessfully",
            user: result.rows[0]
        }
        
    }
    catch(error){
        throw Boom.badRequest('failed to create a new user:', + error.message);
    }
};
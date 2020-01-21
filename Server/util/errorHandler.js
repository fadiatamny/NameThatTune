class ErrHandler{
    static handle(res,obj){
        console.log("ERROR OCCURED!: " +JSON.stringify(obj));

        if(!obj)
            obj = {status: 500, message:'Something Went Wrongg'};
        if(!obj.status)
            obj.status = 500;
        if(!obj.message)
            obj.message = 'Something Went Wrongg';
        
        res.status(obj.status).send(obj.message);
    }
}

module.exports = ErrHandler
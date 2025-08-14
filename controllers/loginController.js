const userdata = require("../model/register");
const logindata = require("../model/login");
// For Login form....
exports.loginUser = async (req, res) => {
    const {
        email,
        password
    }= req.body;
    const user = await userdata.findOne({email});
    if( !user || user.password !== password ) {
        return res.status(401).json({success:false, message:"Invalid cradential" })
    }

    const userss = new logindata({
            email,
            password
        });

        await userss.save();

    res.status(201).json({status:true, message:"Login Successfully.....", user});
};
 //login get info....

 exports.loginGet = async (req, res) =>{
        try{
            const logindatawait = await logindata.find().sort({createdAt: -1});

            res.status(200).json({
                status:true,
                message:"user succesfully",
                data:logindatawait
            })
           
        }catch(error){
             res.status(500).json({
                status:false,
                message:"error",
                error: error.message
            })
        }
}

exports.loginDelete = async (req,res)=>{
    try{
        const {email} = req.params;

        const deleteres = await logindata.findOneAndDelete({ email : email});

        res.status(200).json({
            status:true,
            message:'succcessfully delete',
            data:deleteres
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:'error'
        })
    }
}
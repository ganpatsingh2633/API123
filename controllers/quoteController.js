const quoteData = require("../model/quoteFrom");

// For registration form....
exports.quotePost  = async (req, res) =>{
    try{
        const{
            name,
            email,
            phone,
            service,
            message
        }= req.body; 

        if ( !name || !email || !phone || !service || !message ){
            return res.status(400).json({
                status:false,
                message : "All field are required"
            })
        }

                const emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailformat.test(email)){
            return res.status(400).json({
                status:false,
                message : "Invalid Email format"
        });
        }

        if (!/^[0-9]{10}$/.test(phone)){
            return res.status(400).json({
                status:false,
                message : "Invalid phone format(Keep 10 Digit only)"
        });
        }

        const newuser = new quoteData({
            name,
            email,
            phone,
            service,
            message
        });

        await newuser.save();
        
        res.status(200).json({
            status: true,
            message:"Quote Submitted Successfully",
            data:newuser
        });
    }catch(error){
        res.status(500).json({
            status:false,
            message:"Problem Occur..!!!",
            error:error.message
        });
    }
} 

//get
exports.quoteGet = async (req, res) =>{
        try{
            const quoteDatawait = await quoteData.find().sort({createdAt: -1});

            res.status(200).json({
                status:true,
                message:"user succesfully",
                data:quoteDatawait
            })
           
        }catch(error){
             res.status(500).json({
                status:false,
                message:"error",
                error: error.message
            })
        }
}

//edit (data modification)
exports.quoteEdit = async (req,res) => {
     try{
        const {id} = req.params;

        const{
            name,
            email,
            phone,
            service,
            message
        } = req.body;

        const fromEdit = await quoteData.findById(id);
        if(!fromEdit){
            return res.status(400).json({
                status:false,
                message:"user data not difine"               
            })  
        }

        fromEdit.name = name;
        fromEdit.email = email;
        fromEdit.phone = phone;
        fromEdit.service = service;
        fromEdit.message = message;

        const updatedata = await fromEdit.save();

        res.status(200).json({
            status:true,
            message:"successfully edit",
            data : updatedata
        })
     }catch(error){
            res.status(500).json({
                status:false,
                message:"error false"
            })
     }
}

// delete query for quote from ....
exports.quoteDelete = async (req,res)=>{
    try{
        const {email} = req.params;

        const deleteres = await quoteData.findOneAndDelete({ email : email});

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
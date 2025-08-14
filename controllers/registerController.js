const userdata = require("../model/register");

// For registration form....
exports.registerUser  = async (req, res) =>{
    try{
        const{
            name,
            email,
            password,
            confirmPassword,
            phone,
            address
        }= req.body; 
        // for duplicate Email
        const existinguser = await userdata.findOne({email});
        if(existinguser) {
           return res.status(409).json({
                status:false,
                message : "Email already exist...Plz enter unique email!!!"
            })
        }

        if ( !name || !email || !password || !confirmPassword || !phone || !address ){
            return res.status(400).json({
                status:false,
                message : "All field are required"
            })
        }

        // for checking email and phone format validation .....

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
        // for password validation......

        if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,20}$/.test(password)) {
            return res.status(400).json({
                status:false,
                message : "btw 8 to 20 char. At least one digit, one lowercase, one uppercase, one specified special character"
        });
        }

        if ( password !== confirmPassword ){
            return res.status(400).json({
                status:false,
                message : "password do not match"
            })
        }
        const newuser = new userdata({
            name,
            email,
            password,
            confirmPassword,
            phone,
            address
        });

        await newuser.save();
        
        res.status(201).json({
            status: true,
            message:"User Register Successfully",
            data:newuser
        });
    }catch(error){
        res.status(500).json({
            status:false,
            messaage:"Problem Occur..!!!",
            error:error.messaage
        });
    }
} 

//get
exports.registerGet = async (req, res) =>{
        try{
            const page  = parseInt(req.query.page) || 1 ;
            const limit = 5;
            const skip = (page - 1) * limit;
            const totalUsers = await userdata.countDocuments(); // Count total documents
            const totalPages = Math.ceil(totalUsers / limit);   
            const userdatawait = await userdata.find().skip(skip).limit(limit).sort({createdAt: -1});

            res.status(200).json({
                status:true, page :page,
                 totalPages : totalPages,
                totalUsers : totalUsers,    
                message:"user getting succesfully",
                data:userdatawait
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
exports.registerEdit = async (req,res) => {
     try{
        const {id} = req.params;

        const{
               name,
            email,
            password,
            phone,
            address
        } = req.body;

        const registeredit = await userdata.findById(id);
        if(!registeredit){
            return res.status(400).json({
                status:false,
                message:"user data not difine"               
            })  
        }

        registeredit.name = name;
        registeredit.email = email;
        registeredit.password = password;
        registeredit.phone = phone;
        registeredit.address = address;

        const updatedata = await registeredit.save();

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


//delete
exports.registerDelete = async (req,res)=>{
    try{
        const {id} = req.params;

        const deleteres = await userdata.findByIdAndDelete(id);

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
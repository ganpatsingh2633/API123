const orderdata = require("../model/order");
const userdata = require("../model/register");

// For registration form....
exports.orderProductpost  = async (req, res) =>{
    try{
        const{
            name,
            email,
            phone,
            product,
            quantity,
            deliveryAddress,
            delstatus
        }= req.body;

        if ( !name || !email || !phone || !product || !quantity || !deliveryAddress || !delstatus ){
            return res.status(400).json({
                status:false,
                message : "All field are required"
            })
        }

    const user = await userdata.findOne({email});
    if( !user ) {
        return res.status(401).json({success:false, message:"Invalid Email.." })
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
        const newuser = new orderdata({
            name,
            email,
            phone,
            product,
            quantity,
            deliveryAddress,
            delstatus
        });

        await newuser.save();
        
        res.status(201).json({
            status: true,
            message:"order submitted Successfully",
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
exports.orderget = async (req, res) =>{
        try{
            const page  = parseInt(req.query.page) || 1 ;
            const limit = 5;
            const skip = (page - 1) * limit;
            const totalUsers = await orderdata.countDocuments(); // Count total documents
            const totalPages = Math.ceil(totalUsers / limit);   
            const userdatawait = await orderdata.find().skip(skip).limit(limit).sort({createdAt: -1});

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

//for get by email 
exports.ordergetbyemail = async (req, res) => {
    try{
        const {email} = req.params;
        const user = await orderdata.findOne({email});
        if (!user) {
            return res.status(404).json({
                status : false,
                messaage : "NO ORDER FOUND!!"
            });
        } 
        res.status(200).json({
            status : true,
            data: user,
        });
    }
    catch(error) {
        res.status(500).json({
            status : false,
            messaage : "something went wrong",
            error : error.messaage,
        })
    }

};

//edit (data modification)
exports.orderEdit = async (req,res) => {
     try{
        const {id} = req.params;

        const{
            name,
            email,
            phone,
            product,
            quantity,
            deliveryAddress,
            delstatus
        } = req.body;

        const orderedit = await userdata.findById(id);
        if(!orderedit){
            return res.status(400).json({
                status:false,
                message:"order not difine"               
            })  
        }

        orderedit.name = name;
        orderedit.email = email;
        orderedit.phone = phone;
        orderedit.product = product;
        orderedit.quantity = quantity
        orderedit.deliveryAddress = deliveryAddress;
        orderedit.delstatus = delstatus;


        const updatedata = await orderedit.save();

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
exports.orderDelete = async (req,res)=>{
    try{
        const {id} = req.params;

        const deleteres = await orderdata.findByIdAndDelete(id);

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
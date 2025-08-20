const productdata = require("../model/stone-product");

// For registration form....
exports.productPost  = async (req, res) =>{
    try{
        const{
            title,
            description,
            sizes,
            image,
            price
        }= req.body; 

        const newproduct = new productdata({
            title,
            description,
            sizes,
            image,
            price
        });

        await newproduct.save();
        
        res.status(201).json({
            status: true,
            messaage:"Product Added Successfully",
            data:newproduct
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
exports.productGet = async (req, res) =>{
        try{
            const userdatawait = await productdata.find().sort({createdAt: -1});

            res.status(200).json({
                status:true,
                message:"user succesfully",
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
exports.productEdit = async (req,res) => {
     try{
        const {id} = req.params;

        const{
            title,
            description,
            sizes,
            image,
            price
        } = req.body;

        const productedit = await productdata.findById(id);
        if(!productedit){
            return res.status(400).json({
                status:false,
                message:"product not difine"               
            })  
        }

        productedit.title = title;
        productedit.description = description;
        productedit.sizes = sizes;
        productedit.image = image;
        productedit.price = price;

        const updatedata = await productedit.save();

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

// For deleting product from list
exports.productDelete = async (req,res)=>{
    try{
        const {id} = req.params;

        const deleteres = await productdata.findOneAndDelete({ id : id});

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
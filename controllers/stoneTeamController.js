const teamData = require("../model/stoneTeam");

// For registration form....
exports.teamPost  = async (req, res) =>{
    try{
        const{
            name,
            position,
            experience,
            description,
            image
        }= req.body; 

        const newMember = new teamData({
            name,
            position,
            experience,
            description,
            image
        });

        await newMember.save();
        
        res.status(201).json({
            status: true,
            message:"Member Submitted Successfully",
            data:newMember
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
exports.teamGet = async (req, res) =>{
        try{
            const teamDatawait = await teamData.find().sort({createdAt: -1});

            res.status(200).json({
                status:true,
                message:"Get succesfully easily.....",
                data:teamDatawait
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
exports.teamEdit = async (req,res) => {
     try{
        const {id} = req.params;

        const{
            name,
            position,
            experience,
            description,
            image
        } = req.body;

        const fromEdit = await teamData.findById(id);
        if(!fromEdit){
            return res.status(400).json({
                status:false,
                message:"user data not difine"               
            })  
        }

        fromEdit.name = name;
        fromEdit.position = position;
        fromEdit.experience = experience;
        fromEdit.description = description;
        fromEdit.image = image;

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

// for delete 
exports.teamDelete = async (req,res)=>{
    try{
        const {id} = req.params;

        const deleteres = await teamData.findOneAndDelete({id : id});

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
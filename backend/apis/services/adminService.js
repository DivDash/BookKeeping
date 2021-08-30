const AdminModel = require("../models/adminModel.js");
const bcrypt = require("bcrypt");

module.exports = class AdminService{
    static async createAdmin(data){
        try {
            console.log(data)
            const userexist = await AdminModel.findOne({ email: data.email });
            if (userexist) {
              console.log("here at email exist")  
              return ({ message: "Email Already Exist" });
            }
            const newAdmin = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirm: data.confirm,
                phone: data.phone,
                work: data.work
            }
            
            const response = await new AdminModel(newAdmin).save();
            // await saving.save();
            // res.json({ message: "Registered Sucessfully" });
            return ({ message: "Registered Sucessfully" });
        //    const response = await new Admin(newAdmin).save();
          
        } catch (error) {
            console.log(error);
        } 

    }

    static async loginAdmin(Email,Password){
        try {
            const response = await AdminModel.findOne({ email: Email });
          if (response) {
            
            const match = await bcrypt.compare(Password, response.password);
            const token = await response.generateauthtoken();
            return {match, token};
          }
        } catch (error) {
            console.log(`user not found. ${error}`)
        }
    }

    
}
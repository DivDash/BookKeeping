const profit=require('../models/profit_model')


module.exports = class ProfitService{
    
    static async validateProfitProject(data){
        try{

            const {Project,Client}=data
            
            const query = { $and: [{ "Project":Project }, { "Client": Client }] }
            const projectExist = await profit.find( query )

            return projectExist
        }
        catch(error){
            console.log(error)
        }
    }

    static async createProfitProject(data){
        try{
            const{Project,Client,Receivable,Revenue,Expense,Date,Status}=data

            let newProfitProject={
                Project,Client,Receivable,Revenue,Expense,Date,Status
            }
            const saving = await new profit(newProfitProject).save();
            return saving;
        }
        catch(error){
            console.log(error)
        }
    }

    static async getProfitProject(){
        try{
        
            let data = await profit.find()
            return data
        }catch(error){
            console.log(error)
        }
    }
}
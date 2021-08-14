const express = require( 'express' )
const router = express.Router()

const user = require( '../models/schema' )


router.post( '/registration', async ( req, res ) => {
    try{
    const { name, email, password, confirm, phone, work } = req.body
    console.log( name, email, password, confirm, phone, work)
    if ( !name || !email || !password || !confirm || !phone || !work ) {
        res.status( 422 ).json( { error: "FILL THE FULL FORM" } )
    }
    if ( password !== confirm ) {
        res.status( 422 ).json( { error: "CONFIRM PASSWORD DOSENT MATCH" } )
    }
    else{
        const userexist = await user.findOne( { email: email } )
        if ( userexist ) {
            res.status( 422 ).json( { message: "Email Already Exist" } )
        }
        else{
        const saving = new user( { name, email, password, confirm, phone, work } );
        await saving.save()
        res.status( 201 ).json( { message: "REGSITERED SUCCESFULLY" } )
        }
    }
    } catch ( err ) {
        console.log( err )
        res.send( "there is error" )
    }
} )

module.exports = router;
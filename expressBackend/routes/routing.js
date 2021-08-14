const express = require( 'express' )
const router = express.Router()
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const cookieParser = require( 'cookie-parser' );
router.use( cookieParser() );
const user = require( '../models/schema' )


router.post( '/registration', async ( req, res ) => {
    try {

        const { name, email, password, confirm, phone, work } = req.body

        if ( !name || !email || !password || !confirm || !phone || !work ) {
            res.status( 422 ).json( { error: "FILL THE FULL FORM" } )
        }
        if ( password !== confirm ) {
            res.status( 422 ).json( { error: "CONFIRM PASSWORD DOSENT MATCH" } )
        }
        const userexist = await user.findOne( { email: email } )
        if ( userexist ) {
            res.status( 422 ).json( { message: "Email Already Exist" } )
        }
        const saving = new user( { name, email, password, confirm, phone, work } );
        await saving.save()
        res.status( 201 ).json( { message: "REGSITERED SUCCESFULLY" } )
    }
    catch ( err ) {
        console.log( err )
        res.send( "there is error" )
    }
} )


router.post( '/signin', async ( req, res ) => {
    try 
    {
        let { email, password } = req.body
        console.log(email,password)

        if ( !email || !password ) {
            res.status( 422 ).json( { error: "FILL THE FULL FORM" } )
        }

        const userexist = await user.findOne( { email: email } )
        if ( userexist ) {
            const match = await bcrypt.compare( password, userexist.password );
            const token = await userexist.generateauthtoken();
            res.cookie( "BookKeeping", token, {
                expires: new Date( Date.now() + 864000000 ),
                httpOnly: true
            } );
            if ( match ) {
                res.json( { message: "loggin succesfully" } )
            }
            if ( !match ) {
                res.json( { err: "invalid credentials" } )
            }
            else {
                res.json( { err: "invalid credentials" } )
            }
        }
    } catch ( err ) {
        res.send( "notokk" )
    }
} )


module.exports = router;
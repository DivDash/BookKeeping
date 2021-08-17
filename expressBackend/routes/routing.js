const express = require( 'express' )
const router = express.Router()
const bcrypt = require( 'bcrypt' )
const jwt = require( 'jsonwebtoken' )
const cookieParser = require( 'cookie-parser' );
router.use( cookieParser() );
const user = require( '../models/schema' )
const Authenticate=require('../middlewares/Authenticate')


router.post( '/registration', async ( req, res ) => {
    try {
        let check=false;
        const { name, email, password, confirm, phone, work } = req.body

        if ( !name || !email || !password || !confirm || !phone || !work ) {
            check=true;
            res.json( { message: "Fill The Full Form" } )
        }
        if ( password !== confirm ) {
            check=true;
            res.json( { message: "Confirm Password Dosen't Match" } )
        }
        const userexist = await user.findOne( { email: email } )
        if ( userexist ) {
            check=true;
            res.json( { message: "Email Already Exist" } )
        }

        if(check===false) {
        console.log("here at saving")    
        const saving = new user( { name, email, password, confirm, phone, work } );
        await saving.save()
        res.json( { message: "Registered Sucessfully" } )
        }
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

        if ( !email || !password ) {
            res.json( { message: "Fill The Full Form" } )
        }
        else{

        const userexist = await user.findOne( { email: email } )
        if ( userexist ) {
            const match = await bcrypt.compare( password, userexist.password );
            const token = await userexist.generateauthtoken();
            res.cookie( 'Book', token, {
                expires: new Date( Date.now() + 864000000 ),
                httpOnly: false
            } )
            
            if ( match ) {
                res.json( { message: "loggin succesfully" } )
            }
            if ( !match ) {
                res.json( { message: "Invalid Credentials" } )
            }
        }
    }
    } catch ( err ) {
        res.send( "notokk" )
    }
} )


router.get( '/Getinfo', Authenticate, ( req, res ) => {
    res.send( req.rootuser )
} )


router.get( '/Logout', ( req, res ) => {
    res.clearCookie( 'Book', { path: '/' } )
    res.json( { message: "success" } )
} )


module.exports = router;
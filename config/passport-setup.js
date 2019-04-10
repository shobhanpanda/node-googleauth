const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20')
const User=require('../models/user')


passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
    	done(null,user)
    })
    
})



passport.use(new GoogleStrategy({
        callbackURL:'/auth/google/redirect',
        clientID:'1059567174549-qtd72f9rjh7b0b3d76lkhpk4iuop2mco.apps.googleusercontent.com',
        clientSecret:'0lu-wpsdE0qsOMtheT6WFdsF'
},(accessToken,refreshToken,profile,done)=>{
             
             User.findOne({googleId:profile.id}).then((currentUser)=>{
             	if(currentUser){

                  console.log('already',currentUser)
             	  done(null,currentUser)
             }else{

           new User({
        	username:profile.displayName,
        	googleId:profile.id
        }).save().then((newUser)=>{
        	console.log('new user created'+ newUser)     	      
             done(null,newUser)
             })

             }
           })
         }))




const express=require('express')
const path=require('path')
const app=express()
const authRoutes=require('./routes/auth-routes')
const profileRoutes=require('./routes/profile')
const passportSetup=require('./config/passport-setup')
const cookieSession=require('cookie-session')
const passport=require('passport')
const mongodb=require('mongodb')
const mongoose=require('mongoose')

require('./db/mongoose')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs')

app.use(cookieSession({
	maxAge:24*60*60*1000,
	keys:['jkdgskd']
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/auth',authRoutes)
app.use('/profile',profileRoutes)

app.get('/',(req,res)=>{
	res.render('index')
})



app.listen(3000,()=>{
	console.log('app on port 3000')
})
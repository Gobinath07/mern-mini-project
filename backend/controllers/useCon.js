const User = require('../models/userMod')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail=require('./sendMail')
 
const {CLIENT_URL} = process.env
const useCon = {
  register: async (req, res) => {
      try {
          const {name, email,phone, password} = req.body
          
          if(!name || !email || !password || !phone)
              return res.status(400).json({msg: "Please fill in all fields."})

          if(!validateEmail(email))
              return res.status(400).json({msg: "Invalid emails."})

          const user = await User.findOne({email})
          if(user) return res.status(400).json({msg: "This email already exists."})

          if(password.length < 6)
              return res.status(400).json({msg: "Password must be at least 6 characters."})

          const passwordHash = await bcrypt.hash(password, 12)

          const newUser = {
              name, email,phone, password: passwordHash
          }

          const activation_token = createActivationToken(newUser)

         const url = `${CLIENT_URL}/user/activate/${activation_token}`
          sendMail(email, url, "Verify your email address")


          res.json({msg: "Register Success! Please activate your email to start."})
      } catch (err) {
          return res.status(404).json({msg: err.message})
      }
  },

  activateEmail: async (req, res) => {
    try {
        const {activation_token} = req.body
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

        const {name, email,phone, password} = user

        const check = await User.findOne({email})
        if(check) return res.status(400).json({msg:"This email already exists."})

        const newUser = new User({
            name, email,phone,password
        })

        await newUser.save()

        res.json({msg: "Account has been activated!!!!"})

    } catch (err) {
        return res.status(500).json({msg: err.message +" register again"})
    }
},
login: async (req, res) => {
  try {
      const {email, password} = req.body
      const user = await User.findOne({email})
      if(!user) return res.status(400).json({msg: "This email does not exist."})

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

      const refresh_token = createRefreshToken({id: user._id})
      res.cookie('refreshtoken', refresh_token, {
          httpOnly: true,
          path: '/user/refresh_token',
          maxAge: 7*24*60*60*1000 
      })
      console.log(refresh_token)
console.log(user)
      res.json({msg: "Login success!",user}) 
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},
getAccessToken: (req, res) => {
  try {
      const rf_token = req.cookies.refreshtoken
      console.log(rf_token)
      if(!rf_token) return res.status(400).json({msg: "Please login now!"})

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if(err) return res.status(400).json({msg: "Please login now!"})

          const access_token = createAccessToken({id: user.id})
          res.json({access_token})
      })
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},
getUserInfor: async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')

        res.json(user)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
getUsersAllInfor: async (req, res) => {
    try {
        const users = await Users.find().select('-password')

        res.json(users)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

forgotPassword: async (req, res) => {
  try {
      const {email} = req.body
      const user = await User.findOne({email})
      if(!user) return res.status(400).json({msg: "This email does not exist."})

      const access_token = createAccessToken({id: user._id})
      const url = `${CLIENT_URL}/user/reset/${access_token}`

      sendMail(email, url, "Reset your password")
      res.json({msg: "Link has been send, please check your email."})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},
resetPassword: async (req, res) => {
  try {
      const {password} = req.body
      console.log(password)
      const passwordHash = await bcrypt.hash(password, 12)

      await User.findOneAndUpdate({_id: req.user.id}, {
          password: passwordHash
      })

      res.json({msg: "Password successfully changed!"})
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},
logout: async (req, res) => {
    try {
        res.clearCookie('refreshtoken', {path: 'http://localhost:5000/user/refresh_token'})
        return res.json({msg: "Logged out."})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

}



function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports=useCon;
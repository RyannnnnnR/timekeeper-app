//Authorization middleware for jwt
const jwt = require('jsonwebtoken')
const authorizeWithPermission = (role) => {
  return (req,res,next) => {
  verifyToken(req,res, function(){
    if(req.data.user.permission !== 'undefined'){
      if(req.data.user.permission === role){
          next();
        }else{
          res.status(403).json({message: "Authorization failed. Invalid Permission"});
        }
      }else{
        res.status(403).json({message: "Authorization failed. Unrecognisable Permission"});
      }
  })
}
}
//Verify token/login
const verifyToken = (req,res,next) => {
 const bearerHeader = req.headers['authorization'];
 if(typeof bearerHeader !== 'undefined') {
   const bearer = bearerHeader.split(' ');
   const bearerToken = bearer[1];
   req.token = bearerToken;
   jwt.verify(bearerToken, 'secretkey', function(err, data){
     if(err){
      resres.status(403).json({message: "Authorization failed. Invalid token"});
    }
     req.data = data
     next();
   })
} else {
   res.status(403).json({message: "Authorization failed. Undefined token"});
 }
}

module.exports = {
  authorizeWithPermission,
  verifyToken
};

//Authorization middleware for jwt

const authorizeWithPermission = (role) => {
  return (res,req,next) => {
  verifyToken(res,req,next);
  if(req.permission !== 'undefined'){
    if(req.permission === role){
        next();
      }else{
        res.sendStatus(403);
      }
    }
  }
}

const verifyToken = (res,req,next) => {
 const bearerHeader = req.headers['authorization'];
 if(typeof bearerHeader !== 'undefined') {
   const bearer = bearerHeader.split(' ');
   const bearerToken = bearer[1];
   req.token = bearerToken;
   next();
 } else {
   res.sendStatus(403);
 }
}

module.exports = {
  authorizeWithPermission,
  verifyToken
};

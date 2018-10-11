
module.exports = function (hadler){
  return async(req,res,next) =>{
    try{
      await hadler();
    }
    catch(ex){
      next(ex);
    }

  };
}
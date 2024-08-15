function promisePollyfill(executor){
   let onResolve ,onReject;
   this.then=function(resolveCallback){
      //we are storing the resolve callback 
      onResolve=resolveCallback;

      //returning this will enable the chaining of this
      return this;
   }

   this.catch=function(rejectCallback){
      //we are storing the rejeact callback 
      onReject=rejectCallback;

      //returning this will enable the chaining of this
      return this;
   }


   //resolver function for executor 
   function resolver(data){
      //on resolve call the resolver funciton with data 
      onResolve(data);
   }
   //rejector funciton for executor 
   function rejector(error){
      //on reject calling the reject function with the error
      onReject(error);
   }

   //calling executor with the resovler and rejector 
   executor(resolver,rejector);
}

let testing =new promisePollyfill((resolve,reject)=>{
   return setTimeout(()=>{reject("rej success ");},4000);
});

testing.then((data)=>console.log(data)).catch(err=>console.log(err))
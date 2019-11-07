import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();

  api.post("/binary", (req, res) => {
    let { used,name, ref_id, position } = req.body;
   const user_id = require("uuid/v1");
   console.log(user_id, "id");
    let arr1 = [];
    let arr2=[];
    db.query(`select * from nodeTest `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows, "res");
        arr1 = response.rows;
         checkChildren(used);
}
});

const   checkChildren = (used) =>{
      arr2 = arr1.map(r => r.children);
     console.log(arr2, "child");
     let count=0;
     arr2.forEach(i=> {
       if(used == i){
         count++;
       }
     })

     if(count==0){
       db.query(`INSERT into nodeTest values ('${user_id()}', '${name}','${used}', '${position}', '${used}')`,(err, response) => {
         if (err) {
           console.log(err.stack);
         } else {
           console.log("No child present", response.rows);
         }
     });
     }
     else if(count==1){
       arr1.forEach(j=> {
         if(j.children == used && j.position != position){
           db.query(`INSERT into nodeTest values ('${user_id()}', '${name}', '${used}','${position}',  '${j.user_id}')`,(err, response) => {
             if (err) {
               console.log(err.stack);
             } else {
               console.log("No child present", response.rows);
             }
         })
         }
       })
     }
     else{
       let newArr=[];
       let subId="";
       arr1.forEach(j => {
         if(j.children == used && j.position == position){
           subId = j.user_id;
           checkChildren(subId);
         }
       })


     }
   }


  });

  return api;
};

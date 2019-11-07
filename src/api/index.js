import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();

  api.get("/n_billingslap", (req, res) => {
    //find id in company table and return the company   --------working
    db.query("SELECT * from n_billingslap where flag=1", (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
        res.json({ "Nishant bill": response.rows });
      }
    });

    api.get("/n_billingslap/:prod_id", (req, res) => {
      //find id in company table and return the company   -----working
      console.log(req.params.prod_id, "prod_id");
      db.query(
        `SELECT * from n_billingslap where prod_id=${req.params.prod_id} and flag=1`,
        (err, response) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(response.rows);
            res.json({ "Nishant bill": response.rows });
          }
        }
      );
    });
  });
  // perhaps expose some API metadata at the root

  api.post("/n_billingslap", (req, res) => {
    //take company from req and insert into company table   ----working

    const { id, prod_id, price, flag } = req.body;
    console.log("body", req.body);
    db.query(
      `insert into n_billingslap values(${id},${prod_id},${price} ,${flag})`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "successfull", response: response.rows });
        }
      }
    );
  });

  api.put("/n_billingslap/:prod_id", (req, res) => {
    //updating is working  ------working
    console.log("body", req.body);
    const { id, price, flag, total } = req.body;
    db.query(
      `UPDATE n_billingslap SET id=${id}, price=${price},flag=${flag} ,total=${total} WHERE prod_id=${req.params.prod_id}`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "live", method: "Update" });
        }
      }
    );
  });

  api.post("/estimation", (req, res) => {
    //Task 1  ------working
    console.log(req, "estimate");

    const [id, quantity, prod_id] = req.body;
    console.log("request", req.body);
    req.body.map(reqname=>(

    db.query(
      ` select * from n_billingslap where prod_id=${reqname.prod_id} `,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(prod_id, "rowsss");
          let price1 = response.rows.map(res => res.price);
          let quantity1 = reqname.quantity;
          console.log(quantity1, "quantity");
          console.log(price1,"price");
          let estvalue = [price1 * quantity1];
          console.log(estvalue, "estvar");
          res.json({ status: estvalue, response: response.rows });
        }
      }
    )
  ))
  });

  api.delete("/n_billingslap/:prod_id", (req, res) => {
    console.log("req", req.params);
    //take company id from path and find the id and update flag   ------working
    db.query(
      `Update  n_billingslap SET flag =0 where prod_id=${req.params.prod_id}`,
      (err, response) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(response.rows);
          res.json({ status: "live", method: "delete" });
        }
      }
    );
  });
  return api;
};
// api.post("/estimation", (req, res) => {
//   //Task 1  ------working
//   console.log(req, "estimate");
//
//   const [ id, quantity, prod_id]  = req.body;
//   console.log("request", req.body);
//
// {req.body.map((rowname, id) =>
//   console.log(rowname,"rows"),
//     db.query(
//       ` select * from n_billingslap where prod_id={rowname.prod_id} `,
//       (err, response) => {
//         if (err) {
//           console.log(err.stack);
//         } else {
//         console.log(response.rows,"rowsss");
//         let price1 = rowname.price;
//         console.log(price1, "quantity");
//         let estvalue = [price1 * quantity];
//         console.log(estvalue, "estvar");
//         res.json({ status: estvalue, response: response.rows });
//         }
//       }
//     )
//   )
// }
// });

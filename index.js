const producdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.open();
  /*
	db.version(1).stores({
			friends: `name,age`
		});
		*/
  return db;
};

let db = producdb("Productdb", {
  products: `++id, name, seller, price`
});

//input tags
const userId = document.getElementById("userid");
const proname = document.getElementById("proname");
const seller = document.getElementById("seller");
const price = document.getElementById("price");

// buttons

const btnCreate = document.getElementById("btn-create");
const btnRead = document.getElementById("btn-read");
const btnUpdate = document.getElementById("btn-update");
const btnDelete = document.getElementById("btn-delete");

btnCreate.addEventListener("click", function() {
  let flag = bulkCreate(db.products, {
    name: proname.value,
    seller: seller.value,
    price: price.value
  });

  proname.value = seller.value = price.value = "";
  getData();
});

//insert function
const bulkCreate = (dbtable, data) => {
  let flag = empty(data);

  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("Data insert successfully...");
  } else {
    console.log("Plesase provide data");
  }
  return flag;
};

//check textbox validation
const empty = obj => {
  let flag = false;

  for (const value in obj) {
    if (obj[value] != "" && obj.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

const getData = () => {
  let index = 0;
  let obj = {};

  db.products.count(count => {
    console.log(count);
  });
};

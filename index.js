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
const userId = document.getElementById('userid')
const proname = document.getElementById('proname')
const seller = document.getElementById('seller')
const price = document.getElementById('price')
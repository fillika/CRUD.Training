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

btnCreate.addEventListener("click", () => {
  let flag = bulkCreate(db.products, {
    name: proname.value,
    seller: seller.value,
    price: price.value
  });

  proname.value = seller.value = price.value = "";
  getData(db.products, data => {
    userId.value = data.id + 1 || 1;
  });
});

//create event on btn read button
btnRead.addEventListener("click", table);

btnUpdate.addEventListener("click", () => {
  const id = parseInt(userId.value || 0);

  if (id) {
    db.products
      .update(id, {
        name: proname.value,
        seller: seller.value,
        price: price.value
      })
      .then(updated => {
        let get = updated ? `data updated` : `Couldn't update data`;
        console.log(get);
      });
  }
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

const getData = (dbtable, fn) => {
  let index = 0;
  let obj = {};

  dbtable.count(count => {
    if (count) {
      dbtable.each(table => {
        obj = sortObj(table);

        fn(obj, index++);
      });
    } else {
      fn(0);
    }
  });
};

const sortObj = sortobj => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    seller: sortobj.seller,
    price: sortobj.price
  };

  return obj;
};

const createEl = (tagname, appendTo, fn) => {
  const fragment = document.createDocumentFragment();
  const element = document.createElement(tagname);

  fragment.appendChild(element);
  if (appendTo) appendTo.appendChild(fragment);

  if (fn) fn(element);
};

function table() {
  const tbody = document.getElementById("tbody");

  //Для очистки содержимого таблицы (чтобы не было дублирования)
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }

  getData(db.products, data => {
    if (data) {
      createEl("tr", tbody, tr => {
        for (const value in data) {
          createEl("td", tr, td => {
            td.textContent =
              data.price === data[value] ? `${data[value]} $` : data[value];
          });
        }

        createEl("td", tr, td => {
          createEl("i", td, i => {
            i.className += "fas fa-edit btnedit";

            i.setAttribute("data-id", data.id);

            i.addEventListener("click", editBtn);
          });
        });

        createEl("td", tr, td => {
          createEl("i", td, i => {
            i.className += "fas fa-trash-alt btndelete";
          });
        });
      });
    }
  });
}

function editBtn(event) {
  let id = +event.target.dataset.id;
  db.products.get(id, data => {
    userId.value = data.id || 0;
    proname.value = data.name || "";
    seller.value = data.seller || "";
    price.value = data.price || "";
    console.log(data);
  });
}

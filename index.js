// Create database

const db = new Dexie("myDb");
db.version(1).stores({
  friends: `name,age`
});

db.open();

import { defineDb, defineTable, column } from 'astro:db';

const Praticiens = defineTable({
  columns: {
    name: column.text(),
    firstname: column.text(),
    address: column.text(),
    zip: column.text(),
    city: column.text(),
    description: column.text(),
    profession: column.text(),
  },
});
//
// https://astro.build/db/config
export default defineDb({
  tables: { Praticiens }
});

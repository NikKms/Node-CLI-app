const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "contactsList":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);
    case "getContactById":
      const res = await contacts.getContactById(contactId);
      return console.log(res);
    case "removeContactById":
      const removeContact = await contacts.removeContact(contactId);
      return console.log(removeContact);
    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action,  <type>")
  .option("-id, --contactId, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p,--phone, <type>");

program.parse();

const options = program.opts();

invokeAction(options);

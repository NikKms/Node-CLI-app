const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const res = allContacts.find(({ id }) => id === contactId);

  return res || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const contactIdx = allContacts.findIndex(({ id }) => id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  const [result] = allContacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return result;
};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

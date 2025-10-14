const getAllContacts = async (req, res) => {
  res.status(201).json({ message: 'Get all Contacts' });
};

const createContact = async (req, res) => {
  res.status(201).json({ message: 'Create a Contact' });
};

const getContactById = async (req, res) => {
  res.status(201).json({ message: `Get a Contact ${req.params.id}` });
};
const updateContact = async (req, res) => {
  res.status(201).json({ message: `Update a Contact ${req.params.id}` });
};
const deleteContact = async (req, res) => {
  res.status(201).json({ message: `Delete a Contact ${req.params.id}` });
};

export { getAllContacts, createContact, updateContact, deleteContact, getContactById };

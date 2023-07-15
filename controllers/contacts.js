const mongodb = require('../db/connect');
const ObjectId =require('mongodb').ObjectId;


const getAll = async (req, res, next) => {
  try{
  const result = await mongodb.getDb().db('Test').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
} catch {
  res.status(200).json('nice try idiot');
}
};

const getSingle = async (req, res, next) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('Test').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
} catch {
  res.status(200).json('oh no! that didnt work....');
}
};

const createContact = async (req, res) => {
  if (req.body.firstName != null && req.body.lastName != null && req.body.email != null  && req.body.favoriteColor != null && req.body.birthday != null){
  try{
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
    const response = await mongodb.getDb().db('Test').collection('contacts').insertOne(contact);
    if (response .acknowledged) {
    res.status(201).json(response)
    } else {
    res.status(500).json(response.error || 'an error occured during creation of contact');
  }
} catch {
  res.status(200).json('oh no! that didnt work....');
}
}
else {
  res.status(200).json('oh no! that didnt work....');
}
};

const changeContact = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
    const response = await mongodb.getDb().db('Test').collection('contacts').replaceOne({_id: userId},contact);
    if (response .acknowledged) {
    res.status(201).json(response)
    } else {
    res.status(500).json(response.error || 'an error occured during creation of contact');
  }
} catch {
  res.status(200).json('oh no! that didnt work....');
}
};

const deleteContact = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('Test').collection('contacts').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'error while deleting contact')
  }
} catch {
  res.status(200).json('oh no! that didnt work....');
}
};


module.exports = { getAll,getSingle,createContact,changeContact,deleteContact};
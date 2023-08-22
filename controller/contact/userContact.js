const UserContact = require("../../model/contactSchema")

async function allContacts (req, res) {
    all_contact = await UserContact.find({user_id: req.user.id}).populate("user_id")
    res.status(200).json(all_contact);
};

async function singleContact (req, res) {
    single_contact = await UserContact.findById({_id: req.params.id})
    res.status(200).json(single_contact);
};

async function createContact (req, res, next) {
    let newContact
    newContact = new UserContact({
        ...req.body,
        user_id: req.user.id
    })

    // save or error send
    try {
        const contact = await newContact.save()
        res.status(200).json({
            message: "new contact saved successfully"
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

async function updateContact (req, res, next) {
    const filter = {_id: req.params.id}
    const update = {...req.body}

    // update the contact information
    try {
        contact_info = await UserContact.findOneAndUpdate(filter, update)
        if (contact_info) {
            res.status(200).json({ message: "contact data updated" })

        } else {
            res.status(404).json({ message: "wrong id" })
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
    
};

async function deleteContact (req, res, next) {
    delete_contact = await UserContact.deleteOne({_id: req.params.id})
    res.status(200).json({ message: "Delete contact information" })
};

module.exports = { allContacts, singleContact, createContact, updateContact, deleteContact }
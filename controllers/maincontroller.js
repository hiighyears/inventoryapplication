const db = require ('../db/queries') 

const getmessageindex = async (req,res) =>{
  const messages = await db.getAllmessages(); 
    res.render('index' , {messages,title: "Mini Messageboard"});
}

const getmessageform = (req,res)=>{
    res.render('form'); }

const submitmessageform =async (req,res)=>{
    await db.addMessage(req.body.username,req.body.message, new Date());
    res.redirect('/');
}
 
const getmessagedetails = async (req, res) => {
  const id = req.params.id;
  const message = await db.getMessageById(id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message, title: "Message Details" });
};
module.exports = {getmessageindex,getmessageform,submitmessageform,getmessagedetails};
import ShoppingCartModel from "../model/ShoppingCartModel.js";

export const addToCart = async (req, res) => {
  try {
    const cartData = await ShoppingCartModel.create(req.body);
    if (cartData)
      res.status(201).send({ message: "Data Added in the cart successfully" });
    else res.status(404).send({ message: "Unable to add items in the cart" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};


export const GetCartItems = async (req, res) => {
  try {
    const cartData = await ShoppingCartModel.find()
    .populate("product");
    res.status(200).send({ cartData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};


export const DeleteCart=async(req,res)=>{
  try {
     const cartData=await ShoppingCartModel.deleteOne({_id:req.body.id});
     if(cartData.deletedCount==1) res.status(200).send({cartData})
        else console.log({message:"Unable to Delete"})
  } catch (error) {
     console.log({err:error.message});
   }
};

export const RemoveCart=async(req,res)=>{
  try {
    
     const dataindb=await ShoppingCartModel.findOne({_id:req.body.id});
     let totalcount=1;
     let addcount=dataindb.count-totalcount;
     const cartData=await ShoppingCartModel.findByIdAndUpdate({_id:req.body.id},
       {       
       count:addcount,
       });
       if(cartData) res.status(200).send({cartData})
        else console.log({message:"Unbale to Remove"})
  } catch (error) {
   console.log({errr:error.message});  
   }
};

export const updateCartItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const cartItem = await ShoppingCartModel.findById(itemId);
    if (!cartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).send({ message: "Cart item updated successfully" });
  } catch (e) {
    res.status(500).send({ error: e?.message });
  }
};
export const CartDetails=async(req,res)=>{
  try {
     const cartData=await ShoppingCartModel.find({user:req.query.userId}).populate("product");
     if(cartData) res.status(200).send({cartData})
        else res.status(400).send({message:"Unable To Fatch Data"})
  } catch (error) {
     res.status(500).send({err:error.message})
   }
};

// export const CartDetails=async(req,res)=>{
//   try {
//      const cartData=await ShoppingCartModel.find({user:req?.query.id});
//      if(cartData) res.status(200).send({cartData});
//      else res.status(404).send({message:"Unbale to Fatch Data"})
//   } catch (error) {
//     console.log({error:error.message});
//   }
// };
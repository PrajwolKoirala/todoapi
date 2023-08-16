const Product = require("../model/Product")


const fetchProduct = async (req,res,next) => {

  //first oage maa jamma 25 ots products
  //  let products = await Product.find().skip(0).limit(25)


  // console.log(req.query);
  // return;

let search_term = req.query.search_term||""

  let per_page = parseInt(req.query.per_page) || 25  //page xa vaney page anusar liney...xaina vaney by defaule 25 ota
  let page = parseInt(req.query.page) || 1 //page number xa vaney tyo page number maa janey...navaye first page dekhi defauly garney

let price_from = parseFloat(req.query.price_from) || 0
let price_to = parseFloat(req.query.price_to) || 999999999999999  // yedo price deko xa vaney tei anusar garney..natra 0 to 99999999samma garne

//parseFloat or parseInt is a function used to parse a string and convert it into integer or float


  // name bata matra search hunxa
    // let products = await Product.find({name:RegExp(search_term, "i")}).skip((page - 1) * per_page).limit(per_page)
//{name:RegExp(search_term, "i") == yesle chai 'Mouse' ra 'mouse' j lekhey pani mouse dekhauxa....case insensitive banauxa


//either name bata or brands bata or categories bata search garnu paryo vaney:

// let products = await Product.find(
//   {
//     $or:[
//       {name:RegExp(search_term, "i")},
//       {brands:RegExp(search_term, "i")},
//       {categories:RegExp(search_term, "i")} 
//     ],
//     $and:[
//       {price: {$gte : price_from}},
//       {price: {$lte : price_to}}
//     ]
// },

//   ).skip((page - 1) * per_page).limit(per_page)

  //RegEXp is a regular expression for filtration 
//$or $and the query operation we learned on mongoDB
//$gte = greater than or equals to....$lte = lower than or equals to    
//mathi ko process ley normal searching maa help ta  garxa..but advance srarch like created_by wala feild maa id matra haina details fetch garna sakdaina
//so we need aggregation concept

/*
SQL ==  relationship = JOIN

mongoDB => aggregation

aggregation (advanxe find method)
aggregation framework
aggregation pipeline

same as water filtration

*/


//aggregation method
let products = await Product.aggregate([
  {
    $match: {
      $or: [
        {name:RegExp(search_term, "i")},
        {brands:RegExp(search_term, "i")},
        {categories:RegExp(search_term, "i")} 
      ],
    }
  },
  {
    $match : {
      $and:[
        {price: {$gte : price_from}},
        {price: {$lte : price_to}}
      ]
    }
  },
  {
   
      
      $sort:{name : 1} //ascending order by name
    
  },
  // {
  //   $lookup : {
  //     from: "users",
  //     foreignField : "_id",
  //     localField : "cerated_by",
  //     as:"created_by"
  //   }
  // },
  // {
  //   $unwind : "$created_by"
  // },
  {
    $skip : ((page - 1) * per_page)
  },
  {
    $limit : (per_page)
  }
])
console.log(products.length);

res.send({data:products})
}

const path = require("path"); // Import the 'path' module .... this is global


const store = async (req, res, next) => {
  console.log(req.body);

  let uploadedImagePaths = []; // Initialize an empty array to hold uploaded image paths

  if (req.files) {
    let imageFiles = req.files.images || [];
    if (!Array.isArray(imageFiles)) {
      imageFiles = [imageFiles];
    }

    for (const imageFile of imageFiles) {
      const file_name =
        Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(imageFile.name);

      imageFile.mv(
        path.join(__dirname, "../", "uploads/", file_name),
        async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send({ msg: "File upload failed" });
          }
          uploadedImagePaths.push(file_name);
        }
      );
    }
  }

  console.log("req.user", req.user);
  try {
    let products = [];

    for (const imagePath of uploadedImagePaths) {
      const product = await Product.create({
        ...req.body,
        image: imagePath,
        created_by: req.user._id,
      });
      products.push(product);
    }

    // If no products were added due to missing images, create the product without an image
    if (products.length === 0) {
      const product = await Product.create({
        ...req.body,
        created_by: req.user._id,
      });
      products.push(product);
    }

    res.send({ products });
  } catch (err) {
    next(err);
  }
};




//it only uploads multiple files..but images taa yeauta or yeauta vanda dherai ni huna sakxa
// const store = async (req, res, next) => {
//   console.log(req.body);
// //body ko JSON maa garesi direct image haru lina sakdaina...so er need to do it from form-data 
//   // yedi req.files xaina vaney image is missing vanxa...for data maa text ra files halna milxa 
//   if (!req.files || !req.files.images || !req.files.images.length) {
//     return res.status(400).send({ msg: "Image file is missing" });
//   }

//   //const file_name ra mv function le chai hamle direct gareko folder maa image lai pathauna ilxa

//   const imageFiles = req.files.images;
//   const uploadedImagePaths = [];
  
//   for (const imageFile of imageFiles){

//       // Generate a unique filename for the uploaded image
//       const file_name = Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(imageFile.name);
    
//       // Move the uploaded image to the appropriate directory
//         imageFile.mv(path.join(__dirname, "../", "uploads/", file_name), async (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send({ msg: "File upload failed" });
//         }
//         uploadedImagePaths.push(file_name);
//     });
//     }
   



//     console.log("req.user", req.user);
//     try {
//         const products = [];

//         for (const imagePath of uploadedImagePaths){

//             // naya product banayeko...with directed image file name
//             const product = await Product.create({ ...req.body, image: imagePath, created_by: req.user._id });
//             products.push(product);
//         }
//             res.send({ products });
//     } catch (err) {
//       next(err);
//     }
// };




// const store = async (req,res,next) => {
//     console.log(req.body);
//     console.log(req.files);



//     let file_name = Date.now() + '-' +Math.round(Math.random() * 1E9) + path.extname(req.files.image.name)

//     req.files.image.mv(path.join(__dirname,'../',"uploads/")+file_name,(err,data)=>{
//         console.log(err);
//         console.log(data);
//     })

//     console.log("req.user",req.user);
    
//     try{
//        let product =  await Product.create({...req.body,created_by:req.user._id})
//         res.send({product})
//     }catch(err){
//         next(err)
//     }
// }

// const update = async (req,res,next) => {
//     console.log(req.params.id);
//     return;
//     try{
//        let product =  await Product.create({...req.body,created_by:req.user._id})
//         res.send({product})
//     }catch(err){
//         next(err)
//     }
// }


const update = async (req, res, next) => {
    const productId = req.params.id;
    const updateData = req.body;

    console.log("Updating product with ID:", productId);

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ msg: "Product not found" });
        }

        res.send({ product: updatedProduct });
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {

  let product = await Product.findById(req.params.id)
  if(product){
   await Product.findByIdAndDelete(req.params.id)
   return res.status(204).end()
  }
  res.status(404).send("resource not found")
  

};





module.exports = {
    fetchProduct,
    store,
    update,
    remove
}
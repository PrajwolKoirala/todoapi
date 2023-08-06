function createProducts(req,res){
    //data insert
    res.send("data inserted");
}

const fetchProducts = (req, res) => {
    //fetch from database
    res.send([{}, {}]);
}

module.exports = createProducts //default export only one per module
module.exports.fetchProducts = fetchProducts//named export


// module.exports = {
//     fetchProducts : fetchProducts;

// }

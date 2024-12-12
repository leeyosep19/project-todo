
const { status } = require("express/lib/response");
const Product = require("../models/Product");

const PAGE_SIZE=5;
const productController = {};

productController.createProduct =async(req,res)=>{
try{
const {
    sku,
    name,
    size,
    image,
    category,
    description,
    price,
    stock,
    status,   
} =req.body;

const product = new Product({
    sku,
    name,
    size,
    image,
    category,
    description,
    price,
    stock,
    status,
});
console.log("createProduct ")
await product.save();

res.status(200).json({status:"success",product});

}catch(error){
    res.status(400).json({status: "fail", error:error.message});
}

};

productController.getProducts=async(req,res)=>{
    try{
        const {page,name} = req.query;
        const cond = name?{name:{$regex:name,$options:"i"}}:{};
        let query = Product.find(cond);
        let response = {status:"success"};
        if(page){
            query.skip((page-1) * PAGE_SIZE).limit(PAGE_SIZE);
            //최종 몇개 페이지
            //데이터가 총 몇개있는지
            const totalItemNum = await Product.countDocuments(cond);   //Product.find(cond).count()count 메서드는 더 이상 Mongoose에서 사용되지 않으며, 대신 countDocuments 메서드를 사용
            //데이터 총 개수 /PAGE_SIZE
            const totalPageNum = Math.ceil(totalItemNum/PAGE_SIZE);
            response.totalPageNum=totalPageNum
        }
        const productList = await query.exec();
        response.data= productList;
        
    // const products = await Product.find({});
    res.status(200).json(response);
    }catch(error){
        res.status(400).json({status: "fail", error:error.message});
    }
    };


    productController.updateProduct=async(req,res)=>{
        try{
            const productId =req.params.id;
            const {
                sku,
                name,
                size,
                image,
                category,
                description,
                price,
                stock,
                status ,  
            } = req.body;

            const product = await Product.findByIdAndUpdate({_id:productId},
                {
                    sku,
                    name,
                    size,
                    image,
                    category,
                    description,
                    price,
                    stock,
                    status ,  
                },
                {new : true}
            );
            if(!product)
                throw new Error ("상품이 존재하지 않습니다!!");
            res.status(200).json({status:"success",data:product});
        }catch(error){
            res.status(400).json({status: "fail", error:error.message});
        }
    };



module.exports = productController;
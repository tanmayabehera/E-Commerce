const Page = require('../../models/page');  


exports.createPage = async (req, res) => {
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({    
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id;
    
    const page = new Page(req.body);

    
    page.save((error, page) => {
        if(error) return res.status(400).json({ error });
        if(page){
            res.status(201).json({ page });
        }
    })   
}

exports.updatePage = async (req, res) =>{
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({    
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    req.body.createdBy = req.user._id;

    const updatedPage = await Page.findOneAndUpdate({category: req.body.category}, req.body, {new: true});

    if(updatedPage){
        return res.status(201).json({ page: updatedPage }); 
    }else{
        return res.status(400).json({ message: "Something Went Wrong" }); 
    }
};

exports.getPage = async (req, res) =>{
    const { category, type } = req.params;
    if(type === "page"){
        const page = await Page.findOne({category: category});
        if(page){
            return res.status(200).json({ page })
        }
        else{
            return res.status(400).json({ message: "Something Went Wrong" }); 
        }   
    }
};

const db = require('./db')

//all-products
const allProducts = () => {
    return db.Product.find().then(
        (result) => {
            if (result) {
                return {
                    statusCode: 200,
                    products: result
                }
            } else {
                return {
                    statusCode: 404,
                    message: "no data is present"
                }
            }
        }
    )
}
//viewproduct
const viewProduct = (id) => {
    return db.Product.findOne({
        id
    }).then((result) => {
        if (result) {
            return {
                statusCode: 200,
                product: result
            }
        } else {
            return {
                statusCode: 404,
                message: "Product unavailable"
            }
        }
    }
    )
}
//Wishlist
const addtowishlist = (product) => {
    return db.Wishlist.findOne({
        id: product.id
    }).then(result => {
        if (result) {
            return {
                statusCode: 401,
                message: "Book alresdy exist in Favorites"
            }
        } else {
            let newProduct = new db.Wishlist({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: {
                    rate: product.rating.rate,
                    count: product.rating.count
                }
            })
            newProduct.save()
            return {
                statusCode: 200,
                message: "Book added to Favorites"
            }

        }
    })
}
//getwishlist
const getWishlist = () => {
    return db.Wishlist.find().then(
        (result) => {
            console.log(result);
            if (result) {
                return {
                    statusCode: 200,
                    wishlist: result
                }
            } else {
                return {
                    statusCode: 404,
                    message: "Favorites List Is empty"
                }
            }
        }
    )
}
//deleteItemWishlist
const deleteItemWishlist = (id) => {
    return db.Wishlist.deleteOne({ id })
        .then((result) => {
            if (result) {
                return db.Wishlist.find().then(
                    (result) => {
                        if (result) {
                            return {
                                statusCode: 200,
                                wishlist: result
                            }
                        } else {
                            return {
                                statusCode: 404,
                                message: "Favorites  Is empty"
                            }
                        }
                    }
                )
            } else {
                return {
                    statusCode: 404,
                    message: "item not found"
                }
            }
        })
}
module.exports = {
    allProducts,
    viewProduct,
    addtowishlist,
    getWishlist,
    deleteItemWishlist
}
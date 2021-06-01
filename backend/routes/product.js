const  express = require('express')
const router = express.Router();

const { getProducts ,
     newProduct ,
      getSingleProduct , 
      updateProduct ,
      deleteProduct,createProductReview,getProductReviews ,deleteReview, getAdminProducts} = require('../controllers/productController')

 const  {isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth')

// get all products
router.route('/products').get(getProducts);

// Admin routes 
router.route('/admin/products').get(getAdminProducts);

// Specific Product
router.route('/product/:id').get(getSingleProduct);


//admin routes 


router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);

// update product route
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);

// delete product route 

router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);


router.route('/review').put(isAuthenticatedUser,createProductReview);

router.route('/reviews').get(isAuthenticatedUser,getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser,deleteReview);

module.exports = router; 
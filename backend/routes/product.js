const  express = require('express')
const router = express.Router();

const { getProducts ,
     newProduct ,
      getSingleProduct , 
      updateProduct ,
      deleteProduct } = require('../controllers/productController')

 const  {isAuthenticatedUser , authorizeRoles } = require('../middlewares/auth')

// get all products
router.route('/products').get(getProducts);

// Specific Product
router.route('/product/:id').get(getSingleProduct);


//admin routes 


router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);

// update product route
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);

// delete product route 

router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

module.exports = router; 
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

require('dotenv').config();

const uri = ''
console.log('MongoDB URI:', uri);

//insert user, product, and order
const insertData = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected!');

        // Insert a new user
        const user = await User.create({ name: 'Alice', email: 'alice@example.com', password: 'password123' });
        console.log('User created:', user);

        // Insert a new product
        const product = await Product.create({
            name: 'Sticker Pack',
            description: 'A pack of fun stickers.',
            price: 9.99,
            stock: 100,
            imageUrl: 'http://example.com/sticker-pack.jpg'
        });
        console.log('Product created:', product);

        // Insert a new order linked to the user and product
        const order = await Order.create({
            user: user._id,
            orderItems: [{ product: product._id, quantity: 2 }],
            totalPrice: 19.98,
            shippingAddress: { street: '123 Main St', city: 'Sample City', postalCode: '12345', country: 'Sample Country' }, // Added shipping address
            paymentMethod: 'PayPal',  // Added payment method
            paymentResult: {
                id: 'sample_payment_id',
                status: 'Completed',
                update_time: new Date().toISOString(),
                email_address: user.email // Example email
            },
            orderStatus: 'Processing'
        });
        console.log('Order created:', order);

    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

//insert products
const insertProduct = async () => {
    await mongoose.connect(uri);
    console.log('MongoDB connected!');

    const product = await Product.create({
        name: 'Yankees',
        description: "There it goooooeeess, cya!",
        price: 2.99,
        stock: 175,
        imageUrl: ['https://i.ebayimg.com/images/g/qngAAOSwBahh7GJL/s-l960.png'],
        categories: ['Sports', 'Baseball']
    },
    {
        name: 'Star Wars',
        description: "Use the force!",
        price: 1.99,
        stock: 100,
        imageUrl: ['https://i.ebayimg.com/images/g/qngAAOSwBahh7GJL/s-l960.png'],
        categories: ['Movies', 'Sci-Fi']
    },
    {
        name: 'Harry Potter',
        description: "You're a wizard, Harry!",
        price: .99,
        stock: 100,
        imageUrl: ['https://i.ebayimg.com/images/g/qngAAOSwBahh7GJL/s-l960.png'],
        categories: ['Movies', 'Sci-Fi', 'Wizard']
    },
    {
        name: 'Harry Potter',
        description: "You're a wizard, Harry!",
        price: .99,
        stock: 100,
        imageUrl: ['https://i.ebayimg.com/images/g/qngAAOSwBahh7GJL/s-l960.png'],
        categories: ['Movies', 'Sci-Fi', 'Wizard']
    });
    console.log("Products created: ", product);
};


//update stock and categories
const updateAllProducts = async (newStock, newCategories) => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected!');

        const products = await Product.updateMany(
            {},  // Update all documents
            {
                $set: {
                    stock: newStock,
                    categories: newCategories
                }
            }
        );
        
        console.log('All products updated with new stock and categories:', products);
    } catch (error) {
        console.error('Error updating products:', error);
    } finally {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

insertProduct();
//updateAllProducts(500, ['Stickers', 'Trending']);
//insertData();

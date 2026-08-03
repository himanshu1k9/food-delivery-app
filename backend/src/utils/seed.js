const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { sequelize, Menu } = require('../models');

const sampleMenuItems = [
    {
        name: 'Margherita Pizza',
        description: 'Classic pizza topped with fresh mozzarella, basil, and tomato sauce',
        price: 12.99,
        imageURL: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce',
        price: 9.99,
        imageURL: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Creamy Carbonara Pasta',
        description: 'Spaghetti tossed with pancetta, eggs, parmesan, and black pepper',
        price: 14.50,
        imageURL: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Assorted Sushi Platter',
        description: 'Fresh salmon, tuna, and avocado rolls served with ginger and wasabi',
        price: 18.99,
        imageURL: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Street Style Tacos',
        description: 'Three soft corn tortillas filled with seasoned beef, cilantro, and onions',
        price: 8.99,
        imageURL: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with croutons, parmesan, and Caesar dressing',
        price: 7.99,
        imageURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Crispy French Fries',
        description: 'Golden, extra crispy potato fries lightly salted',
        price: 3.99,
        imageURL: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Tonkotsu Ramen',
        description: 'Rich pork bone broth served with noodles, chashu pork, and soft-boiled egg',
        price: 13.99,
        imageURL: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Grilled Ribeye Steak',
        description: 'Tender 10oz ribeye steak cooked to perfection with herb butter',
        price: 24.99,
        imageURL: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Crispy Fried Chicken',
        description: 'Golden fried chicken pieces served with dipping sauce',
        price: 11.49,
        imageURL: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Fluffy Pancakes',
        description: 'Stack of warm pancakes topped with butter and maple syrup',
        price: 8.49,
        imageURL: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Club Sandwich',
        description: 'Triple-decker sandwich loaded with turkey, bacon, lettuce, and tomato',
        price: 10.49,
        imageURL: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Strawberry Ice Cream',
        description: 'Creamy homemade strawberry ice cream served in a glass bowl',
        price: 4.99,
        imageURL: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Glazed Donuts',
        description: 'Box of soft, fresh sweet glazed donuts',
        price: 6.99,
        imageURL: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Loaded Burrito',
        description: 'Flour tortilla stuffed with rice, beans, chicken, guacamole, and salsa',
        price: 10.99,
        imageURL: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'New York Cheesecake',
        description: 'Rich and creamy cheesecake served with fresh berry compote',
        price: 6.49,
        imageURL: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Hot Cappuccino',
        description: 'Freshly brewed espresso with steamed milk and rich foam',
        price: 4.25,
        imageURL: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Berry Smoothie',
        description: 'Refreshing blend of blueberries, strawberries, yogurt, and honey',
        price: 5.49,
        imageURL: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet served with lemon and steamed vegetables',
        price: 19.99,
        imageURL: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
    },
    {
        name: 'Belgian Waffles',
        description: 'Crisp belgian waffles topped with fresh berries and powdered sugar',
        price: 8.99,
        imageURL: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80'
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected for seeding...');

        // force: true drops existing tables and recreates them
        await sequelize.sync({ force: true });
        console.log('Tables recreated successfully.');

        await Menu.bulkCreate(sampleMenuItems);
        console.log('Database successfully seeded with menu items!');

        process.exit(0);
    } catch (error) {
        console.error('Failed to seed database:', error);
        process.exit(1);
    }
};

seedDatabase();
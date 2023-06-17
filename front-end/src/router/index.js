import { createBrowserRouter } from 'react-router-dom'
import Error from 'pages/Error'
import App from 'App'
import AdminPage from 'pages/Admin/AdminPage'
import Shops from 'pages/Admin/Shops'
import Products from 'pages/Admin/Products'
import Attributes from 'pages/Admin/Attributes'
import Users from 'pages/Admin/Users'
import Commoditys from 'pages/Admin/Commoditys'
import Categories from 'pages/Admin/Categories'
import Settings from 'pages/Admin/Settings'
import FaqPage from 'pages/Client/FaqPage'
import ProfilePage from 'pages/Client/ProfilePage'
import CreateUsers from 'pages/Admin/CreateUsers'
import ProfileUpdate from 'pages/Admin/ProfileUpdate'
import LoginAdmin from 'pages/Admin/LoginAdmin'
import RegisterAdmin from 'pages/Admin/RegisterAdmin'
import ContactPage from 'pages/Client/ContactPage'
import CreateProduct from 'pages/Seller/CreateProduct'
import ShopPage from 'pages/Client/ShopPage'
import OfferPage from 'pages/Client/OfferPage'
import InfoShop from 'pages/Client/InfoShop'
import ChangePassSection from 'components/Sections/Client/ChangePassSection'
import WishListSection from 'components/Sections/Client/WishListSection'
import QuestionSection from 'components/Sections/Client/QuestionSection'
import DownloadSection from 'components/Sections/Client/DownloadSection'
import CreateShop from 'pages/Admin/CreateShop'
import InfoShopAdmin from 'pages/Admin/InfoShopAdmin'
import SellerPage from 'pages/Seller/SellerPage'
import EditShop from 'pages/Seller/EditShop'
import ProductsShop from 'pages/Seller/ProductsShop'
import CategorySeller from 'pages/Seller/CategorySeller'
import ReviewSeller from 'pages/Seller/ReviewSeller'
import CreateCategory from 'pages/Seller/CreateCategory'
import MyShop from 'pages/Admin/MyShop'
import CreateCommodity from 'pages/Admin/CreateCommodity'
import EditProduct from 'pages/Seller/EditProduct'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: 'faq',
                element: <FaqPage />
            },
            {
                path: 'profile',
                element: <ProfilePage />,
                children: [
                    {
                        path: 'changepass',
                        element: <ChangePassSection />
                    },
                    {
                        path: 'order',
                        element: 'order'
                    },
                    {
                        path: 'download',
                        element: <DownloadSection />
                    },
                    {
                        path: 'wishlist',
                        element: <WishListSection />
                    },
                    {
                        path: 'question',
                        element: <QuestionSection />
                    },
                    {
                        path: 'refund',
                        element: 'refund'
                    },
                    {
                        path: 'report',
                        element: 'report'
                    },
                    {
                        path: 'card',
                        element: 'card'
                    },
                ]
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'shops',
                element: <ShopPage />
            },
            {
                path: 'shops/:id',
                element: <InfoShop />
            },
            {
                path: 'offers',
                element: <OfferPage />
            },
            {
                path: 'createshop',
                element: <CreateShop />
            },
        ]
    },
    {
        path: '/admin',
        element: <AdminPage />,
        errorElement: <Error />,
        children: [
            {
                path: 'shops',
                element: <Shops />
            },
            {
                path: 'myshop',
                element: <MyShop />
            },
            {
                path: 'shops/:id',
                element: <InfoShopAdmin />
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'attributes',
                element: <Attributes />
            },
            {
                path: 'commoditys',
                element: <Commoditys />
            },
            {
                path: 'commoditys/add',
                element: <CreateCommodity />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'users/create',
                element: <CreateUsers />
            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'settings',
                element: <Settings />
            },
        ]
    },
    {
        path: '/seller',
        element: <SellerPage />,
        errorElement: <Error />,
        children: [
            {
                path: 'shop/update/:id',
                element: <EditShop />
            },
            {
                path: 'products',
                element: <ProductsShop />
            },
            {
                path: 'products/update/:id',
                element: <EditProduct />
            },
            {
                path: 'products/add',
                element: <CreateProduct />
            },
            {
                path: 'category',
                element: <CategorySeller />
            },
            {
                path: 'category/add',
                element: <CreateCategory />
            },
            {
                path: 'reviews',
                element: <ReviewSeller />
            },
        ]
    },
    {
        path: '/admin/profile-update',
        element: <ProfileUpdate />
    },
    {
        path: '/admin/login',
        element: <LoginAdmin />
    },
    {
        path: '/admin/register',
        element: <RegisterAdmin />
    },
])

export default router
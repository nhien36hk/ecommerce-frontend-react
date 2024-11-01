import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProduct from "../components/TypeProduct/TypeProduct";
import TypeProductsPage from "../pages/TypeProductsPage/TypeProductsPage";
import ProductDetailPage from "../pages/ProductDetailsPage/ProductDetailsPage";
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    // {
    //     path: '/my-order',
    //     page: MyOrderPage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/details-order/:id',
    //     page: DetailsOrderPage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/payment',
    //     page: PaymentPage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/orderSuccess',
    //     page: OrderSucess,
    //     isShowHeader: true
    // },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/:type',
        page: TypeProductsPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details',
        page: ProductDetailPage,
        isShowHeader: true
    },
    // {
    //     path: '/profile-user',
    //     page: ProfilePage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/system/admin',
    //     page: AdminPage,
    //     isShowHeader: false,
    //     isPrivated: true
    // },
    {
        path: '*',
        page: NotFoundPage
    }
]

//       path: '/',
//       element: <HomePage />,
//     },
//     {
//       path: '/order',
//       element: <OrderPage />,
//     },
//     {
//       path: '/products',
//       element: <ProductsPage />,
//     },
//     {
//       path: '/sign-in',
//       element: <SignInPage />,
//       isShowHeader: false
  
//     },
//     {
//       path: '/sign-up',
//       element: <SignUpPage />,
//       isShowHeader: false
//     },
//     {
//       path: '/product-details',
//       element: <ProductDetailsPage />,
//     },
//     {
//       path: '/:type',
//       element: <TypeProductsPage />,
//     },
//     {
//       path: '*',
//       element: <NotFoundPage />,
//     },
//   ];
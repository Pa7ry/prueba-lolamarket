const routes = {
    home: '/',
    marketList: '/tienda',
    marketId: '/tienda/:id',
    productList: '/tienda/:id/:categoryId/:subcategoryId',
    categoryProductList: '/tienda/:id/:categoryId/',
};

export type Routes = typeof routes;

export default routes;

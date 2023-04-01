import React, { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import { useLocation } from 'react-router-dom';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import App from "../../components/Templates/App";
import ProductsList from '../../components/Templates/ProductsList/ProductsList';
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";

import './ProductSearchList.scss';

const INIT_BREADCRUMB = [{
    text: 'Resultado Búsqueda',
}];

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductSearchList = () => {
    let query = useQuery();
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productsList, setProductsList] = useState<ProductI[]>([]);
    const [productToShow, setProductToShow] = useState<ProductI[]>([]);
    
    useEffect(() => {
        if (productsList.length === 0) {
            getProductsList();
        } 
    }, []);
    
    const findProductsBySearch = (query: string, products: ProductI[]) => {
        const result: any[] = [];
        if (products.length > 0) {
            products.forEach((product: ProductI) => {
                if (product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
                    result.push(product);
                }
            });
        }
        setBreadcrumb([
            ...INIT_BREADCRUMB,
            { text: query }
        ]);
        return result.slice(0, 4);
    }

    const getProductsList = async () => {
        const response = await FakeStoreService.getProducts();
        if (response.statusCode === 200 && response.data) {
            setProductsList(response.data);
            setProductToShow(findProductsBySearch(query.get('search') || '', response.data));
        }
    }

    return (
        <App>
            <Breadcrumb items={breadcrumb} />
            {productToShow.length > 0
                ? <ProductsList products={productToShow} /> : <Skeleton active />}
        </App>
    );
};

export default ProductSearchList;
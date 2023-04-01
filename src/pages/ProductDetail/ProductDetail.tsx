import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { Helmet } from 'react-helmet';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import Button from "../../components/Atoms/Button/Button";
import App from "../../components/Templates/App";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";

import './ProductDetail.scss';

const INIT_BREADCRUMB = [{
    text: 'Todos los productos',
}];

const ProductDetail = () => {
    let { id } = useParams();
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productsList, setProductsList] = useState<ProductI[]>([]);
    const [productToShow, setProductToShow] = useState<ProductI>();
    const navigate = useNavigate();
    useEffect(() => {
        if (productsList.length === 0) {
            getProductsList();
        }
        if (id) getProductById();
    }, []);

    const getProductsList = async () => {
        const response = await FakeStoreService.getProducts();
        if (response.statusCode === 200 && response.data) {
            setProductsList(response.data);
        }
    }

    const getProductById = async () => {
        if (id) {
            const response = await FakeStoreService.getProductById(id);
            if (response?.statusCode === 200 && response.data) {
                setProductToShow(response.data[0]);
                setBreadcrumb([
                    ...INIT_BREADCRUMB,
                    { text: `${response.data[0].category_id}`},
                    { text: response.data[0].title},
                ])
            } else {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    };

    const buyProductOnClick = () => {
        console.log('clicked on buy product button');
    };

    return (
        <App>
            <Helmet>
                <title>{productToShow?.title ?? 'Mercado Libre'}</title>
                <meta charSet="utf-8" />
                <meta name="description" content={productToShow?.description?.slice(0,200) ?? productToShow?.title ?? ''} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={productToShow?.title ?? 'Mercado Libre'} />
                <meta property="og:description" content={productToShow?.description?.slice(0,200) ?? productToShow?.title ?? ''} />
                { /* End Facebook tags */ }
                { /* Twitter tags */ }
                <meta name="twitter:creator" content={'Julian Perez'} />
                <meta name="twitter:card" content="article" />
                <meta name="twitter:title" content={productToShow?.title ?? 'Mercado Libre'} />
                <meta name="twitter:description" content={productToShow?.description?.slice(0,200) ?? productToShow?.title ?? ''} />
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Breadcrumb items={breadcrumb} />
            {productToShow ? (
                <div className="product-detail-container">
                    <div className="main-container">
                        <div className="left-side-container">
                            <img src={productToShow.picture} alt={productToShow.title} />
                        </div>
                        <div className="main-description-container">
                            <span className="main-category">{productToShow.category_id}</span>
                            <h1 className="main-title">{productToShow.title}</h1>
                            <h2 className="main-price">$ {productToShow.price.amount} {productToShow.price.currency}</h2>
                            <div className="buy-button-container">
                                <Button text="Comprar" onClick={buyProductOnClick} block />
                            </div>
                        </div>
                    </div>
                    <div className="description-container">
                        <h3 className="description-title">Descripción del producto</h3>
                        <p className="description-text">{productToShow.description}</p>
                    </div>
                </div>
            ) : (<Skeleton active />)}
        </App>
    );
};

export default ProductDetail;
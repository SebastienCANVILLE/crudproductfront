import React from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './components/products';


export default function App() {
  return (

    <>

      <div className=" container text-bg-primary p-1">
        <h3>Produit</h3>
      </div>

      <Product></Product>

    </>
    
  );
}


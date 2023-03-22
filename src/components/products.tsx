import { useState, useEffect } from "react";
import Techproduct from "./product";

type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number,

}

export default function Product() {

    const [nameInput, setNameInput] = useState("")
    const [pricenameInput, setPriceInput] = useState(0)
    const [quantityInput, setQuantityInput] = useState(0)

    const [products, setProducts] = useState<Product[]>([]);

    async function fetchDataRegister() {

        // body du register sur la partie html
        const body = {
            name: nameInput,
            price: pricenameInput,
            quantity: quantityInput

        }

        // Options de requêtes et envoi des données des input en BDD
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        const response = await fetch('http://localhost:8000/product', requestOptions);
        const responseJson = await response.json();
        console.log(responseJson);

        if (responseJson.statusCode === 201) {
            resetInput()
            setProducts([...products, responseJson.data])
        }

        else {
            return
        }

    }

    function resetInput() {

        setNameInput("")
        setPriceInput(0)
        setQuantityInput(0)

    }

    useEffect(() => {
        async function getProducts() {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }

            const response = await fetch('http://localhost:8000/product', requestOptions)
            const responseJson = await response.json();
            console.log(responseJson);
            setProducts(responseJson.data);
        };
        getProducts()
    }, []);


    function deleteProduct(id: number) {

        const filterproduct = products.filter(product => product.id !== id)
        setProducts(filterproduct);

    }


    function patchProduct(item: Product) {

        const filterproduct = products.findIndex(elm => elm.id === item.id);
        products[filterproduct] = item;
        setProducts([...products]);

    }

    return (

        <div className="container text-center">

            <table className="table">

                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody className="table-group-divider">
                    {products?.map(product =>
                        <Techproduct delete={deleteProduct} patch={patchProduct} product={product} key={product.id}></Techproduct>
                    )}
                </tbody>

            </table>

            <div className="container input-add">

                <div className="row-fluid input-group mb-3">

                    <div className="col-12 col-md-4">
                        <span className="input-group-text">Nom</span>
                        <input type='text' className="form-control" value={nameInput} onChange={(event) => setNameInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    </div>

                    <div className="col-12 col-md-4">
                        <span className="input-group-text">Prix</span>
                        <input type='text' className="form-control" value={pricenameInput} onChange={(event) => setPriceInput(+event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    </div>

                    <div className="col-12 col-md-4">
                        <span className="input-group-text">Quantité</span>
                        <input type='text' className="form-control" value={quantityInput} onChange={(event) => setQuantityInput(+event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                    </div>

                    <div className="col-12 mt-2">
                        <button onClick={() => fetchDataRegister()} type="button" className="btn btn-primary">Ajouter</button>
                    </div>
                </div>

            </div>
        </div>

    )
}

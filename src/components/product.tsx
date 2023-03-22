import { useState } from "react";

export default function Techproduct(props: any) {

    const [nameInput, setNameInput] = useState("")
    const [pricenameInput, setPriceInput] = useState(0)
    const [quantityInput, setQuantityInput] = useState(0)

    const [showInput, setShowInput] = useState(false);

    async function deleteProduct() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await fetch(`http://localhost:8000/product/${props.product.id}`, requestOptions)
        const responseJson = await response.json()
        console.log(responseJson)

        if (responseJson.statusCode === 200) {
            props.delete(props.product.id)
        }

    }

    function updateProduct() {
        setShowInput(true)
    }


    async function patchProduct() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameInput,
                price: pricenameInput,
                quantity: quantityInput
            })
        };

        const response = await fetch(`http://localhost:8000/product/${props.product.id}`, requestOptions)
        const responseJson = await response.json()
        console.log(responseJson)

        if (responseJson.statusCode === 200) {
            props.patch(responseJson.data)
            setShowInput(false)
            setNameInput("")
            setPriceInput(0)
            setQuantityInput(0)
        }

        else {
            return
        }
    }

    function update() {
        setShowInput(true)
    }

    return (

        <>
            <tr key={props.product.id}>
                <td>{props.product.id}</td>
                <td>{props.product.name}</td>
                <td>{props.product.price}</td>
                <td>{props.product.quantity}</td>
                <td>

                    <button onClick={updateProduct} type="button" className="btn btn-sm btn-warning mx-1 h4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </button>

                    <button onClick={deleteProduct} type="button" className="btn btn-sm btn-danger mx-1 h4" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </button>
                </td>

            </tr>
            {showInput && <tr>

                <td></td>

                <td>
                    <input type='text' className="form-control" value={nameInput} onChange={(event) => setNameInput(event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </td >

                <td>
                    <input type='text' className="form-control" value={pricenameInput} onChange={(event) => setPriceInput(+event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </td>

                <td>
                    <input type='text' className="form-control" value={quantityInput} onChange={(event) => setQuantityInput(+event.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </td>

                <td>
                    <button onClick={patchProduct} type="button" className="btn btn-primary">Valider</button>
                </td>

            </tr >}

        </>

    )
}
const socket = io();

const formAdd = document.getElementById("formAdd");
const formEdit = document.getElementById("formEdit");
const formDelete = document.getElementById("formDelete");
const productContainer = document.getElementById("productContainer");

const addProductTitle = document.getElementById("productTitle");
const addProductPrice = document.getElementById("productPrice");
const addProductDescription = document.getElementById("productDesc");
const addProductStock = document.getElementById("productSt");
const addProductCategory = document.getElementById("productCategory");
const addProductStatus = document.getElementById("productStatus");
const addProductCode = document.getElementById("productCode");
const addBtn = document.getElementById("botonAdd");   



async function getProducts() {
    const res = await fetch("/api/v1/products");
    const data = await res.json();
    return data;
}

async function addProduct(product) {
    const res = await fetch("/api/v1/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}


addBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const product = {
        title: addProductTitle.value,
        price: addProductPrice.value,
        description: addProductDescription.value,
        stock: addProductStock.value,
        category: addProductCategory.value,
        
        status: addProductStatus.value,
        code: addProductCode.value,
    };
    await addProduct(product);
    //socket.emit("addProduct", product);
    addProductTitle.value = "";
    addProductPrice.value = "";
    addProductDescription.value = "";
    addProductStock.value = "";
    addProductCategory.value = "";
    addProductStatus.value = "";
    addProductCode.value = "";
});

// socket.on("productAdded", (data) => {
//     if (data.error) {
//         alert(data.error);
//     } else {
//         productContainer.innerHTML += `
//         <div>
//             <h3> ${data.title} </h3>
//             <p>description: ${data.description} </p>
//             <p>code: ${data.code} </p>
//             <p>price: ${data.price}</p>
//             <p>status: ${data.status} </p>
//             <p>category: ${data.category}</p>
//             <p>stock: ${data.stock}</p>
//         </div>
//         `;
//     }
// });


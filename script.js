let cart = JSON.parse(localStorage.getItem("allItems")) || [];

displayCart();

const newItemName = document.getElementById("newName");
const newItemPrice = document.getElementById("newPrice");
const newItemDesc = document.getElementById("newDesc");

function addItem() {
  var item = document.getElementById("itemName").value;
  var price = document.getElementById("itemPrice").value;
  var desc = document.getElementById("itemDescription").value;

  if (item === "" || price === "" || desc === "") {
    errorMsg.style.display = "block";
  } else {
    errorMsg.style.display = "none";
    var cartObj = { item, price, desc };
    console.log(cart);
    cart.push(cartObj);
    localStorage.setItem("allItems", JSON.stringify(cart));
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemDescription").value = "";
    displayCart();
  }
}
function deleteItem(index) {
  var confirmation = confirm(
    "Are you sure you want to delete? This action is irreversible."
  );
  if (confirmation == true) {
    cart.splice(index, 1);
    localStorage.setItem("allItems", JSON.stringify(cart));
    displayCart();
  } else {
    displayCart();
  }
}

function editItem(index) {
  newItemName.value = cart[index].item;
  newItemPrice.value = cart[index].price;
  newItemDesc.value = cart[index].desc;

  const saveBtn = document.getElementById("saveedit");

  saveBtn.addEventListener("click", () => {
    editValues(index);
  });
}
function editValues(index) {
  let cartItem = {
    item: newItemName.value,
    price: newItemPrice.value,
    desc: newItemDesc.value,
  };

  newItemName.value = "";
  newItemPrice.value = "";
  newItemDesc.value = "";
  cart.splice(index, 1, cartItem);
  localStorage.setItem("allItems", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const tableBody = document.getElementById("tabbody");
  tableBody.innerHTML = "";

  for (i = 0; i < cart.length; i++) {
    tableBody.innerHTML += `<tr>
      <td>${i + 1}</td>
      <td>${cart[i].item}</td>
      <td>${cart[i].price}</td>
      <td>${cart[i].desc}</td>
      <td> <button onclick="deleteItem(${i})" class="btn btn-sm btn-danger">Delete</button></td>
      <td> <button onclick="editItem(${i})" type="button" class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
    </tr>`;
  }
}
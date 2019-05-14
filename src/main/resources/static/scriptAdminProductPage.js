let mainUrl = "http://localhost:8080";
// let mainUrl = "http://localhost:8000";

getAllProducts();

setModalConfiguration();
setModalCategoryConfiguration();
setModalUpdateConfiguration();
setModalImgConfiguration();

// setActionOnImgProductsButtons();

setActionOnUpdateProductButtons();
setActionOnUpdateButton();

setActionOnCreateBtn();

setActionImg2();
function setActionImg2() {
    $('#img2').click(function () {
        document.getElementById('imgModal').style.display = "block";
    })
}

//start when load page PS reload page for triggered http request
function getAllProducts() {
    $.ajax({
        url: mainUrl + "/product/page?direction=ASC&fieldName=name&page=0&size=1000",
        type: "GET",
        contentType: "application/json",
        success: function (dataResponse) {
            setProductsToTable(dataResponse.data);
            setActionOnDeleteButtons();
            setActionOnUpdateProductButtons();
            setActionOnImgProductsButtons();
        },
        error: function (error) {
            console.log(error.message);
        }
    });
}

function setProductsToTable(products) {
    for (var i = 0; i < products.length; i++) {
        setProductToTable(products[i]);
    }
}

function setProductToTable(product) {
    var tableOfProducts = $("#products");
    tableOfProducts.append('<tr>' +
        '<td>' + product.name + '</td>' +
        '<td>' + product.timeMinutes + '</td>' +
        '<td>' + product.price + '</td>' +
        '<td>' + product.categoryName + '</td>' +
        '<td>' +
            // '<a href="' + mainUrl + '/img/' + product.pathToImage + '" target="_blank">' +
                '<button class="img-button" value="' + product.id + '">' +
                    'Переглянути зображення' +
                '</button>' +
            // '</a>' +
        '</td>' +
        // '<td><button class="imgButton" value="' + product.id + '">Зображення</button></td>' +
        '<td><button class="button" value="' + product.id + '">Видалити</button></td>' +
        '<td><button class="buttonUpdate" value="' + product.id + '">Оновити</button></td>' +
        '</tr>');
}

//delete process
function setActionOnDeleteButtons() {
    $(".button").each(function (index) {
        $(this).click(function () {
            $.ajax({
                url: mainUrl + "/product?id=" + $(this).val(),
                type: "DELETE",
                success: function (data) {
                    location.reload();
                },
                error: function (error) {
                    console.log(error.message);
                }
            });
        })
    })

}

//update process
function setActionOnUpdateButton() {
    $("#btnUpdateButton").click(function(){
        let file = document.getElementById("getFileUpdate").files[0];
        getBase64(file).then(data => {

            let product = {
                "productId": $("#productId").val(),
                "categoryId": $("#categoryIdUpdate").val(),
                "fileRequest": {
                    "fileName": $("#nameUpdate").val(),
                    "data": data
                },
                "name": $("#nameUpdate").val(),
                "price": $("#priceUpdate").val(),
                "timeMinutes": $("#timeMinutesUpdate").val()
            };

            $.ajax({
                url: mainUrl + "/product?id=" + $("#productId").val(),
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(product),
                success: function (data) {
                    console.log(data);
                    location.reload();
                    alert("Послугу оновлено");
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    });
}

function setActionOnCreateBtn() {
    $("#btnCreateProduct").click(function(){
        let file = document.getElementById("getFile").files[0];
        getBase64(file).then(data => {

            let product = {
                "categoryId": $("#categoryId").val(),
                "fileRequest": {
                    "fileName": $("#name").val(),
                    "data": data
                },
                "name": $("#name").val(),
                "price": $("#price").val(),
                "timeMinutes": $("#timeMinutes").val()
            };

            $.ajax({
                url: mainUrl + "/product",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(product),
                success: function (data) {
                    console.log(data);
                    location.reload();
                },
                error: function (error) {
                    alert(error);
                    console.log(error);
                }
            });
        });
    });
}

function setActionOnImgProductsButtons() {
    $(".img-button").each(function (index) {
        $(this).click(function () {
            getImgProduct($(this).val());
        })
    })
}

function getImgProduct(id) {
    $('#img-container').html('');
    $.ajax({
        url: mainUrl + "/product/findById?id=" + id,
        type: "GET",
        contentType: "application/json",
        success: function (product) {
            $('#img-container').append('<img class="product-image" src="' + mainUrl + '/img/' + product.pathToImage + '">')
            document.getElementById('imgModal').style.display = "block";
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function setActionOnUpdateProductButtons() {
    $(".buttonUpdate").each(function (index) {
        $(this).click(function () {
            $('#productId').val($(this).val());
            // дописати функцію яка повертає один продукт за id, щоб можна було відразу підставити при кліку в інпути старі значення
            getProductById($(this).val());
            document.getElementById('modalUpdate').style.display = "block";
        })
    })
}

function getProductById(id) {
    $.ajax({
        url: mainUrl + "/product/findById?id=" + id,
        type: "GET",
        contentType: "application/json",
        success: function (product) {
            $("#nameUpdate").val(product.name);
            $("#timeMinutesUpdate").val(product.timeMinutes);
            $("#priceUpdate").val(product.price);
            $("#categoryNameUpdate").val(product.categoryName);
        },
        error: function (error) {
            console.log(error.message);
        }
    });
}

function getCategoryById(id) {
    $.ajax({
        url: mainUrl + "/category/findById?id=" + id,
        type: "GET",
        contentType: "application/json",
        success: function (category) {
            $("#categoryNameUpdate").val(category.name);
        },
        error: function (error) {
            console.log(error.message);
        }
    });
}

function getAllCategories() {
    $.ajax({
        url: mainUrl + "/category/page?direction=ASC&fieldName=name&page=0&size=100",
        type: "GET",
        contentType: "application/json",
        success: function (dataResponse) {
            setCategoriesToTable(dataResponse.data);
            setActionOnSelectCategoryButtons();
        },
        error: function (error) {
            console.log(error.message);
        }
    });
}

function setCategoriesToTable(categories) {
    $('#elements').html('');
    for (var i = 0; i < categories.length; i++) {
        setCategoryToTable(categories[i]);
    }
}

function setCategoryToTable(category) {
    var tableOfCategories = $("#elements");
    tableOfCategories.append('<tr>' +
        '<td>' + category.id + '</td>' +
        '<td>' + category.name + '</td>' +
        '<td><button class="button" value="' + category.id + '">Вибрати</button></td>' +
        '</tr>');
}

function setActionOnSelectCategoryButtons() {
    $(".button").each(function (index) {
        $(this).click(function () {
            var id = $(this).val();
            $('#categoryId').val(id);
            $('#categoryIdUpdate').val(id);
            getCategoryById(id);
            document.getElementById('modalCategory').style.display = "none";
            if (!(document.getElementById('myModal').style.display === "block")) {
                if(document.getElementById('modalUpdate').style.display === "none"){
                    document.getElementById('modalUpdate').style.display = "block";
                }
            }
        })
    })
}

function setModalConfiguration() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("openModal");

    // Get the <span> element that closes the modal
    var span = document.getElementById("closeModal");

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function setModalCategoryConfiguration() {
    // Get the modal
    var modalCategory = document.getElementById('modalCategory');
    var modalUpdate = document.getElementById('modalUpdate');

    // Get the button that opens the modal
    var btn = document.getElementById("selectCategory");
    var btn2 = document.getElementById("selectCategoryUpdate");

    // Get the <span> element that closes the modal
    var span = document.getElementById("closeModalCategory");

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modalCategory.style.display = "block";
        getAllCategories();
    };
    btn2.onclick = function () {
        modalCategory.style.display = "block";
        modalUpdate.style.display = "none";
        getAllCategories();
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modalCategory.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modalCategory) {
            modalCategory.style.display = "none";
        }
    };
}

//конфіг для модального вікна оновлення
function setModalUpdateConfiguration() {
    // Get the modal
    var modal = document.getElementById('modalUpdate');

    // Get the button that opens the modal
    // var btn = document.getElementById("openModal");

    // Get the <span> element that closes the modal
    var span = document.getElementById('closeModalUpdate');

    // When the user clicks the button, open the modal
    // btn.onclick = function () {
    //     modal.style.display = "block";
    // };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function setModalImgConfiguration() {
    // Get the modal
    var modal = document.getElementById('imgModal');

    // Get the <span> element that closes the modal
    var span = document.getElementById('closeImgModal');

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });
}
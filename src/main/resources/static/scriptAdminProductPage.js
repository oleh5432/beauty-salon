var mainUrl = "http://localhost:8080";

getAllProducts();

setModalConfiguration();
setModalCategoryConfiguration();
setModalUpdateConfiguration();

setActionOnUpdateProductButtons();
setActionOnUpdateButton();

setActionOnCreateBtn();


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
        // '<td>' + product.startTime + '</td>' +
        '<td>' + product.price + '</td>' +
        '<td>' + product.categoryName + '</td>' +
        // '<td>' + product.img + '</td>' +
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
    $("#btnUpdateButton").click(function () {

        var name = $("#nameUpdate").val();
        var timeMinutes = $("#timeMinutesUpdate").val();
        // var startTime = $("#startTime").val();
        var price = $("#priceUpdate").val();
        var categoryId = $("#categoryIdUpdate").val();
        // var img = $("#imgUpdate").val();

        var newProduct = {
            "name": name,
            "timeMinutes": timeMinutes,
            // "startTime": startTime,
            "price": price,
            "categoryId": categoryId,
            // "img": img
        };

        $.ajax({
            // url: mainUrl + "/product?id=" + $(#productId).val(),
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(newProduct),
            success: function (data) {
                location.reload();
            },
            error: function (error) {
                console.log(error.message);
            }
        });
//            } else {
//                alert("Всі поля повинні бути заповнені")
//            }
    });

}

function setActionOnCreateBtn() {
    $("#btnCreateProduct").click(function () {

        var name = $("#name").val();
        var timeMinutes = $("#timeMinutes").val();
        // var startTime = $("#startTime").val();
        var price = $("#price").val();
        var categoryId = $("#categoryId").val();
        // var img = $("#img").val();

        var newProduct = {
            "name": name,
            "timeMinutes": timeMinutes,
            // "startTime": startTime,
            "price": price,
            "categoryId": categoryId,
            // "img": img
        };

        $.ajax({
            url: mainUrl + "/product",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(newProduct),
            success: function (data) {
                location.reload();
            },
            error: function (error) {
                console.log(error.message);
            }
        });
//            } else {
//                alert("Всі поля повинні бути заповнені")
//            }
    });
}

function setActionOnUpdateProductButtons() {
    $(".buttonUpdate").each(function (index) {
        $(this).click(function () {
            $('#productId').val($(this).val());
            // дописати функацію яка повертає один продукт за id, щоб можна було відразу підставити при кліку в інпути старі значення
            document.getElementById('modalUpdate').style.display = "block";
        })
    })
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
            $('#categoryId').val($(this).val());
            $('#categoryIdUpdate').val($(this).val());
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
        if (event.target == modal) {
            modal.style.display = "none";
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
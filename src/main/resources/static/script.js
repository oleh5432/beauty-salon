var mainUrl = "http://localhost:8080";

getAllProducts();

setModalConfiguration();
setModalCategoryConfiguration()

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
        '<td><button class="button" value="' + product.id + '">Видалити</button></td>' +
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

function setActionOnCreateBtn() {
    $("#btnCreateProduct").click(function () {

        var name = $("#name").val();
        var timeMinutes = $("#timeMinutes").val();
        // var startTime = $("#startTime").val();
        var price = $("#price").val();
        var categoryId = $("#categoryId").val();

        var newProduct = {
            "name": name,
            "timeMinutes": timeMinutes,
            // "startTime": startTime,
            "price": price,
            "categoryId": categoryId
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

function getAllCategories() {
    $.ajax({
        url: mainUrl + "/category/page?direction=ASC&fieldName=name&page=0&size=100",
        type: "GET",
        contentType: "application/json",
        success: function (dataResponse) {
            setCategoriesToTable(dataResponse.data);
            setActionOnSelectCategoryButtons();
            // setActionOnDeleteButtons();
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
            document.getElementById('modalCategory').style.display = "none";
        })
    })
}

function setModalConfiguration() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("openModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

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
    var modal = document.getElementById('modalCategory');

    // Get the button that opens the modal
    var btn = document.getElementById("selectCategory");

    // Get the <span> element that closes the modal
    var span = document.getElementById("closeModalCategory");

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
        getAllCategories();
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

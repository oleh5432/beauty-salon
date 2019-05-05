var mainUrl = "http://localhost:8080";

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
            '<a href="' + mainUrl + '/img/' + product.pathToImage + '" target="_blank">' +
                '<button class="img-button" value="' + product.id + '" onclick="getImg(' + mainUrl + '/img/' + product.pathToImage + ')">' +
                    'Переглянути зображення' +
                '</button>' +
            '</a>' +
        '</td>' +
        // '<td><button class="imgButton" value="' + product.id + '">Зображення</button></td>' +
        '<td><button class="button" value="' + product.id + '">Видалити</button></td>' +
        '<td><button class="buttonUpdate" value="' + product.id + '">Оновити</button></td>' +
        '</tr>');
}

// function getImg(pathToImg) {
//     $('#img-container').html('');
//     $('#img-container').append('<img src="' + pathToImg + '"  alt="no img">');
//     document.getElementById('imgModal').style.display = "block";
// }

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

        var productId = $("#productId").val();
        var name = $("#nameUpdate").val();
        var timeMinutes = $("#timeMinutesUpdate").val();
        // var startTime = $("#startTime").val();
        var price = $("#priceUpdate").val();
        var categoryId = $("#categoryIdUpdate").val();
        var fileRequest = getFile("sendFileUpdate");

        var newProduct = {
            "name": name,
            "timeMinutes": timeMinutes,
            // "startTime": startTime,
            "price": price,
            "categoryId": categoryId,
            "fileRequest": fileRequest
        };

        $.ajax({
            url: mainUrl + "/product?id=" + productId,
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

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    $("#btnCreateProduct").click(function () {

        let name = $("#name").val();
        let timeMinutes = $("#timeMinutes").val();
        let price = $("#price").val();
        let categoryId = $("#categoryId").val();
        let file = document.getElementById("getFile").files[0];
        let newProduct = {};

        getBase64(file).then(data => {
            if (file != null) {
                 newProduct = {
                    "name": name,
                    "timeMinutes": timeMinutes,
                    "price": price,
                    "categoryId": categoryId,
                    "fileRequest": {
                        fileName: name,
                        data: data
                    }
                };
            }else {
                newProduct = {
                    "name": name,
                    "timeMinutes": timeMinutes,
                    "price": price,
                    "categoryId": categoryId,
                    "fileRequest": {
                        fileName: name,
                        data: data
                    }
                };
            }
        });

        $.ajax({
            url: mainUrl + "/product/save",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(newProduct),
            success: function (data) {
                location.reload();
                alert("Послуга створена");
                document.getElementById('myModal').style.display = "none";
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
}

// function setActionOnImgProductsButtons() {
//     $(".img-button").each(function (index) {
//         $(this).click(function () {
//             getImgProduct($(this).val());
//             document.getElementById('imgModal').style.display = "block";
//         })
//     })
// }

// document.getElementById('myModal').style.display = "none";

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

// function getImgProduct(id) {
//     $('#img-container').html('');
//     $.ajax({
//         url: mainUrl + "/product/findById?id=" + id,
//         type: "GET",
//         contentType: "application/json",
//         success: function (product) {
//             $('#img-container').append('<img class="product-image" src="' + mainUrl + '/img/' + product.pathToImage + '">')
//         },
//         error: function (error) {
//             console.log(error.message);
//         }
//     });
// }

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
            // $("#getFileUpdate").val(product.fileRequest);
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

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//     });
// }

// function getFile(elementId) {
//     document.getElementById(elementId).onclick = function(){
//         let file = document.getElementById("getFile").files[0];
//         let request = {
//             fileName:  $("#name").val(),
//             data: getBase64(file)
//         }
//         return request;
//     };
// }

// function getFile(elementId) {
//     document.getElementById(elementId).onclick = function(){
//         let file = document.getElementById("getFile").files[0];
//         getBase64(file).then(data => {
//
//             //work with data as src of file
//             let request = {
//                 // fileName:  $("#name").val(),
//                 data: data
//             }
//             return request;
//         });
//         getBase64(file).then()
//     };
// }

// document.getElementById("sendFile").onclick = function(){
//     let file = document.getElementById("getFile").files[0];
//     getBase64(file).then(data => {
//
//         //work with data as src of file
//         let request = {
//             //fileName: "someCustomFileName",
//             data: data
//         }
//         $.ajax({
//             url: "http://localhost:8080/upload",
//             type: "POST",
//             contentType: "application/json",
//             data: JSON.stringify(request),
//             success: function (data) {
//                 addImgToContainer(data);
//             },
//             error: function (error) {
//                 alert(error.message);
//             }
//         });
//     });
// };


// function addImgToContainer(fileName) {
//     let img = document.createElement('img');
//     img.setAttribute('src', '/img/' + fileName);
//     document.getElementById('uploaded-images').appendChild(img);
// }
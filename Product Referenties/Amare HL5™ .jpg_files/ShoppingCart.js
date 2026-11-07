define(["jquery", "helper", "ajax"], function ($, helper, ajax) {

    var sideCart = '#view-shopping-sidecart';

    function openCloseCart() {
        var autoHideCart = true;

        if (autoHideCart === true) {
            $(".shopping-cart").toggleClass("show");
            $(".shopping-drawer").toggleClass("show");
            //$("body").toggleClass("stop-scrolling");
            if ($(".shopping-cart").hasClass("show")) {
                document.getElementById("toggle_div").style.display = "block";
                document.getElementById("toggle_div").style.backgroundColor = "rgba(0, 0, 0, 0.4)";
            } else {
                document.getElementById("toggle_div").style.display = "none";
                $('.popover').each(function () {
                    var popover = $(this).data('bs.popover');
                    if (popover != null) {
                        popover.inState.click = false;
                        popover.hide();
                    }
                });
            }
        }
        else {
            if ($(".shopping-cart").hasClass("show") == false) {
                $(".shopping-cart").toggleClass("show");
                $(".shopping-drawer").toggleClass("show");
            }
        }
    }

    function closeCart() {
        if ($(".shopping-cart").hasClass("show") == true) {
            $(".shopping-cart").toggleClass("show");
            $(".shopping-drawer").toggleClass("show");
            document.getElementById("toggle_div").style.display = "none";
        }
    }

    function addItemToCart(itemCode, url, bundleParentItemCode, isAutoOrder) {
        var objItem = {
            ItemCode: itemCode,
            Quantity: 1,
            Type: isAutoOrder ? "AutoOrder" : "Order",
            IsBundleParent: false
        };

        if (bundleParentItemCode) {
            objItem.BundleParentItemCode = bundleParentItemCode;
        }

        var promise = new Promise(
            function (resolve, reject) {
                ajax.json({
                    url: url,
                    data: { item: objItem },
                    success: function (response) {
                        if (response.success) {
                            resolve(response);
                        }
                        else {
                            reject(new Error("Error adding item to cart."));
                        }
                    },
                    error: function (xhr, error, data) {
                        reject(xhr);
                    },
                    complete: function () {
                    }
                });
            }
        );

        return promise;
    }

    function addItemToCartModal(item, url, isAutoOrder, hideBundleAndSave) {
        var Type = isAutoOrder ? "AutoOrder" : "Order";
        ajax.json({
            url: url,
            data: {
                item: {
                    ItemCode: item.Item.ItemCode,
                    ItemDescription: item.Item.ItemDescription,
                    SmallImageUrl: item.Item.SmallImageUrl,
                },
                priceDisplay: Type == 'AutoOrder' ? item.DisplaySSPrice : item.DisplayOTPPrice,
                id: item.ID,
                hideBundleAndSave: hideBundleAndSave
            },
            success: function (response) {

                if (response.success) {
                    var $cartModal = $("#cart-modal-container")
                    $cartModal.html(response.html);
                }

            },
            complete: function () {
                $("#cartModal").modal();
            }
        })
    }

    function updateCart(url, openCart) {
        var promise = new Promise(
            function (resolve, reject) {
                ajax.json({
                    url: url,
                    success: function (response) {
                        if (response.success && openCart == true) {
                            $(sideCart).html(response.html);
                        }
                        resolve(response);
                    },
                    error: function (xhr, error, data) {
                        reject(xhr);
                    }
                });
            }
        );

        return promise;
    }

    return {
        openCloseCart: openCloseCart,
        closeCart: closeCart,
        addItemToCart: addItemToCart,
        updateCart: updateCart,
        addItemToCartModal: addItemToCartModal
    }
});
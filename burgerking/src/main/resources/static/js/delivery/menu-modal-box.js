const modal_full_pop_wrap = document.querySelector(".modal-full-pop-wrap");
const modal_close_button = document.querySelectorAll(".modal-close-button");
const menu_modal_box = document.querySelector(".menu-modal-box");
const side_modal_box = document.querySelector(".side-modal-box");
const choice_button = document.querySelectorAll(".choice");
const body = document.querySelector("body");
const btn_top = document.querySelector(".btn-top");


function loadProductDetail(product_menu_detail, menu_data) {
    for (let i = 0; i < product_menu_detail.length; i++) {
        product_menu_detail[i].onclick = () => {
            modal_full_pop_wrap.classList.add("on");
            body.style = "overflow: hidden";
            menu_modal_box.classList.add("on");
            $.ajax({
                type: "get",
                dataType: "text",
                url: `/api/v1/delivery/menu/detail/${menu_data[i].menu_id}`,
                success: function (data) {
                    data = JSON.parse(data);
                    setDeliveryModalMenu(data);
                }
            })
        }
    }

    modal_close_button[0].onclick = () => {
        modal_full_pop_wrap.classList.remove("on");
        body.style = "";
        menu_modal_box.classList.remove("on");
    }
}

function setDeliveryModalMenu(submenu_data) {
    const product_title = document.querySelector(".product-title");
    const product_subtext = document.querySelector(".product-subtext>span");
    const product_image = document.querySelector(".product-image-box>img");
    const menu_sub_list = document.querySelector(".menu-sub-list");
    let str = ``;

    product_title.innerText = submenu_data[0].main_menu_name;
    product_image.src = submenu_data[0].main_menu_image;
    if (submenu_data[0].main_menu_summary.length > 50) {
        product_subtext.innerText = '';
    } else {
        product_subtext.innerText = submenu_data[0].main_menu_summary;
    }
    for (let i = 0; i < submenu_data.length; i++) {
        let price_before = submenu_data[i].price.slice(submenu_data[i].price.length - 3, submenu_data[i].price.length);
        let price_after = submenu_data[i].price.slice(0, submenu_data[i].price.length - 3);
        let price = price_after + "," + price_before;
        str += `
        <li class="sub-menu-list">
            <div class="menu-sub-image-box">
                <img src=${submenu_data[i].menu_images} alt="">
            </div>
            <div class="menu-sub-list-content">
                <p class="submenu-title">
                    <strong>${submenu_data[i].name}</strong>
                </p>
                <p class="set">
                    <span>${submenu_data[i].summary}</span>
                </p>
                <p class="submenu-price">
                    <strong><span>₩${price}</span></strong>
                </p>
            </div>
        </li>
        `
    }
    menu_sub_list.innerHTML = str;
    const sub_menu_list = document.querySelectorAll(".sub-menu-list");
    popSideMenuModal(sub_menu_list);
}

function popSideMenuModal(sub_menu_list) {
    for (let i = 0; i < sub_menu_list.length; i++) {
        sub_menu_list[i].onclick = () => {
            menu_modal_box.classList.remove("on");
            side_modal_box.classList.add("on");
            let set_size = 0;
            i == 0 ? set_size = 2 : i == 1 ? set_size = 1 : set_size = 0;
            $.ajax({
                type: "get",
                dataType: "text",
                url: `/api/v1/delivery/side/${set_size}`,
                success: function (data) {
                    data = JSON.parse(data);
                    loadChangeSideMenu(data, set_size);
                }
            })
        }
    }

    modal_close_button[1].onclick = () => {
        side_modal_box.classList.remove("on");
        body.style = "";
        modal_full_pop_wrap.classList.remove("on");
    }
}

function loadChangeSideMenu(side_menu_data, set_size) {
    let str = ``;
    let add_price = 0;
    for (let i = 0; i < side_menu_data.length; i++) {
        set_size == 1 ? add_price = side_menu_data[i].set_add_price : add_price = side_menu_data[i].large_add_price;
        str += `
        <li>
            <div class="menu-change-image-box">
                <img src="${side_menu_data[i].menu_images}" alt="">
            </div>
            <div class="menu-change-content-box">
                <p class="menu-change-title">
                    <span>${side_menu_data[i].name} 교환</span>
                </p>
                <p class="menu-change-price">
                    <span>+${add_price}원</span>
                </p>
            </div>
            <label class="list-check">
                <input type="radio" name="side-option" value="0">
                <span></span>
            </label>
        </li>
        `
    }
    const menu_change = document.querySelector(".menu-change");
    menu_change.innerHTML = str;
    sideMenuChoice(set_size);
}

function sideMenuChoice(set_size) {
    const drink_modal_box = document.querySelector(".drink-modal-box");
    choice_button[0].onclick = () => {
        side_modal_box.classList.remove("on");
        drink_modal_box.classList.add("on");
        $.ajax({
            type: "get",
            dateType: "text",
            url: `/api/v1/delivery/drink/${set_size}`,
            success: function (data) {
                console.log(data);
                loadChangeDrinkMenu(data, set_size);
            }
        })
    }

    modal_close_button[2].onclick = () => {
        drink_modal_box.classList.remove("on");
        body.style = "";
        modal_full_pop_wrap.classList.remove("on");
    }
}

function loadChangeDrinkMenu(drink_menu_data, set_size) {
    let str = ``;
    for (let i = 0; i < drink_menu_data.length; i++) {
        set_size == 1 ? add_price = drink_menu_data[i].set_add_price : add_price = drink_menu_data[i].large_add_price;
        str += `
        <li>
            <div class="drink-change-image-box">
                <img src="${drink_menu_data[i].menu_images}" alt="">
            </div>
            <div class="drink-change-content-box">
                <p class="drink-change-title">
                    <span>${drink_menu_data[i].name} 교환</span>
                </p>
                <p class="drink-change-price">
                    <span>+${add_price}원</span>
                </p>
            </div>
            <label class="list-check">
                <input type="radio" name="drink-option" value="0">
                <span></span>
            </label>
        </li>
        `
    }
    const drink_change = document.querySelector(".drink-change");
    drink_change.innerHTML = str;
}
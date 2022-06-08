const menu_category_buttons = document.querySelectorAll(".menu-category-button");
const product_menu_list = document.querySelector(".product-menu-list");
const menu_category_tag = document.querySelectorAll(".menu-category-tag");
const menu_category_text = document.querySelectorAll(".menu-category-text");
let category_id = 1;

load();
menu_category_tag[0].click();

function load() {
	loadMenuList();
}

function loadMenuList() {
	for (let i = 0; i < menu_category_tag.length; i++) {
		menu_category_tag[i].onclick = () => {
			addOnClassName(i);
			index = i+1;

			$.ajax({
				type: "get",
				url: `/menulist/${index}`,
				dataType: "text",
				success: function(data) {
					let menu_data = JSON.parse(data);
					appendProductList(menu_data);
				}
			})
		}
	}
}



function addOnClassName(index) {
	for (let i = 0; i < menu_category_buttons.length; i++) {
		if (i == index) {
			menu_category_tag[i].classList.add("on");
			menu_category_buttons[i].classList.add("on");
			menu_category_text[i].classList.add("on");
		} else {
			menu_category_tag[i].classList.remove("on");
			menu_category_buttons[i].classList.remove("on");
			menu_category_text[i].classList.remove("on");
		}
	}
}


function appendProductList(menu_data) {
	let menu_list = ``;
	console.log(menu_data)
	for (let i = 0; i < menu_data.length; i++) {
		menu_list += `
			<li>
                <div class="product-img">
                    <img src="${menu_data[i].menu_image}" alt="">
                </div>
                <div class="menu-content">
                    <span class="detail-title">${menu_data[i].name}</span>
                </div>
                <a href="" class="btn-detail"></a>
            </li>
		`;
	}
	product_menu_list.innerHTML = menu_list;
}
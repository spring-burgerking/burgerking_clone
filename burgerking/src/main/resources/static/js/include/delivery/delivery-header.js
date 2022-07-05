const delivery_header_name = document.querySelector(".delivery-header-name");
const header_logout = document.querySelector(".header-logout");
let user_info;
$.ajax({
    type: "post",
    dataType: "text",
    url: "/api/v1/delivery/user-auth",
    success: function (data) {
        data = JSON.parse(data);
        console.log(data);
        setDeliveryHeader(data);
        user_info = data;
        console.log(user_info);
    }
})

function setDeliveryHeader(data) {
    delivery_header_name.innerText = data.name;
}

header_logout.onclick = () => {
    sessionStorage.clear();
}
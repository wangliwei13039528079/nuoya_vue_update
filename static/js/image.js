window.imageClick = function (imgObj) {
    var imgUrls = imgObj.src;
    var imgUrlArr = imgUrls.split("#"); //字符分割
    var smallImgUrl = imgUrlArr[0]; //小图
    var bigImgUrl = imgUrlArr[1]; //大图
    var oriImgUrl = imgUrlArr[2]; //原图
    var bigPicture=document.createElement("div")  
    var dddy=document.getElementsByClassName("bigImg")[0]
    dddy.innerHTML = ""
    dddy.style.display="block";
    // console.log(dddy)
    dddy.appendChild(bigPicture)
    bigPicture.innerHTML = "";
    var span = document.createElement("span");
    span.innerHTML = '<img style="width:100%;height:200px;" class="imgBig" src="' + bigImgUrl + '" />';
    bigPicture.appendChild(span)
  }
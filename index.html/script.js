
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


function generateQRCode() {
    const wechatID = "Lgc-lcx"; // 替换为你的微信号
    const qr = new QRCode(document.getElementById("qrcode"), {
        text: `weixin://dl/add?username=${wechatID}`,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}


window.onload = function() {
    const link = document.getElementById("wechatLink");
    
    if (isMobile()) {
  
        link.style.display = "block";
        document.getElementById("qrcode").style.display = "none";
    } else {
 
        link.style.display = "none";
        generateQRCode();
    }
};
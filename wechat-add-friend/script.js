const WECHAT_ID = "Lgc-lcx"; // 替换为你的微信号

// 1. 设备检测
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}

// 2. 微信浏览器检测
function isWechatBrowser() {
    return /micromessenger/i.test(navigator.userAgent);
}

// 3. 生成二维码（PC端）
function generateQRCode() {
    const qr = new QRCode(document.getElementById("qrcode"), {
        text: `weixin://dl/chat?${WECHAT_ID}`, // 最新微信协议
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
    });
}

// 4. 处理微信浏览器环境
function handleWechatRedirect() {
    document.body.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <h3 style="color: red;">⚠️ 检测到微信内打开！</h3>
            <p>请按以下步骤操作：</p >
            <p>1. 点击右上角 ···</p >
            <p>2. 选择「在浏览器打开」</p >
            <p>3. 返回此页面点击链接</p >
        </div>
    `;
}

// 5. 初始化页面
window.onload = function () {
    const link = document.getElementById("wechatLink");

    if (isWechatBrowser()) {
        // 微信内打开，显示引导提示
        handleWechatRedirect();
    } else {
        // 非微信环境
        if (isMobile()) {
            // 移动端：直接跳转微信协议
            link.href = `weixin://dl/chat?${WECHAT_ID}`;
            link.style.display = "block";
        } else {
            // PC端：显示二维码
            generateQRCode();
            link.style.display = "none";
        }
    }
};

// 6. 复制微信号功能
function copyWechatID() {
    navigator.clipboard.writeText(WECHAT_ID).then(() => {
        document.getElementById("copyTips").textContent = "已复制到剪贴板！";
        setTimeout(() => {
            document.getElementById("copyTips").textContent = "";
        }, 2000);
    });
}
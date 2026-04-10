function loadFonts() {
    const fonts = [
        new FontFace('DXKrungthaiBold', 'url(../assets/fonts/DX-Krungthai-Bold.woff)'),
        new FontFace('DXKrungthaiMedium', 'url(../assets/fonts/DX-Krungthai-Medium.woff)'),
        new FontFace('DXKrungthaiRegular', 'url(../assets/fonts/DX-Krungthai-Regular.woff)'),
        new FontFace('DXKrungthaiSemiBold', 'url(../assets/fonts/DX-Krungthai-SemiBold.woff)'),
        new FontFace('DXKrungthaiThin', 'url(../assets/fonts/DX-Krungthai-Thin.woff)')
    ];

    return Promise.all(fonts.map(font => font.load())).then(function(loadedFonts) {
        loadedFonts.forEach(function(font) {
            document.fonts.add(font);
        });
    });
}

window.onload = function() {
    setCurrentDateTime();
    loadFonts().then(function() {
        document.fonts.ready.then(function() {
            updateDisplay();
        });
    }).catch(function() {
        updateDisplay();
    });
};

function setCurrentDateTime() {
    const now = new Date();
    const localDateTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok', hour12: false });
    const formattedDateTime = localDateTime.replace(' ', 'T');
    document.getElementById('datetime').value = formattedDateTime;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function formatDate(date) {
    if (!date || date === '-') return '-';
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const parts = formattedDate.split(' ');
    if (parts.length < 3) return formattedDate;
    const day = padZero(parts[0]);
    const month = months[new Date(date).getMonth()];
    let year = parts[2];
    year = `25${year}`;
    return `${day} ${month} ${year}`;
}

function generateUniqueID() {
    const randomString = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return `A${randomString}`;
}

function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const receivername = document.getElementById('receivername').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    const bank = document.getElementById('bank').value || '-';
    const Itemcode = document.getElementById('Itemcode').value || '-';
    const amount11 = document.getElementById('amount11').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const QRCode = document.getElementById('QRCode').value || '';
    
    // ตรวจสอบสวิตช์เปิด/ปิด โหมดบันทึกช่วยจำ
    const noteToggleElem = document.getElementById('noteToggle') || document.getElementById('modeSwitch');
    const isNoteMode = noteToggleElem ? noteToggleElem.checked : false;
    const AideMemoire = document.getElementById('AideMemoire') ? document.getElementById('AideMemoire').value : '-';

    const selectedImage = document.getElementById('imageSelect') ? document.getElementById('imageSelect').value : '';
    let backgroundSelect = document.getElementById('backgroundSelect') ? document.getElementById('backgroundSelect').value : '';

    let bankLogoUrl = '';
    let bankText = '';

    switch (bank) {
        case 'กสิกรไทย':
            bankText = 'กสิกรไทย';
            bankLogoUrl = '../assets/image/logo/KBANK1.png';
            break;
        case 'กรุงไทย':
            bankText = 'กรุงไทย';
            bankLogoUrl = '../assets/image/logo/KTB3.png';
            break;
        case 'กรุงเทพ':
            bankText = 'กรุงเทพ';
            bankLogoUrl = '../assets/image/logo/BBL3.png';
            break;
        case 'ไทยพาณิชย์':
            bankText = 'ไทยพาณิชย์';
            bankLogoUrl = '../assets/image/logo/SCB.png';
            break;
        case 'กรุงศรี':
            bankText = 'กรุงศรี';
            bankLogoUrl = '../assets/image/logo/BAY2.png';
            break;
        case 'ทีเอ็มบีธนชาต':
            bankText = 'ทีเอ็มบีธนชาต';
            bankLogoUrl = '../assets/image/logo/TTB.png';
            break;
        case 'ออมสิน':
            bankText = 'ออมสิน';
            bankLogoUrl = '../assets/image/logo/O2.png';
            break;
        case 'ธ.ก.ส.':
            bankText = 'ธ.ก.ส.';
            bankLogoUrl = '../assets/image/logo/T1.png';
            break;
        case 'ธ.อ.ส.':
            bankText = 'ธ.อ.ส.';
            bankLogoUrl = '../assets/image/logo/C2.png';
            break;
        case 'เกียรตินาคินภัทร':
            bankText = 'เกียรตินาคินภัทร';
            bankLogoUrl = '../assets/image/logo/K.png';
            break;
        case 'ซีไอเอ็มบี':
            bankText = 'ซีไอเอ็มบี';
            bankLogoUrl = '../assets/image/logo/C-CIMB.png';
            break;
        case 'ยูโอบี':
            bankText = 'ยูโอบี';
            bankLogoUrl = '../assets/image/logo/UOB2.png';
            break;
        case 'แลนด์ แอนด์ เฮ้าส์':
            bankText = 'แลนด์ แอนด์ เฮ้าส์';
            bankLogoUrl = '../assets/image/logo/LHBANK.png';
            break;
        case 'ไอซีบีซี':
            bankText = 'ไอซีบีซี';
            bankLogoUrl = '../assets/image/logo/ICBC.png';
            break;
        case 'พร้อมเพย์':
            bankText = 'พร้อมเพย์';
            bankLogoUrl = '../assets/image/logo/P-Krungthai1.png';
            break;
        case 'พร้อมเพย์ ':
            bankText = 'พร้อมเพย์';
            bankLogoUrl = '../assets/image/logo/P-Krungthai2.png';
            break;
        case 'พร้อมเพย์  ':
            bankText = 'พร้อมเพย์';
            bankLogoUrl = '../assets/image/logo/P-Krungthai.png';
            break;
        case 'ChillPay':
            bankText = 'ChillPay';
            bankLogoUrl = '../assets/image/logo/CP-KTB.png'; 
            break;
         case 'SCB มณี SHOP':
            bankText = 'SCB มณี SHOP';
            bankLogoUrl = '../assets/image/logo/CP-KTB.png'; 
            break;
        case 'MetaAds1':
            bankText = 'MetaAds1';
            bankLogoUrl = '../assets/image/logo/Meta4.png'; 
            break;
        case 'MetaAds2':
            bankText = 'MetaAds2';
            bankLogoUrl = '../assets/image/logo/Meta4.png'; 
            break;
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let backgroundImageSrc = backgroundSelect;

    if (isNoteMode) {
        if (backgroundImageSrc && !backgroundImageSrc.includes('T.jpg')) {
            backgroundImageSrc = backgroundImageSrc.replace('.jpg', 'T.jpg');
        }

        if (bank === 'ChillPay') {
            canvas.width = 986; canvas.height = 1277;
            backgroundImageSrc = backgroundImageSrc.replace('/KTB', '/CP-KTB');
        } else if (bank === 'SCB มณี SHOP') {
            canvas.width = 986; canvas.height = 1277;
            backgroundImageSrc = backgroundImageSrc.replace('/KTB', '/SCB-KTB'); 
        } else if (bank === 'MetaAds1' || bank === 'MetaAds2') {
            canvas.width = 986; canvas.height = 1277;
            backgroundImageSrc = backgroundImageSrc.replace('/KTB', '/META1-KTB');
        } else {
            canvas.width = 986; canvas.height = 1280;
        }

    } else {
        if (backgroundImageSrc && backgroundImageSrc.includes('T.jpg')) {
            backgroundImageSrc = backgroundImageSrc.replace('T.jpg', '.jpg');
        }

        if (bank === 'ChillPay') {
            canvas.width = 1008; canvas.height = 1262;
            backgroundImageSrc = backgroundImageSrc.replace('/KTB', '/CP-KTB');
        } else if (bank === 'SCB มณี SHOP') {
            canvas.width = 1008; canvas.height = 1262;
            backgroundImageSrc = backgroundImageSrc.replace('/KTB', '/SCB-KTB');
        } else if (bank === 'MetaAds1' || bank === 'MetaAds2') {
            canvas.width = 1008; canvas.height = 1262;
            backgroundImageSrc = backgroundImageSrc.replace('/KTB', '/META1-KTB'); 
        } else {
            canvas.width = 1008; canvas.height = 1280;
        }
    }
    
    if(!backgroundImageSrc) return; // ป้องกัน error ถ้าไม่มีพื้นหลัง

    const backgroundImage = new Image();
    backgroundImage.src = backgroundImageSrc;
    backgroundImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {

            if (isNoteMode) {
                // ==========================================
                // โหมดมีบันทึกช่วยจำ
                // ==========================================
                if (bank === 'ChillPay') {
                    ctx.drawImage(bankLogo,31,597, 117.5, 117.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,942.9,1114.0,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID() }`, 337.7,342.2,32.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -0.5);
                    drawText(ctx, `${sendername}`, 178.3, 445.3, 43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `***`, 178.3 + ctx.measureText(`${sendername}`).width - 7, 445.3, 43.7, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `กรุงไทย`, 178.3, 502.3,34.4, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`, 178.3, 555.6,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `ChillPay-${receivername}`, 178.3, 656.9,43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `${receiveraccount}`, 178.3, 713.3,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `${Itemcode}`, 942.9, 782,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    const modifiedReceiverName = receivername.replace(/\s+/g, '');
                    drawText(ctx, `${modifiedReceiverName}`, 942.9, 866,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `บาท`, 942.9, 972.3,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 868.8,972.3,52.50, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`,942.9, 1046,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png', 31,389, 117.5, 117.5);  
                    drawText(ctx, `${AideMemoire}`,942.9, 1183,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 1, 0, 0, 800, -1.5);

                } else if (bank === 'SCB มณี SHOP') {
                    ctx.drawImage(bankLogo,31,597, 117.5, 117.5);
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,942.9,1114.0,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID() }`, 337.7,342.2,32.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -0.5);
                    drawText(ctx, `${sendername}`, 178.3, 445.3, 43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `***`, 178.3 + ctx.measureText(`${sendername}`).width - 7, 445.3, 43.7, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `กรุงไทย`, 178.3, 502.3,34.4, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`, 178.3, 555.6,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `SCB มณี SHOP (${receivername})`, 178.3, 656.9,43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `(${receiveraccount})`, 178.3, 713.3,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `${Itemcode}`, 942.9, 782,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `SCB`, 942.9, 866,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `บาท`, 942.9, 972.3,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 868.8,972.3,52.50, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`,942.9, 1046,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png', 31,389, 117.5, 117.5);  
                    drawText(ctx, `${AideMemoire}`,942.9, 1183,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 1, 0, 0, 800, -1.5);
                    
                } else if (bank === 'MetaAds1') {
                    ctx.drawImage(bankLogo,31,597, 117.5, 117.5);
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,942.9,1114.0,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID() }`, 337.7,342.2,32.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -0.5);
                    drawText(ctx, `${sendername}`, 178.3, 445.3, 43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `***`, 178.3 + ctx.measureText(`${sendername}`).width - 7, 445.3, 43.7, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `กรุงไทย`, 178.3, 502.3,34.4, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`, 178.3, 555.6,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `META ADS (KGP)`, 178.3, 656.9,43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `${Itemcode}`, 942.9, 782,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${Itemcode}`, 942.9, 866,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `บาท`, 942.9, 972.3,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 868.8,972.3,52.50, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`,942.9, 1046,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png', 31,389, 117.5, 117.5);  
                    drawText(ctx, `${AideMemoire}`,942.9, 1183,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 1, 0, 0, 800, -1.5);
                
                } else if (bank === 'MetaAds2') {
                    ctx.drawImage(bankLogo,31,597, 117.5, 117.5);
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,942.9,1114.0,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID() }`, 337.7,342.2,32.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -0.5);
                    drawText(ctx, `${sendername}`, 178.3, 445.3, 43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `***`, 178.3 + ctx.measureText(`${sendername}`).width - 7, 445.3, 43.7, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `กรุงไทย`, 178.3, 502.3,34.4, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`, 178.3, 555.6,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `META ADS (KGP)`, 178.3, 656.9,43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `(${receiveraccount})`, 178.3, 713.3,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `${Itemcode}`, 942.9, 782,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${Itemcode}`, 942.9, 866,38, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `บาท`, 942.9, 972.3,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 868.8,972.3,52.50, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`,942.9, 1046,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png', 31,389, 117.5, 117.5);  
                    drawText(ctx, `${AideMemoire}`,942.9, 1183,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 1, 0, 0, 800, -1.5);
                    
                } else {
                    ctx.drawImage(bankLogo,31,651, 117.5, 117.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,942.9,1114.0,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID() }`, 337.7,342.2,32.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -0.5);
                    drawText(ctx, `${sendername}`, 178.3, 495.1, 43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `***`, 178.3 + ctx.measureText(`${sendername}`).width - 7, 495.1, 43.7, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, `กรุงไทย`, 178.3, 548.5,34.4, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`, 178.3, 599,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `${receivername}`, 178.3, 757.2,43.7, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.7);
                    drawText(ctx, bankText, 178.3, 810.1,34.4, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${receiveraccount}`, 178.3, 861.5,34.4, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1.2);
                    drawText(ctx, `บาท`, 942.9, 972.3,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 868.8,972.3,52.50, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`,942.9, 1046,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png', 31,389, 117.5, 117.5);  
                    drawText(ctx, `${AideMemoire}`,942.9, 1183,39, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 1, 0, 0, 800, -1.5);
                }

                if (selectedImage && selectedImage !== '../assets/image/st/NO.png') {
                    const customImage = new Image();
                    customImage.src = selectedImage;
                    customImage.onload = function() {
                        ctx.drawImage(customImage, 0, 0, 924, 1200); 
                    }
                }

            } else {
                // ==========================================
                // โหมดปกติ
                // ==========================================
                if (bank === 'ChillPay') {
                    ctx.drawImage(bankLogo, 31.2,618.5,126.5,126.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,963.7, 1176.9,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID()}`, 357.5, 357.3,34.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1);
                    drawText(ctx, `${sendername}`, 188, 460, 47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `***`, 188 + ctx.measureText(`${sendername}`).width - 7, 460, 47, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `กรุงไทย`, 188, 518,36.5, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`,188, 572,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `ChillPay-${receivername}`, 188,677.2,47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `${receiveraccount}`, 188, 734.4,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `${Itemcode}`, 963.7, 830,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    const modifiedReceiverName = receivername.replace(/\s+/g, '');
                    drawText(ctx, `${modifiedReceiverName}`, 963.7, 915,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `บาท`, 963.7, 1025.7,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 883.5, 1025.7,56.80, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`, 963.7, 1104.0,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png',31.2,406,126.5,126.5);         
                    
                } else if (bank === 'SCB มณี SHOP') {
                    ctx.drawImage(bankLogo, 31.2,618.5,126.5,126.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,963.7, 1176.9,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID()}`, 357.5, 357.3,34.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1);
                    drawText(ctx, `${sendername}`, 188, 460, 47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `***`, 188 + ctx.measureText(`${sendername}`).width - 7, 460, 47, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `กรุงไทย`, 188, 518,36.5, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`,188, 572,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `SCB มณี SHOP (${receivername})`, 188,677.2,47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `(${receiveraccount})`, 188, 734.4,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `${Itemcode}`, 963.7, 830,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `SCB`, 963.7, 915,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `บาท`, 963.7, 1025.7,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 883.5, 1025.7,56.80, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`, 963.7, 1104.0,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png',31.2,406,126.5,126.5);

                } else if (bank === 'MetaAds1') {
                    ctx.drawImage(bankLogo, 31.2,618.5,126.5,126.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,963.7, 1176.9,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID()}`, 357.5, 357.3,34.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1);
                    drawText(ctx, `${sendername}`, 188, 460, 47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `***`, 188 + ctx.measureText(`${sendername}`).width - 7, 460, 47, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `กรุงไทย`, 188, 518,36.5, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`,188, 572,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `META ADS (KGP)`, 188,677.2,47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `${Itemcode}`, 963.7, 830,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 300, 0);
                    drawText(ctx, `${Itemcode}`, 963.7, 915,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 300, 0);
                    drawText(ctx, `บาท`, 963.7, 1025.7,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 883.5, 1025.7,56.80, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`, 963.7, 1104.0,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png',31.2,406,126.5,126.5);         
                    
                } else if (bank === 'MetaAds2') {
                    ctx.drawImage(bankLogo, 31.2,618.5,126.5,126.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,963.7, 1176.9,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID()}`, 357.5, 357.3,34.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1);
                    drawText(ctx, `${sendername}`, 188, 460, 47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `***`, 188 + ctx.measureText(`${sendername}`).width - 7, 460, 47, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `กรุงไทย`, 188, 518,36.5, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`,188, 572,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `META ADS (KGP)`, 188,677.2,47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `(${receiveraccount})`, 188, 734.4,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `${Itemcode}`, 963.7, 830,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 300, 0);
                    drawText(ctx, `${Itemcode}`, 963.7, 915,38.5, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 2, 0, 0, 300, 0);
                    drawText(ctx, `บาท`, 963.7, 1025.7,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 883.5, 1025.7,56.80, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`, 963.7, 1104.0,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png',31.2,406,126.5,126.5);  
                
                } else {
                    ctx.drawImage(bankLogo, 31.2,684.5,126.5,126.5); 
                    drawText(ctx, `${formattedDate} - ${formattedTime}`,963.7, 1176.9,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 800, -1.5);
                    drawText(ctx, `${generateUniqueID()}`, 357.5, 357.3,34.5, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500, -1);
                    drawText(ctx, `${sendername}`, 188, 519, 47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `***`, 188 + ctx.measureText(`${sendername}`).width - 7, 519, 47, 'DXKrungthaiRegular', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, `กรุงไทย`, 188, 577,36.5, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${senderaccount}`,188, 631,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `${receivername}`, 188,796.3,47, 'DXKrungthaiBold', '#000000', 'left', 1.5, 3, 0, 0, 800, -0.6);
                    drawText(ctx, bankText, 188, 853.8,36.5, 'DXKrungthaiMedium', '#000000', 'left', 1.5, 2, 0, 0, 500, 0);
                    drawText(ctx, `${receiveraccount}`, 188, 908.1,37, 'DXKrungthaiMedium', '#586970', 'left', 1.5, 1, 0, 0, 500,-1.6);
                    drawText(ctx, `บาท`, 963.7, 1025.7,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${amount11}`, 883.5, 1025.7,56.80, 'DXKrungthaiBold', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `0.00 บาท`, 963.7, 1104.0,41.50, 'DXKrungthaiMedium', '#000000', 'right', 1.5, 3, 0, 0, 500, -1.5);
                    drawText(ctx, `${QRCode}`, 238.9, 599.0,33, 'DXKrungthaiMedium', '#4e4e4e', 'left', 1.5, 5, 0, 0, 500, 0);
                    drawImage(ctx, '../assets/image/logo/KTB3.png',31.2,406,126.5,126.5);  
                }

                // สติ๊กเกอร์ (แบบปกติ)
                if (selectedImage && selectedImage !== '../assets/image/st/NO.png') {
                    const customImage = new Image();
                    customImage.src = selectedImage;
                    customImage.onload = function() {
                        ctx.drawImage(customImage, 0, 0, 945, 1200);
                    }
                }
            }
        }
    }
}

function drawText(ctx, text, x, y, fontSize, fontFamily, color, align, lineHeight, maxLines, shadowColor, shadowBlur, maxWidth, letterSpacing) {
    if (!text || text === '-') return;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.shadowColor = shadowColor || 'transparent';
    ctx.shadowBlur = shadowBlur || 0;

    const paragraphs = text.split('<br>');
    let currentY = y;

    paragraphs.forEach(paragraph => {
        try {
            const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
            const words = [...segmenter.segment(paragraph)].map(segment => segment.segment);

            let lines = [];
            let currentLine = '';

            words.forEach((word) => {
                const testLine = currentLine + word;
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width + (testLine.length - 1) * (letterSpacing || 0);

                if (testWidth > maxWidth && currentLine !== '') {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            });
            if (currentLine) {
                lines.push(currentLine);
            }

            lines.forEach((line, index) => {
                let currentX = x;

                if (align === 'center') {
                    currentX = x - (ctx.measureText(line).width / 2) - ((line.length - 1) * (letterSpacing || 0)) / 2;
                } else if (align === 'right') {
                    currentX = x - ctx.measureText(line).width - ((line.length - 1) * (letterSpacing || 0));
                }

                drawTextLine(ctx, line, currentX, currentY, letterSpacing);
                // ขยับบรรทัดลงมาตามความสูงบรรทัด
                currentY += (lineHeight > 10 ? lineHeight : fontSize * lineHeight); 
                if (maxLines && index >= maxLines - 1) {
                    return;
                }
            });
            currentY += (lineHeight > 10 ? lineHeight : fontSize * lineHeight);
        } catch (error) {
            // สำรองหากเบราว์เซอร์ไม่รองรับ segmenter
            let currentX = x;
            if (align === 'center') {
                currentX = x - (ctx.measureText(paragraph).width / 2);
            } else if (align === 'right') {
                currentX = x - ctx.measureText(paragraph).width;
            }
            ctx.fillText(paragraph, currentX, currentY);
            currentY += (lineHeight > 10 ? lineHeight : fontSize * lineHeight);
        }
    });
}

function drawTextLine(ctx, text, x, y, letterSpacing) {
    if (!letterSpacing || letterSpacing === 0) {
        ctx.fillText(text, x, y);
        return;
    }

    try {
        const segmenter = new Intl.Segmenter('th', { granularity: 'grapheme' });
        const characters = [...segmenter.segment(text)].map(segment => segment.segment);
        let currentPosition = x;

        characters.forEach((char) => {
            ctx.fillText(char, currentPosition, y);
            const charWidth = ctx.measureText(char).width;
            currentPosition += charWidth + letterSpacing;
        });
    } catch(e) {
        ctx.fillText(text, x, y);
    }
}

function drawImage(ctx, imageUrl, x, y, width, height) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        ctx.drawImage(image, x, y, width, height);
    };
}
// ==========================================
// สคริปต์เปลี่ยนรูปแบบเลขบัญชีผู้รับอัตโนมัติ
// ==========================================
function autoFormatAccount() {
    const bank = document.getElementById('bank').value;
    const accInput = document.getElementById('receiveraccount');
    
    // 1. ออมสิน และ ธ.ก.ส. (12 ตัว)
    if (bank === 'ออมสิน' || bank === 'ธ.ก.ส.') {
        accInput.value = 'XXX-X-XXXX0-000';
    } 
    // 2. พร้อมเพย์เบอร์
    else if (bank === 'พร้อมเพย์') {
        accInput.value = 'XXX XXX 0000';
    } 
    // 3. พร้อมเพย์บัตรประชาชน (value มีเว้นวรรค 1 เคาะ)
    else if (bank === 'พร้อมเพย์ ') {
        accInput.value = 'X XXXX XXXX0 00 0';
    } 
    // 4. พร้อมเพย์วอลเล็ท (value มีเว้นวรรค 2 เคาะ)
    else if (bank === 'พร้อมเพย์  ') {
        accInput.value = 'XXX-XXXXXXXX-0000';
    } 
    // 5. ChillPay
    else if (bank === 'ChillPay') {
        accInput.value = '010553509091216';
    } 
    // 6. ธนาคารอื่นๆ ทั่วไป (10 ตัว)
    else {
        accInput.value = 'XXX-X-XX000-0';
    }
}
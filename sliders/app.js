 
const API_MAPPING = {
    "0": "https://raw.githubusercontent.com/androidappsx/shabakatytv/refs/heads/main/api/sliders/0.json",
    "2": "https://iraqapps.github.io/downloader/aflaame/files/1.txt",
 
};

 
function extractIdFromHashQueryStyle() {
    const hash = window.location.hash.substring(1); 
    const params = new URLSearchParams(hash); 
     
    return params.get('id_sliders') || '1'; 
}

 
 
async function handleDataFetch() {
    const sliderId = extractIdFromHashQueryStyle(); 
    const externalUrl = API_MAPPING[sliderId];

    // إعداد تنسيق بسيط لعرض النص الخام/المنسق
    document.body.style.whiteSpace = 'pre-wrap';
    document.body.style.margin = '0'; // إزالة الهوامش الافتراضية
    document.body.style.fontFamily = 'monospace'; // خط أحادي المسافة
    document.body.style.color = '#000'; // لون نص افتراضي

    if (!externalUrl) {
        document.body.style.color = '#dc3545'; 
        document.body.textContent = `❌ لا يوجد رابط خارجي مُخزن للمُعرّف ID: ${sliderId}`;
        return;
    }
     
    document.body.textContent = `جاري جلب البيانات للسلايدر ID: ${sliderId} من: ${externalUrl} ...`;

    try {
        const response = await fetch(externalUrl);

        if (!response.ok) {
            throw new Error(`فشل الجلب. حالة: ${response.status}`);
        }

        const data = await response.text(); 
        
 
        try {
            const jsonObject = JSON.parse(data);
 
            document.body.textContent = JSON.stringify(jsonObject, null, 4);
        } catch (e) {
 
            document.body.textContent = data; 
        }
        
    } catch (error) {
        const errorMessage = `❌ فشل جلب البيانات لـ ID: ${sliderId}. الخطأ: ${error.message}`;
        // عرض رسالة الخطأ
        document.body.textContent = errorMessage;
        document.body.style.color = '#dc3545'; // لون الخطأ
        console.error(errorMessage);
    }
}

 
document.addEventListener('DOMContentLoaded', handleDataFetch);

 
const API_MAPPING = {
    "0": "https://raw.githubusercontent.com/androidappsx/shabakatytv/refs/heads/main/api/sliders/0.json",
    "2": "https://iraqapps.github.io/downloader/aflaame/files/1.txt",
 
};

 
function extractIdFromHashQueryStyle() {
    const hash = window.location.hash.substring(1); 
    const params = new URLSearchParams(hash); 
     
    return params.get('id_groups') || '1'; 
}

 
 
function handleRedirection() {
    const sliderId = extractIdFromHashQueryStyle(); 
    const externalUrl = API_MAPPING[sliderId];

    // إعداد تنسيق بسيط لعرض رسالة خطأ مؤقتة (في حال عدم وجود رابط)
    document.body.style.whiteSpace = 'pre-wrap';
    document.body.style.margin = '0'; 
    document.body.style.fontFamily = 'monospace'; 
    document.body.style.color = '#000'; 

    if (!externalUrl) {
        document.body.style.color = '#dc3545'; 
        document.body.textContent = `❌ لا يوجد رابط خارجي مُخزن للمُعرّف ID: ${sliderId}`;
        return;
    }
     
    // عرض رسالة مؤقتة قبل إعادة التوجيه
    document.body.textContent = `جاري إعادة التوجيه إلى مصدر البيانات: ${externalUrl} ...`;
    
    // 🚨 التعديل الرئيسي: تنفيذ إعادة التوجيه الفورية
    // هذا سيجعل الـ WebView يبدأ بتحميل الرابط الخارجي مباشرة.
    window.location.replace(externalUrl);
}

 
document.addEventListener('DOMContentLoaded', handleRedirection);

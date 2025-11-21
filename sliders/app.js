 
const API_MAPPING = {
    "0": "https://raw.githubusercontent.com/androidappsx/shabakatytv/refs/heads/main/api/sliders/0.json",
    "2": "https://iraqapps.github.io/downloader/aflaame/files/1.txt",
 
};

 
// 🚨 التعديل الرئيسي: القراءة من جزء الاستعلام (Query) بدلاً من الـ Hash (#)
function extractIdFromQueryStyle() {
    const search = window.location.search.substring(1); // يبدأ بـ ?
    const params = new URLSearchParams(search); 
     
    return params.get('id_groups') || '1'; 
}

 
 
function handleRedirection() {
    // 🚨 التعديل: استخدام الدالة الجديدة
    const sliderId = extractIdFromQueryStyle(); 
    const externalUrl = API_MAPPING[sliderId];

    // إعداد تنسيق بسيط لعرض رسالة خطأ مؤقتة
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
    
    // تنفيذ إعادة التوجيه الفورية
    window.location.replace(externalUrl);
}

 
document.addEventListener('DOMContentLoaded', handleRedirection);

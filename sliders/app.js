 
const API_MAPPING = {
    "0": "https://raw.githubusercontent.com/androidappsx/shabakatytv/refs/heads/main/api/sliders/0.json",
    "2": "https://iraqapps.github.io/downloader/aflaame/files/1.txt",
 
};

 
function extractIdFromHashQueryStyle() {
    const hash = window.location.hash.substring(1); 
    const params = new URLSearchParams(hash); 
     
    return params.get('id_groups') || '1'; 
}

 
 
async function handleDataFetch() {
    const sliderId = extractIdFromHashQueryStyle(); 
    const externalUrl = API_MAPPING[sliderId];

    // 🚨 التعديل 1: إعداد نمط العرض الأساسي
    document.body.style.whiteSpace = 'pre-wrap';
    document.body.style.margin = '0'; // إزالة الهوامش الافتراضية
    document.body.style.fontFamily = 'monospace'; // خط أحادي المسافة
    
    // 🚨 التعديل 2: تحديد عنصر الإخراج
    const outputElement = document.getElementById('data-output');
    if (!outputElement) {
        // احتياطي إذا لم يتم العثور على العنصر
        document.body.textContent = '❌ خطأ: لم يتم العثور على وسم الإخراج #data-output';
        document.body.style.color = '#dc3545';
        return;
    }
    
    // إعداد نمط عنصر الإخراج لسهولة القراءة/الاستخراج
    outputElement.style.color = '#000'; // لون نص افتراضي (أسود)

    if (!externalUrl) {
        outputElement.style.color = '#dc3545'; 
        outputElement.textContent = `❌ لا يوجد رابط خارجي مُخزن للمُعرّف ID: ${sliderId}`;
        return;
    }
     
    outputElement.textContent = `جاري جلب البيانات للسلايدر ID: ${sliderId} من: ${externalUrl} ...`;

    try {
        const response = await fetch(externalUrl);

        if (!response.ok) {
            throw new Error(`فشل الجلب. حالة: ${response.status}`);
        }

        const data = await response.text(); 
        
 
        try {
            const jsonObject = JSON.parse(data);
            // 🚨 التعديل 3: عرض JSON المنسق داخل وسم الإخراج
            outputElement.textContent = JSON.stringify(jsonObject, null, 4);
        } catch (e) {
            // 🚨 التعديل 4: عرض النص الخام داخل وسم الإخراج
            outputElement.textContent = data; 
        }
        
    } catch (error) {
        const errorMessage = `❌ فشل جلب البيانات لـ ID: ${sliderId}. الخطأ: ${error.message}`;
        // عرض رسالة الخطأ داخل وسم الإخراج
        outputElement.textContent = errorMessage;
        outputElement.style.color = '#dc3545'; // لون الخطأ
        console.error(errorMessage);
    }
}

 
document.addEventListener('DOMContentLoaded', handleDataFetch);

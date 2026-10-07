const mysql = require('mysql2');

// إنشاء الاتصال بقاعدة بيانات XAMPP المحلية
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // المستخدم الافتراضي في XAMPP
  password: '',      // كلمة السر الافتراضية تكون فارغة
  database: 'test'   // اسم قاعدة البيانات (يمكنك تغيير اسم القاعدة لاحقًا من phpMyAdmin)
});

// اختبار الاتصال
connection.connect((err) => {
  if (err) {
    console.error('خطأ في الاتصال بقاعدة البيانات: ', err.stack);
    return;
  }
  console.log('Database connected successfully!f');
});

module.exports = connection;
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// الصفحة الرئيسية (اختيارية لتجربة المشروع في المتصفح)
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running');
});

// 6 & 7. إذا لم يتم إرسال تاريخ (فارغ) -> إرجاع الوقت الحالي
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// 1 إلى 5. معالجة التاريخ المرسل سواء كان رقماً (Unix) أو نص تاريخ
app.get('/api/:date', (req, res) => {
  const { date } = req.params;

  // إذا كان التاريخ أرقاماً فقط (مثل 1451001600000) نحوله إلى رقم
  const parsedDate = /^\d+$/.test(date) ? new Date(Number(date)) : new Date(date);

  // 5. إذا كان التاريخ غير صالح
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // 1, 2, 3. إرجاع unix بالمللي ثانية و utc بالصيغة المطلوبة
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
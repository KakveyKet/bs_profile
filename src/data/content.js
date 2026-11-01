// Business-first content adapted from public MyProfile service & project information.
// Update descriptions and demo links only when you can verify the final client-facing claims.

export const contact = {
  telegram: 'https://t.me/VKak_vey',
  phone: '096 763 7609',
  tel: 'tel:+855967637609',
  email: 'kakveyket408@gmail.com',
  mailto: 'mailto:kakveyket408@gmail.com',
  github: 'https://github.com/KakveyKet',
  linkedin: 'https://www.linkedin.com/in/kakvey-ket-b22203364',
}

export const services = [
  {
    id: 'website', iconKey: 'globe', name: 'វេបសាយសម្រាប់អាជីវកម្ម',
    english: 'Business websites', price: '$250', priceNote: 'ចាប់ពី / គម្រោង',
    summary: 'បង្ហាញអាជីវកម្ម ផលិតផល និងសេវាកម្មរបស់អ្នកឱ្យអតិថិជនស្វែងរកបានងាយ។',
    details: ['វេបសាយក្រុមហ៊ុន និងអាជីវកម្ម', 'វេបសាយទេសចរណ៍ និងទទួលសំណើកក់', 'ទំព័រផលិតផល សេវាកម្ម និងទំនាក់ទំនង', 'ប្រើប្រាស់បានលើទូរស័ព្ទ និងកុំព្យូទ័រ'],
    image: 'https://res.cloudinary.com/e0brilgp/image/upload/v1793260576/photo_2026-10-29_14-55-59.jpg',
    theme: 'blue',
  },
  {
    id: 'pos', iconKey: 'cart', name: 'ប្រព័ន្ធគ្រប់គ្រងការលក់',
    english: 'POS & inventory', price: '$350', priceNote: 'ចាប់ពី / គម្រោង',
    summary: 'កត់ត្រាការលក់ តាមដានទំនិញក្នុងស្តុក និងមើលរបាយការណ៍នៅកន្លែងតែមួយ។',
    details: ['គ្រប់គ្រងផលិតផល និងការលក់', 'តាមដានស្តុកទំនិញចេញចូល', 'បង្កើតរបាយការណ៍ប្រចាំថ្ងៃ', 'គ្រប់គ្រងអតិថិជន និងអ្នកប្រើប្រាស់'],
    image: 'https://res.cloudinary.com/e0brilgp/image/upload/v1793260576/photo_2026-10-29_14-55-56.jpg',
    theme: 'orange',
  },
  {
    id: 'school', iconKey: 'school', name: 'ប្រព័ន្ធគ្រប់គ្រងសាលារៀន',
    english: 'School management', price: '$350', priceNote: 'ចាប់ពី / គម្រោង',
    summary: 'ជួយសាលារៀនរៀបចំព័ត៌មានសិស្ស ថ្នាក់រៀន វត្តមាន ពិន្ទុ និងការបង់ប្រាក់។',
    details: ['គ្រប់គ្រងសិស្ស និងគ្រូបង្រៀន', 'ថ្នាក់រៀន កាលវិភាគ និងវត្តមាន', 'ពិន្ទុ និងលទ្ធផលសិក្សា', 'ការបង់ប្រាក់ និងរបាយការណ៍'],
    image: 'https://res.cloudinary.com/e0brilgp/image/upload/v1793260576/photo_2026-10-29_14-56-02.jpg',
    theme: 'indigo',
  },
  {
    id: 'care', iconKey: 'shield', name: 'ថែទាំ និងគ្រប់គ្រងវេបសាយ',
    english: 'Hosting & website care', price: 'សាកសួរតម្លៃ', priceNote: 'តាមតម្រូវការ',
    summary: 'ជួយរៀបចំ Domain, Hosting, SSL និងកែបញ្ហាបច្ចេកទេសរបស់វេបសាយ។',
    details: ['ជួយទិញ និងភ្ជាប់ Domain', 'រៀបចំ Hosting និងដាក់វេបសាយឱ្យដំណើរការ', 'SSL, បម្រុងទុក និងស្តារទិន្នន័យ', 'ថែទាំ និងជួយដោះស្រាយបញ្ហាបច្ចេកទេស'],
    image: null,
    theme: 'teal',
  },
]

export const businessNeeds = [
  { id: 'website', iconKey: 'megaphone', problem: 'អតិថិជនមិនងាយស្គាល់អាជីវកម្ម?', solution: 'បង្ហាញព័ត៌មាន និងសេវាកម្មតាមវេបសាយផ្ទាល់ខ្លួន។' },
  { id: 'pos', iconKey: 'package', problem: 'គ្រប់គ្រងស្តុក និងការលក់ពិបាក?', solution: 'តាមដានការលក់ ទំនិញ និងរបាយការណ៍ក្នុងប្រព័ន្ធមួយ។' },
  { id: 'school', iconKey: 'book', problem: 'ព័ត៌មានសិស្ស និងការបង់ប្រាក់ច្រើន?', solution: 'រៀបចំទិន្នន័យសិស្ស វត្តមាន និងការបង់ប្រាក់ឱ្យច្បាស់លាស់។' },
  { id: 'care', iconKey: 'wrench', problem: 'វេបសាយមានបញ្ហាបច្ចេកទេស?', solution: 'ជួយពិនិត្យ កែបញ្ហា និងរៀបចំការថែទាំបន្ត។' },
]

export const industries = [
  { iconKey: 'store', name: 'ហាងលក់ទំនិញ', type: 'pos', detail: 'ការលក់ ស្តុក និងរបាយការណ៍' },
  { iconKey: 'school', name: 'សាលារៀន', type: 'school', detail: 'សិស្ស គ្រូ វត្តមាន និងការបង់ប្រាក់' },
  { iconKey: 'building', name: 'ក្រុមហ៊ុន', type: 'website', detail: 'ព័ត៌មានក្រុមហ៊ុន ផលិតផល និងសេវាកម្ម' },
  { iconKey: 'palmtree', name: 'ទេសចរណ៍ និងសេវាកម្មកក់', type: 'website', detail: 'បង្ហាញសេវាកម្ម និងទទួលការសាកសួរកក់' },
]

// Project visuals and names based on the existing GitHub portfolio.
// Descriptions deliberately focus on what the projects do, rather than their tech stacks.
export const projects = [
  {
    title: 'Explore Koh Rong', category: 'website', label: 'ទេសចរណ៍ និងសេវាកម្មកក់',
    description: 'វេបសាយបង្ហាញសេវាទេសចរណ៍ សណ្ឋាគារ និងជម្រើសកក់សម្រាប់អ្នកធ្វើដំណើរ។',
    image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1773714470/Screenshot_2026-03-17_092725_iigyuh.png',
    url: 'https://explorekohrongtour.com/',
  },
  {
    title: 'School Management System', category: 'system', label: 'ប្រព័ន្ធគ្រប់គ្រងសាលារៀន',
    description: 'ប្រព័ន្ធសម្រាប់រៀបចំទិន្នន័យសិស្ស ថ្នាក់រៀន វត្តមាន ពិន្ទុ និងព័ត៌មានការបង់ប្រាក់។',
    image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1753265313/Screenshot_2025-07-23_170739_y2xp0b.png',
    url: null,
  },
  {
    title: 'Master IT Company', category: 'website', label: 'វេបសាយក្រុមហ៊ុន',
    description: 'វេបសាយសម្រាប់បង្ហាញព័ត៌មានក្រុមហ៊ុន សេវាកម្ម និងគម្រោងការងារ។',
    image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1773715509/copy_of_screenshot_2025-07-23_165811_pt6bxi_5820c2.png',
    url: null,
  },
  {
    title: 'E-Commerce Platform', category: 'website', label: 'វេបសាយលក់ទំនិញ',
    description: 'ហាងលក់ទំនិញអនឡាញដែលមានការបង្ហាញផលិតផល និងមុខងាររទេះទំនិញ។',
    image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1773716050/copy_of_screenshot_2025-07-23_165539_pm0acy_7c107b.png',
    url: 'https://nubbemart.vercel.app/',
  },
  {
    title: 'ERP Process Automation', category: 'automation', label: 'ស្វ័យប្រវត្តិកម្មការងារ',
    description: 'ឧបករណ៍ជួយកាត់បន្ថយការងារធ្វើឡើងវិញទាក់ទងនឹងឯកសារ និងទិន្នន័យអាជីវកម្ម។',
    image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1773737767/Screenshot_2026-03-17_155539_igvilo.png',
    url: null,
  },
  {
    title: 'DSV Document Automation', category: 'automation', label: 'ប្រព័ន្ធគ្រប់គ្រងឯកសារ',
    description: 'ឧបករណ៍ជួយសម្រួលដំណើរការស្វែងរក និងទាញយកឯកសារក្នុងការងារដឹកជញ្ជូន។',
    image: 'https://res.cloudinary.com/dvljcimlz/image/upload/v1773738140/Screenshot_2026-03-17_160144_ksipef.png',
    url: null,
  },
]

export const projectFilters = [
  { id: 'all', label: 'គម្រោងទាំងអស់' },
  { id: 'website', label: 'វេបសាយ' },
  { id: 'system', label: 'ប្រព័ន្ធគ្រប់គ្រង' },
  { id: 'automation', label: 'ស្វ័យប្រវត្តិកម្ម' },
]

export const processSteps = [
  { n: '01', iconKey: 'message', title: 'ប្រាប់ពីបញ្ហា', detail: 'ពិភាក្សាអំពីអាជីវកម្ម និងការងារដែលចង់កែលម្អ។' },
  { n: '02', iconKey: 'clipboard', title: 'កំណត់ដំណោះស្រាយ', detail: 'ជ្រើសមុខងារដែលចាំបាច់ ពេលវេលា និងតម្លៃជាក់ស្តែង។' },
  { n: '03', iconKey: 'monitor', title: 'អភិវឌ្ឍ និងសាកល្បង', detail: 'រចនា បង្កើត និងសាកល្បងជាមួយតម្រូវការរបស់អ្នក។' },
  { n: '04', iconKey: 'rocket', title: 'ដាក់ឱ្យប្រើប្រាស់', detail: 'ប្រគល់ការងារ និងពិភាក្សាអំពីការគាំទ្របន្ត។' },
]

export const faqs = [
  { q: 'តម្លៃ $250 និង $350 រួមបញ្ចូលអ្វីខ្លះ?', a: 'នេះជាតម្លៃចាប់ផ្តើមសម្រាប់គម្រោងមូលដ្ឋាន។ មុខងារ ការរចនា ពេលវេលាប្រគល់ និងតម្លៃចុងក្រោយ នឹងត្រូវកំណត់ក្រោយពេលពិភាក្សា។' },
  { q: 'បើមិនទាន់ដឹងថាត្រូវការប្រព័ន្ធអ្វី តើអាចសាកសួរបានទេ?', a: 'បាន។ អ្នកអាចពិពណ៌នាអំពីការងារ និងបញ្ហាដែលចង់ដោះស្រាយតាម Telegram ឬទម្រង់ទំនាក់ទំនង។' },
  { q: 'តើអាចប្រើវេបសាយលើទូរស័ព្ទបានទេ?', a: 'វេបសាយត្រូវបានរៀបចំឱ្យអាចមើលបានលើទូរស័ព្ទ និងកុំព្យូទ័រ។ សម្រាប់ប្រព័ន្ធគ្រប់គ្រង មុខងារនិងឧបករណ៍ប្រើប្រាស់នឹងពិភាក្សាតាមគម្រោង។' },
  { q: 'តើ Domain និង Hosting គិតថ្លៃបន្ថែមទេ?', a: 'ថ្លៃ Domain, Hosting និងសេវាកម្មពីក្រុមហ៊ុនផ្សេងអាចត្រូវគិតដោយឡែក។ យើងនឹងពិភាក្សាថ្លៃទាំងនេះមុនពេលចាប់ផ្តើម។' },
  { q: 'តើមានការថែទាំក្រោយបញ្ចប់ការងារទេ?', a: 'អាចរៀបចំសេវាកម្មកែបញ្ហា បម្រុងទុក និងថែទាំបន្តតាមកិច្ចព្រមព្រៀង។' },
]

const fs = require('fs');
const path = require('path');

const files = [
  'components/Footer.tsx',
  'app/departments/[id]/page.tsx',
  'app/faq/page.tsx',
  'app/recrutement/page.tsx',
  'app/feedback/page.tsx',
  'app/blog/page.tsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove custom RTL logic to let global CSS and dir="rtl" handle it natively
    content = content.replace(/\$\{language === 'ar' \? '([^']+)' : '([^']+)'\}/g, (match, p1, p2) => {
      // If it's pure styling like text-right or flex-row-reverse, drop it for the default (p2)
      // EXCEPT if it's content translation like 'الفعاليات' : 'Événements', we shouldn't touch pure text logic.
      // But we ONLY used this pattern inside className=`` right? 
      // Let's rely on string specific replaces to be 100% safe.
      return match;
    });

    const specificReplaces = [
      [/\$\{language === 'ar' \? 'text-right' : 'text-left'\}/g, 'text-left'],
      [/\$\{language === 'ar' \? 'flex-row-reverse' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'flex-row-reverse justify-end' : 'justify-start'\}/g, 'justify-start'],
      [/\$\{language === 'ar' \? 'items-end text-right' : 'items-start text-left'\}/g, 'items-start text-left'],
      [/\$\{language === 'ar' \? 'ml-auto' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'lg:flex-row-reverse' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'sm:flex-row-reverse' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'justify-end' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'rotate-180' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'mr-auto ml-0 rotate-180' : 'ml-auto mt-auto'\}/g, 'ml-auto mt-auto'],
      [/\$\{language === 'ar' \? 'text-right pr-12' : 'pl-12 text-left'\}/g, 'pl-12 text-left'],
      [/\$\{language === 'ar' \? 'right-5' : 'left-5'\}/g, 'left-5'],
      [/\$\{language === 'ar' \? 'transform-none' : ''\}/g, ''],
      [/\$\{language === 'ar' \? 'right-4' : 'left-4'\}/g, 'left-4'],
      [/\$\{language === 'ar' \? 'right-5 text-slate-400' : 'left-5 text-slate-400'\}/g, 'left-5 text-slate-400'],
      [/\$\{language === 'ar' \? 'pr-14 pl-5 text-right' : 'pl-14 pr-5 text-left'\}/g, 'pl-14 pr-5 text-left']
    ];

    specificReplaces.forEach(([regex, replacement]) => {
      content = content.replace(regex, replacement);
    });

    // Also strip inline styles
    content = content.replace(/style=\{language === 'ar' \? \{ direction: 'rtl' \} : \{\}\}/g, '');

    fs.writeFileSync(fullPath, content);
    console.log(`Fixed RTL classes in ${file}`);
  }
});

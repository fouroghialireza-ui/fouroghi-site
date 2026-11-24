export type Locale = 'fa' | 'en';
export const localized = (lang: Locale, path: string) => {
  const [pathname, anchor] = path.split('#');
  return `${pathname}${lang === 'en' ? '?lang=en' : ''}${anchor ? `#${anchor}` : ''}`;
};

export const media = {
  hero: 'https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4',
  web: 'https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4',
  media: 'https://cdn.sceneai.art/Hero%20Section%20Video/736fd4a0-70ac-4f44-9633-55769ead6aca.mp4',
};

export const copy = {
  fa: {
    nav: ['خانه', 'درباره من', 'خدمات'], start: 'شروع همکاری', explore: 'مشاهده خدمات', contact: 'تماس', admin: 'ورود مدیر',
    announcement: 'رونمایی از خدمات هوش مصنوعی ۲.۰', hero: 'لایه‌ای از هوش', heroLine: 'برای تصمیم‌های', heroAccent: 'روشن‌تر.',
    intro: 'طراحی وب، تصویرسازی مولد و تولید ویدیوی استودیویی؛ سه تخصص در یک مسیر، از شکل‌گیری ایده تا انتشار.',
    stack: 'ابزارهایی که با آن‌ها می‌سازم', studio: 'توانمندی‌های استودیو',
    chatBadge: 'چت هوشمند و طراحی وب', chatTitle: 'از یک گفت‌وگو تا یک وب‌سایت.', chatText: 'با یک ایده شروع کنیم و به یک وب‌سایت سریع، واکنش‌گرا و راست‌چین برسیم. از سایت شخصی تا وب‌اپ اختصاصی، رابط و تجربهٔ کاربری را متناسب با نیاز پروژه طراحی می‌کنم.', chatBtn: 'خدمات طراحی وب',
    mediaBadge: 'تولید رسانه با هوش مصنوعی', mediaTitle: 'به ایده‌ات تصویر، صدا و حرکت بده.', mediaText: 'از نورپردازی یک عکس محصول تا استوری‌بورد و تدوین یک ویدیوی کوتاه. برای پروژه‌هایی که به صدا نیاز دارند، تبدیل گفتار به متن و آماده‌سازی زیرنویس هم در نظر می‌گیرم.', mediaBtn: 'خدمات تولید محتوا',
    faqLabel: 'پرسش‌های متداول', faqTitle: 'قبل از شروع',
    faq: [
      ['چطور سفارش ثبت کنم؟', 'از فرم تماس دربارهٔ هدف، نوع خروجی و زمان مدنظرت بگو تا بتوانیم دامنهٔ پروژه را مشخص کنیم.'],
      ['سایت با چه فناوری‌ای ساخته می‌شود؟', 'بسته به نیاز، از Next.js، وردپرس یا یک وب‌اپ اختصاصی استفاده می‌کنم. انتخاب فناوری بعد از بررسی محتوا و امکانات انجام می‌شود.'],
      ['آیا سبک تصاویر را می‌شود سفارشی کرد؟', 'بله. سبک، نور، رنگ و نسبت تصویر را با توجه به هویت بصری و محل انتشار تنظیم می‌کنم.'],
      ['آیا ساخت ویدیو شامل زیرنویس است؟', 'در صورت نیاز، تبدیل گفتار به متن، بازبینی متن و آماده‌سازی زیرنویس را می‌توانیم در دامنهٔ پروژه قرار دهیم.'],
      ['هزینه و زمان تحویل چطور مشخص می‌شود؟', 'بعد از روشن شدن حجم کار، خروجی‌ها، زمان‌بندی و تعداد دورهای بازبینی، برآورد ارائه می‌شود.'],
    ],
    cta: 'آماده‌ای کارها را خودکار کنی؟', ctaText: 'اگر ایده‌ای برای وب یا تولید محتوا داری، از همان ایده شروع کنیم.',
    footerBlurb: 'استودیوی مستقل علیرضا فروغی برای وب و رسانهٔ مولد.', footerGroups: ['صفحه‌ها', 'خدمات', 'ارتباط'], rights: '© ۲۰۲۶ Plety. تمامی حقوق محفوظ است • ساخته‌شده با Next.js و Vazirmatn',
  },
  en: {
    nav: ['Home', 'About me', 'Services'], start: 'Get started', explore: 'Explore services', contact: 'Contact', admin: 'Admin login',
    announcement: 'Announcing AI Services 2.0', hero: 'The intelligence layer', heroLine: 'for clear', heroAccent: 'decisions.',
    intro: 'Our platform integrates seamlessly to deliver AI web development, generative images, and studio video production.',
    stack: 'Tools behind the work', studio: 'Studio capabilities',
    chatBadge: 'AI chat & web creation', chatTitle: 'From a conversation to a website.', chatText: 'Start with an idea and turn it into a fast, responsive site. From personal websites to custom web apps, I design interfaces and user journeys that suit the project.', chatBtn: 'Explore web development',
    mediaBadge: 'AI media generation', mediaTitle: 'Give your ideas sight, sound and motion.', mediaText: 'From studio lighting in a product image to storyboards and short-form video edits. For projects with audio, I can also prepare transcripts and captions.', mediaBtn: 'Explore media services',
    faqLabel: 'Frequently asked questions', faqTitle: 'Before we start',
    faq: [
      ['How do I start a project?', 'Use the contact form to share your goal, intended deliverables and timeline so we can define the project scope.'],
      ['What technology do you use for websites?', 'I work with Next.js, WordPress and custom web applications. The right choice depends on your content and the features you need.'],
      ['Can you match a specific image style?', 'Yes. I can tailor lighting, color, composition and aspect ratio to your visual identity and publication channel.'],
      ['Can video production include captions?', 'Yes. We can include speech-to-text transcription, a review pass and caption preparation in the project scope.'],
      ['How do you set pricing and delivery dates?', 'I provide an estimate after we agree on scope, deliverables, timing and revision rounds.'],
    ],
    cta: 'Ready to automate everything?', ctaText: 'Have an idea for the web or a piece of content? Let’s start there.',
    footerBlurb: 'Alireza Foroughi’s independent studio for the web and generative media.', footerGroups: ['Navigate', 'Services', 'Connect'], rights: '© 2026 Plety. All rights reserved • Made with Next.js & Vazirmatn',
  }
} as const;

export const services = [
  { id: 'web', art: 'grid', fa: { title: 'طراحی و توسعه وب‌سایت', short: 'از صفحهٔ معرفی تا وب‌اپ اختصاصی.', detail: 'با توجه به نیاز پروژه، سایت را با Next.js یا وردپرس می‌سازم؛ و وقتی جریان کاری خاصی لازم باشد، یک وب‌اپ اختصاصی طراحی می‌کنم.', items: ['Next.js و طراحی واکنش‌گرا', 'وردپرس و مدیریت محتوا', 'وب‌اپ اختصاصی و تجربهٔ کاربری'] }, en: { title: 'Website design & development', short: 'From a landing page to a custom web app.', detail: 'I build with Next.js or WordPress to suit the project, and design custom web applications when the workflow calls for one.', items: ['Next.js and responsive design', 'WordPress and content management', 'Custom web apps and UX'] } },
  { id: 'image', art: 'prism', fa: { title: 'تولید تصویر با هوش مصنوعی', short: 'تصاویر دقیق، از شات محصول تا کمپین.', detail: 'برای تصاویر فوتورئال و تجاری، نورپردازی، ترکیب‌بندی و پرامپت را متناسب با برند تنظیم می‌کنم و خروجی را برای محل انتشار آماده می‌کنم.', items: ['تصویرسازی فوتورئال', 'نورپردازی استودیویی', 'پرامپت‌نویسی تجاری و آماده‌سازی برای انتشار'] }, en: { title: 'AI image generation', short: 'Art-directed imagery for products and campaigns.', detail: 'I tune lighting, composition and prompts to create photorealistic commercial visuals sized for their final use.', items: ['Photorealistic image generation', 'Studio lighting and product styling', 'Commercial prompts and delivery formats'] } },
  { id: 'video', art: 'pulse', fa: { title: 'تولید ویدیو با هوش مصنوعی', short: 'روایت تصویری برای برند و شبکه‌های اجتماعی.', detail: 'از ایده و استوری‌بورد تا تولید نماهای سینمایی، تدوین کلیپ و آماده‌سازی نسخه‌های مناسب پلتفرم‌های مختلف.', items: ['تولید نما و کلیپ سینمایی', 'استوری‌بورد و روایت‌پردازی', 'تدوین، تبدیل گفتار به متن و زیرنویس'] }, en: { title: 'AI video production', short: 'Visual storytelling for brands and social channels.', detail: 'From a storyboard to cinematic shots and short-form edits, I shape the final piece for the channels it will be published on.', items: ['Generated video and cinematic clips', 'Storyboarding and storytelling', 'Editing, transcription and captions'] } },
] as const;

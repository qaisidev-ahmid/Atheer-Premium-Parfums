// تعليق: انتظر حتى يتم تحميل كل عناصر الـ DOM بالكامل في المتصفح لضمان استقرار المؤثرات الحركية الخرافية
document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------------------
    // 1. تأثير الإمالة ثلاثي الأبعاد لكارت العطر الفاخر (3D Tilt Card Effect)
    // -------------------------------------------------------------
    const parfumCard = document.querySelector(".parfum-card");

    if (parfumCard) {
        // دالة الاستماع لحركة الماوس فوق كارت العطر لصنع تأثير الـ Parallax ثلاثي الأبعاد
        parfumCard.addEventListener("mousemove", (e) => {
            const cardRect = parfumCard.getBoundingClientRect();
            
            // حساب مركز الكارت الرياضي بدقة بالبكسل
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;

            // حساب المسافة بين مؤشر الماوس ومركز الكارت
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // معادلة حركية ذكية لتحويل المسافة إلى درجات دوران مرنة (بحد أقصى 15 درجة منعاً للتشوه)
            const rotateX = (-mouseY / (cardHeight / 2)) * 15;
            const rotateY = (mouseX / (cardWidth / 2)) * 15;

            // حقن درجات الدوران برمجياً داخل خاصية الـ transform مع الحفاظ على تنعيم التصفح
            parfumCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });

        // دالة الاستماع لخروج الماوس لإعادة الكارت لوضعه الطبيعي والانسيابي بمرونة
        parfumCard.addEventListener("mouseleave", () => {
            parfumCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    }

    // -------------------------------------------------------------
    // 2. أنيميشن انفجار الجزيئات المتوهجة عند الضغط على الأزرار (Particle Burst Effect)
    // -------------------------------------------------------------
    const actionButtons = document.querySelectorAll(".btn-amber, .btn-outline-crimson, .btn-buy");

    actionButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // إنشاء 8 جزيئات ضوئية متفجرة تتطاير عند كل ضغطة زاوية
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement("div");
                particle.classList.add("glow-particle");
                
                // تحديد موقع الانفجار ليكون خارجاً من نقطة ضغطة الماوس بالملي
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;

                // دمج الألوان عشوائياً بين المشمشي الخوخي والأحمر القرمزي ليتطابق مع باليتة صورتك
                const colors = ["#FFA586", "#B51A2B"];
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

                // حساب زوايا تطاير عشوائية للجزيء في الفراغ البصري
                const destinationX = (Math.random() - 0.5) * 160;
                const destinationY = (Math.random() - 0.5) * 160;
                particle.style.setProperty('--x', `${destinationX}px`);
                particle.style.setProperty('--y', `${destinationY}px`);

                // حقن الجزيء داخل الزر وحذفه تلقائياً بعد 0.8 ثانية لتوفير ذاكرة المتصفح ومنع التعليق
                btn.appendChild(particle);
                setTimeout(() => {
                    particle.remove();
                }, 800);
            }
        });
    });
});

// -------------------------------------------------------------
// 3. حقن أكواد الأنيميشن الحركية (Keyframes) برمجياً لضمان انفجار الجزيئات بمرونة كاملة
// -------------------------------------------------------------
const customStyles = document.createElement("style");
customStyles.type = "text/css";
customStyles.innerText = `
    .glow-particle {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px currentcolor;
        animation: flyAndFade 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        z-index: 10;
    }
    @keyframes flyAndFade {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(customStyles);

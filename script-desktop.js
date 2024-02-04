jQuery(document).ready(function ($) {
    var triangle = $('.arrow');
    var circle = $('.circle');
    var infoText = $('.info-text');
    var startButton = $('.start-button'); // زر جديد لبدء اللعب
    var resetButton = $('.reset-button');
    var replayButton = $('.replay-button'); // زر جديد لإعادة اللعب
    var gameCount = 0; 
    var gameCountText = $('.game-count-text'); 
    var difficultyLevel = 1; 
    var resetCount = 0; 
    var zeroPointCount = 0; 
    var targetPosition = 150; // نصف عرض الدائرة

    resetButton.hide();
    gameCountText.hide(); // تم تحديث هذا السطر
    replayButton.hide(); // إخفاء زر الإعادة في البداية

startButton.on('click', function (event) {
    gameCountText.show(); // إظهار الجملة عند الضغط على الزر
    handleTriangleClick(event);
    startButton.hide();
    resetButton.show();
});
    function handleTriangleClick(event) {
        event.preventDefault();

        var distanceRatio = calculateDistanceRatio();

        stopCircle(distanceRatio);
        if (distanceRatio < 40 / difficultyLevel) { // تم تحديث هذا السطر
            circle.css('background-image', "url('" + plugin_dir_url.url + "image/tankc2.png')");
        } else {
            circle.css('background-image', "url('" + plugin_dir_url.url + "image/tankc1.png')");
        }
        gameCount++; 
        gameCountText.text('استخدمت اللعبة: ' + gameCount); 
        gameCountText.show(); // تم تحديث هذا السطر

        if (distanceRatio < 40 / difficultyLevel) { // تم تحديث هذا السطر
            difficultyLevel++;
            zeroPointCount++; 
            infoText.text('رائع! لقد حققت الهدف الرئيسي ووصلت إلى 0%');
        } else {
            infoText.text('نسبتك هي: ' + distanceRatio.toFixed(2) + '%');
        }

        triangle.off('mousedown'); 
        triangle.css('animation', 'shake 0.5s'); 

        resetButton.show();
    }

    triangle.on('mousedown', handleTriangleClick);

    resetButton.on('click', function (event) {
        event.preventDefault();

        if (resetCount < 9) {
            moveCircle(difficultyLevel); 
            circle.css('background-image', "url('" + plugin_dir_url.url + "image/tankc1.png')"); // تم تحديث هذا السطر

            triangle.on('mousedown', handleTriangleClick); 
            triangle.css('animation', 'bounce 2s infinite'); 
            resetCount++; 

            resetButton.hide(); // إخفاء زر إعادة التحريك
            startButton.show(); // إظهار زر البداية
        } else {
            circle.hide(); 
            triangle.hide(); 
            resetButton.hide(); 
            replayButton.show(); // إظهار زر الإعادة بعد استنفاذ المحاولات
            infoText.text('شكرا لك .. استنزفت المحاولات العشرة وحققت نقطة الصفر ' + zeroPointCount + ' من 10'); 
        }
    });

    replayButton.on('click', function (event) { // إعادة تعيين اللعبة عند الضغط على زر الإعادة
        event.preventDefault();
        circle.show(); 
        triangle.show(); 
        resetButton.hide(); // إخفاء زر إعادة التحريك
        replayButton.hide(); 
        startButton.show(); // إظهار زر البداية
        gameCount = 0; 
        gameCountText.hide(); // إخفاء نص عدد مرات اللعب
        difficultyLevel = 1; 
        resetCount = 0; 
        zeroPointCount = 0; 
        infoText.text('');

        // إعادة تعيين الحدث 'mousedown'
        triangle.on('mousedown', handleTriangleClick);

        triangle.css('animation', 'bounce 2s infinite'); 
        circle.css('animation-play-state', 'running');
        circle.css('animation-duration', 10 / difficultyLevel + 's'); 
        circle.css('background-image', "url('" + plugin_dir_url.url + "image/tankc1.png')"); // إعادة تعيين الصورة إلى الصورة الأصلية
    });

    function calculateDistanceRatio() {
        var trianglePosition = triangle.offset();
        var triangleWidth = triangle.width(); // الحصول على عرض السهم
        var circlePosition = circle.offset();
        var circleWidth = circle.width();
        var direction = (circle.css('animation-direction') === 'normal') ? 1 : -1;
        var targetPosition = (direction === 1) ? 100 : 105; // تحديث نقطة الهدف بناءً على الاتجاه
        var distance = Math.abs((circlePosition.left + targetPosition) - (trianglePosition.left + triangleWidth / 2)); // حساب المسافة بين وسط السهم والموضع المستهدف
        var distanceRatio = (distance / circleWidth) * 100;

        return distanceRatio;
    }

    function stopCircle(distanceRatio) {
        circle.css('animation-play-state', 'paused');
    }

    function moveCircle(difficultyLevel) {
        circle.css('animation-play-state', 'running');
        circle.css('animation-duration', 10 / difficultyLevel + 's'); 
        infoText.text('');
    }
});

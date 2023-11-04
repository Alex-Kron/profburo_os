// Игровые переменные
let canvas, ctx;
let bird;
let pipes = [];
let coin;
let score = 0;
let frameCount = 0;

// Получаем ссылку на кнопку "Старт игры"
const startButton = document.getElementById("startButton");

// Обработчик события для кнопки "Старт игры"
startButton.addEventListener("click", startGame);

// Функция запуска игры
function startGame() {
    // Ваш код для начала игры
    console.log("Игра началась!");
    init
}

// Инициализация игры
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    bird = new Bird();
    pipes.push(new Pipe());

    // Создаем монетку
    coin = new Coin();

    // Управление птицей при клике
    canvas.addEventListener("click", () => bird.jump());

    // Запуск игрового цикла
    setInterval(gameLoop, 20);
}

// Основной игровой цикл
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Перемещение и отрисовка объектов
    bird.update();
    bird.draw();
    coin.update();
    coin.draw();

    // Проверка столкновений с трубами и монеткой
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].draw();

        if (pipes[i].hits(bird)) {
            // Конец игры при столкновении с трубой
            alert("Game Over. Your Score: " + score);
            location.reload(); // Перезагрузка страницы после окончания игры
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    // Проверка столкновения с монеткой и увеличение счета
    if (coin.hits(bird)) {
        score++;
        coin = new Coin();
    }

    // Добавление новых труб через каждые 150 кадров
    if (frameCount % 150 === 0) {
        pipes.push(new Pipe());
    }

    // Отображение счета на экране
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);

    frameCount++;
}

class Bird {
    constructor() {
        this.y = canvas.height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
        this.icon = new Image();
        this.icon.src = "/images/cosatka.png"; // Путь к изображению птицы
        this.width = 50; // Ширина изображения птицы
        this.height = 36; // Высота изображения птицы
    }

    jump() {
        this.velocity += this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.9; // Добавляем затухание, чтобы птица не летела слишком быстро
        this.y += this.velocity;

        // Птица не должна выходить за пределы холста
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }

        // Птица не должна выходить за верхний край холста
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    draw() {
        ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
    }
}

class Pipe {
    constructor() {
        this.top = Math.random() * (canvas.height / 2) + 20;
        this.bottom = canvas.height - this.top - 100;
        this.x = canvas.width;
        this.width = 50;
        this.speed = 2;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        ctx.fillStyle = "#008000"; // Зеленый цвет для труб
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }

    offscreen() {
        return this.x < -this.width;
    }

    // Проверка столкновения с птицей
    hits(bird) {
        return (
            bird.x + bird.width > this.x &&
            bird.x < this.x + this.width &&
            (bird.y < this.top || bird.y + bird.height > canvas.height - this.bottom)
        );
    }
}

class Coin {
    constructor() {
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 200) + 100;
        this.width = 30;
        this.height = 30;
        this.speed = 2;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        ctx.fillStyle = "#FFD700"; // Цвет монеты (желтый)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Проверка столкновения с птицей
    hits(bird) {
        let halfBirdWidth = bird.width / 2;
        let halfBirdHeight = bird.height / 2;
        let halfCoinWidth = this.width / 2;
        let halfCoinHeight = this.height / 2;

        // Проверка наличия пересечения по осям X и Y
        return (
            this.x + halfCoinWidth > bird.x - halfBirdWidth &&
            this.x - halfCoinWidth < bird.x + halfBirdWidth &&
            this.y + halfCoinHeight > bird.y - halfBirdHeight &&
            this.y - halfCoinHeight < bird.y + halfBirdHeight
        );
    }
}


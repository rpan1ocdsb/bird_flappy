updateList.push({f: () => updatePipes()});
drawList.push({f: () => drawPipes(), lay: 2});
resetList.push({f: () => resetPipes()});
intervalUpdateList.push({f: () => spawnPipes(), int: 90, cnt: 0});

const PIPE_SPEED = 3;
const PIPE_GAP_SIZE = 140;
const PIPE_MAX_HEIGHT = 100;
const PIPE_MIN_HEIGHT = 300;
const PIPE_WIDTH = 80;

var pipeList = [];

function resetPipes()
{
    pipeList = [];
}

function updatePipes()
{
    for (var i of pipeList)
    {
        i.update();
    }
}

function drawPipes()
{
    for (var i of pipeList)
    {
        i.draw();
    }
}

function spawnPipes()
{
    var height = Math.random()*(PIPE_MIN_HEIGHT - PIPE_MAX_HEIGHT) + PIPE_MAX_HEIGHT;

    var c = false;

    if (Math.random() > 0.9) {
        c = true;
    }

    pipeList.push(new pipeClass(height, c));
}

class pipeClass
{
    constructor(height, coin)
    {
        this.height = height;
        this.dist = CANVAS_WIDTH;
        this.score = false;
        this.coin = coin;
    }

    update()
    {
        this.move();
        this.collision();
        this.scoreCheck();
    }

    move()
    {
        if (bird.live)
        {
            this.dist -= PIPE_SPEED;

            if (this.dist < -PIPE_WIDTH)
            {
                pipeList.splice(pipeList.indexOf(this), 1);
            }
        }
    }

    collision()
    {
        if (BIRD_X + BIRD_WIDTH > this.dist && BIRD_X < this.dist + PIPE_WIDTH)
        {
            if (bird.height < this.height || bird.height + BIRD_HEIGHT > this.height + PIPE_GAP_SIZE)
            {
                killBird();
            }
        }
    }

    scoreCheck()
    {
        if (BIRD_X > this.dist && !this.score)
        {
            if (this.coin) {
                score += 2;
            } else {
                score++;

            }
            this.score = true;
        }
    }

    draw()
    {
        drawRect(this.dist, 0, PIPE_WIDTH, this.height, "orange");
        drawRect(this.dist, this.height + PIPE_GAP_SIZE, PIPE_WIDTH, CANVAS_HEIGHT, "orange");
        if (!this.score && this.coin) {
            drawCircle(this.dist + PIPE_WIDTH/2, this.height + 30 + PIPE_WIDTH/3, PIPE_WIDTH/3, "yellow")
        }
    }
}
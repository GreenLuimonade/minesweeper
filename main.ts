input.onPinTouchEvent(TouchPin.P1, input.buttonEventDown(), function () {
    if (!loose) {
        led.toggle(X, Y)
        Y += 1
        if (Y == 5) {
            Y = 0
        }
        led.toggle(X, Y)
        detect()
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (!loose) {
        count = 0
        for (let i = 0; i <= 4; i++) {
            Xi = XList[i]
            Yi = YList[i]
            if (X == Xi && Y == Yi) {
                conincidence = true
            }
        }
        if (conincidence) {
            loose = true
            basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
            for (let j = 0; j <= 4; j++) {
                Xi = XList[j]
                Yi = YList[j]
                led.plot(Xi, Yi)
            }
        } else {
            for (let k = 0; k <= 4; k++) {
                Xi = XList[k]
                Yi = YList[k]
                if (Xi == X - 1 && Yi == Y || Xi == X + 1 && Yi == Y) {
                    count += 1
                }
                if (Xi == X - 1 && Yi == Y - 1 || Xi == X && Yi == Y - 1 || Xi == X + 1 && Yi == Y - 1) {
                    count += 1
                }
                if (Xi == X - 1 && Yi == Y + 1 || Xi == X && Yi == Y + 1 || Xi == X + 1 && Yi == Y + 1) {
                    count += 1
                }
            }
            Color()
            Xex.push(X)
            Yex.push(Y)
            det.push(count)
        }
    }
})
function Color () {
    if (count == 0) {
        basic.setLedColor(0x7c7c7c)
    }
    if (count == 1) {
        basic.setLedColor(0x00ffda)
    }
    if (count == 2) {
        basic.setLedColor(0x0bff00)
    }
    if (count == 3) {
        basic.setLedColor(0xfcff00)
    }
    if (count == 4) {
        basic.setLedColor(0xff9400)
    }
    if (count == 5) {
        basic.setLedColor(0xff2500)
    }
}
input.onPinTouchEvent(TouchPin.P0, input.buttonEventDown(), function () {
    if (!loose) {
        led.toggle(X, Y)
        X += -1
        if (X == -1) {
            X = 4
        }
        led.toggle(X, Y)
        detect()
    }
})
input.onPinTouchEvent(TouchPin.P2, input.buttonEventDown(), function () {
    if (!loose) {
        led.toggle(X, Y)
        Y += -1
        if (Y == -1) {
            Y = 4
        }
        led.toggle(X, Y)
        detect()
    }
})
input.onPinTouchEvent(TouchPin.P3, input.buttonEventDown(), function () {
    if (!loose) {
        led.toggle(X, Y)
        X += 1
        if (X == 5) {
            X = 0
        }
        led.toggle(X, Y)
        detect()
    }
})
let loose = false
let conincidence = false
let det: number[] = []
let Yex: number[] = []
let Xex: number[] = []
let Yi = 0
let Xi = 0
let Xo = 0
let Yo = 0
let count = 0
let YList: number[] = []
let XList: number[] = []
let X = 0
let Y = 0
for (let index = 0; index <= 4; index++) {
    Y = randint(0, 4)
    X = randint(0, 4)
    while (led.point(X, Y) == true) {
        Y = randint(0, 4)
        X = randint(0, 4)
    }
    XList.push(X)
    YList.push(Y)
}
X = 0
Y = 0
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
led.toggle(X, Y)
function detect() {
    for (let f = 0; f <= Xex.length; f++) {
        Xo = Xex[f]
        Yo = Yex[f]
        if (X == Xo && Y == Yo) {
            count = det[f]
            Color()
            led.plot(X,Y)
        }
        else {
            led.unplot(Xo, Yo)
        }
    }
}
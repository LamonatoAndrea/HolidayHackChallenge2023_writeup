var screenCenterX, screenCenterY;
var game, config, UserInputBlock;
var buttons;
var card0, card1, card2, card3, card4, card5, card6, card7, card8, card9;
var cardArray1 = [null, null, null, null, null];
var cardArray2 = [null, null, null, null, null];
var ToastMessage, current_card, PlayerScoreToast, ShiftyElfScoreToast;
var ShiftyElfIsTalking = false
var currently_playing = false
var resetting = false
var min_circle, max_circle;
var inst_scroll, scroll_text;
var ShiftyElfBody, ShiftyElfLeft, ShiftyElfRight, ShiftyElfJaw
// https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/

const COLOR_PRIMARY = 0x3d474d;
const COLOR_LIGHT = 0x888888;
const COLOR_DARK = 0x00001a;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'js/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('shiftybody', 'img/shiftybody.png');
        this.load.image('shiftyjaw', 'img/shiftyjaw.png');
        this.load.image('shiftyl', 'img/shiftyl.png');
        this.load.image('shiftyr', 'img/shiftyr.png');
        this.load.plugin('rexbbcodetextplugin', 'js/rexbbcodetextplugin.min.js', true);
        this.load.plugin('rextexteditplugin', 'js/rextexteditplugin.min.js', true);
        this.load.image('card', 'img/card_alt.png');
        //this.load.spritesheet('dvoraks_talk', 'img/dvorak_talk.png', { frameWidth: 216, frameHeight: 305, startFrame:0, endFrame:19});
        //this.load.spritesheet('dvoraks_idle', 'img/dvorak_idle.png', { frameWidth: 216, frameHeight: 305, startFrame:0, endFrame:19});
        this.load.spritesheet('talking', 'img/Talking_No_Body.png', { frameWidth: 306, frameHeight: 697, startFrame: 0, endFrame: 24 });
        this.load.spritesheet('arms', 'img/Arms_No_Head.png', { frameWidth: 307, frameHeight: 666, startFrame: 0, endFrame: 11 });

        //this.load.image('nextPage', 'img/arrow-down-left.png');
        this.load.image('table', 'img/table.png');
        this.load.image('min', 'img/min_green_loop.png');
        this.load.image('max', 'img/max_green_loop.png');
        this.load.image('bg', 'img/beachbg.jpg');
        this.load.image('scroll', 'img/scroll.png');
        /*video = $("#vid")[0]
        $(video).attr('src', "img/warp_portal_short.webm");
        video.load();
        //$(video).on('ended',function(){
        //    window.location.href = "finale.html"
        //});
        video.addEventListener("timeupdate", function () {
            if (video.currentTime > video.duration - 0.5) {
                // 0.5 is seconds before end.
                video.pause();
                window.location.href = "finale.html"
            }
        });*/
    }

    create() {
        var style = {
            //font: "80px Arial",
            align: "center",
            halign: 'center',
            //backgroundColor: '#f2f5da',
            valign: 'center',
            color: '#404040',
            fontSize: '30px',
            fontFamily: 'monospace',
        };
        screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.image(0, 0, 'bg').setScale(1).setOrigin(0, 0).setPosition(0, -270)
        inst_scroll = this.add.image(screenCenterX, screenCenterY, 'scroll')
        inst_scroll.setScale(0.95).setOrigin(0.5, 0.5)
        inst_scroll.setInteractive();
        inst_scroll.setDepth(199)
        inst_scroll.setPosition(screenCenterX, screenCenterY)
        var scroll_text = `
Welcome to Shifty's Card Shuffle

To play, you must pick five unique
cards numbering from 0-9. Whoever
picks the lowest and highest
numbers gets a point for each. If
you and shifty both pick the same
number that number is canceled out.
First one to 10 points wins.

Shifty definitely doesn't cheat 😉

Click on the scroll to begin.`.trim()
        scroll_text = this.add.text(screenCenterX, screenCenterY, scroll_text, style).setOrigin(0.5, 0.5);
        scroll_text.setPosition(screenCenterX, screenCenterY)
        scroll_text.setDepth(200)
        inst_scroll.on('pointerup', function () {
            Talk('Best of luck! You\'ll need it...')
            inst_scroll.setVisible(false)
            scroll_text.setVisible(false)
        });
        //dvoraks = this.add.image(screenCenterX*2.1, screenCenterY, 'dvoraks').setOrigin(0.5,0.5)
        //dvoraks.scale = 0.5;
        let table = this.add.image(screenCenterX, screenCenterY * 1.9, 'table').setOrigin(0.5, 0.5).setScale(0.6)
        table.setDepth(1)
        min_circle = this.add.image(screenCenterX, screenCenterY * 1.7, 'min').setOrigin(0.5, 0.5).setScale(0.6)
        min_circle.setDepth(100)
        min_circle.setVisible(false)
        max_circle = this.add.image(screenCenterX, screenCenterY * 1.7, 'max').setOrigin(0.5, 0.5).setScale(0.6)
        max_circle.setDepth(100)
        max_circle.setVisible(false)
        this.anims.create({
            key: 'talking',
            frames: this.anims.generateFrameNumbers('talking', { frames: Array(24).fill(0).map((x, y) => x + y) }),
            frameRate: 12,
            repeat: -1
        })
        this.anims.create({
            key: 'arms_close',
            frames: this.anims.generateFrameNumbers('arms', { frames: Array(12).fill(0).map((x, y) => x + y) }),
            frameRate: 24,
            repeat: 0,
            onComplete: function () {

            }
        })
        this.anims.create({
            key: 'arms_open',
            frames: this.anims.generateFrameNumbers('arms', { frames: Array(12).fill(0).map((x, y) => x + y).reverse() }),
            frameRate: 24,
            repeat: 0
        })
        style = {
            //font: "80px Arial",
            align: "center",
            halign: 'center',
            backgroundColor: '#f2f5da',
            valign: 'center',
            color: '#404040',
            fontSize: '30px',
            fixedWidth: 40,
            fixedHeight: 30,
            fontFamily: 'monospace',
        };
        let half = cardArray1.length / 2;
        for (var i = 0; i < cardArray1.length; i++) {
            var n = i + (half - cardArray1.length)
            cardArray1[i] = this.add.sprite(screenCenterX, screenCenterY - 60, 'card').setOrigin(0.5, 0.5)
            cardArray1[i].orig_xy = { 'x': screenCenterX, 'y': screenCenterY - 60 }
            cardArray1[i].scale = 0.04;
            //cardArray1[i].setPosition(screenCenterX + (30 * n), screenCenterY - 60);
            //cardArray1[i].rotation = 0.2 * n;
            cardArray1[i].alpha = 0
            cardArray1[i].setDepth(1)
            cardArray1[i].cardtext = this.add.text(0, 0, "-", style).setOrigin(0.5, 0.5);
            cardArray1[i].cardtext.setVisible(false)
            //cardArray1[i].setVisible(false);
            cardArray1[i].card_tween = this.tweens.create({
                targets: [cardArray1[i]],
                rotation: 0.2 * n,
                x: screenCenterX + (30 * n),
                y: screenCenterY - 40,
                alpha: 1.0,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {

                }.bind(this, cardArray1[i]),
            })
            cardArray1[i].show_tween = this.tweens.create({
                targets: [cardArray1[i]],
                rotation: 0,
                x: screenCenterX + (100 * n) + 40,
                y: screenCenterY - 100,
                scale: 0.1,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {

                }.bind(this, cardArray1[i]),
            })
            cardArray1[i].card_tweenphaseout = this.tweens.create({
                targets: [cardArray1[i]],
                alpha: 0,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {

                }.bind(this, cardArray1[i]),
            })
        }
        style = {
            //font: "80px Arial",
            align: "center",
            halign: 'center',
            backgroundColor: '#f2f5da',
            valign: 'center',
            color: '#404040',
            fontSize: '50px',
            fixedWidth: 75,
            fixedHeight: 60,
            fontFamily: 'monospace',
        };
        for (var i = 0; i < cardArray2.length; i++) {
            var n = i + (half - cardArray2.length)
            cardArray2[i] = this.add.sprite(screenCenterX, screenCenterY + 200, 'card').setOrigin(0.5, 0.5)
            cardArray2[i].scale = 0.15;
            cardArray2[i].orig_scale = cardArray2[i].scale
            cardArray2[i].setPosition(screenCenterX + (30 * n), screenCenterY + 200);
            cardArray2[i].orig_xy = { 'x': screenCenterX + (30 * n), 'y': screenCenterY + 200 }
            cardArray2[i].rotation = (0.2 * n);
            //cardArray2[i].inputEnabled = true;
            cardArray2[i].setInteractive();
            cardArray2[i].on('pointerup', this.card_click_listener.bind(this, cardArray2[i]));
            cardArray2[i].isopen = false
            cardArray2[i].num = i + 1
            cardArray2[i].depth = cardArray2[i].num
            cardArray2[i].cardtext = this.add.text(0, 0, "-", style).setOrigin(0.5, 0.5);
            cardArray2[i].cardtext.depth = cardArray2[i].depth
            cardArray2[i].card_tweenopen = this.tweens.create({
                targets: [cardArray2[i]],
                rotation: 0,
                x: screenCenterX,
                y: screenCenterY,
                scale: 0.25,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {
                    img.depth = cardArray2.length + 1
                    img.cardtext.depth = img.depth
                    UserInputBlock.setVisible(true);
                    UserInputBlock.setText(current_card.cardtext.text)
                    UserInputBlock.emit('pointerup')
                    UserInputBlock.depth = cardArray2.length + 2
                    UserInputBlock.text = '-'
                }.bind(this, cardArray2[i]),
            })
            cardArray2[i].card_tweenclose = this.tweens.create({
                targets: [cardArray2[i]],
                rotation: (0.2 * n),
                x: screenCenterX + (30 * n),
                y: screenCenterY + 200,
                scale: 0.15,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {
                    img.depth = img.num
                    img.cardtext.depth = img.depth
                }.bind(this, cardArray2[i]),
            })
            cardArray2[i].alpha = 0
            cardArray2[i].card_tweenphasein = this.tweens.create({
                targets: [cardArray2[i]],
                alpha: 1.0,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {
                    //img.setInteractive(true)
                }.bind(this, cardArray2[i]),
            })
            cardArray2[i].card_tweenphaseout = this.tweens.create({
                targets: [cardArray2[i]],
                alpha: 0,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {

                }.bind(this, cardArray2[i]),
            })
            cardArray2[i].show_tween = this.tweens.create({
                targets: [cardArray2[i]],
                rotation: 0,
                x: screenCenterX + (150 * n) + 75,
                y: screenCenterY + 100,
                //scale: 0.15,
                duration: 400,
                completeDelay: 0,
                onComplete: function (img) {

                }.bind(this, cardArray2[i]),
            })
            cardArray2[i].card_tweenphasein.play()
        }
        PlayerScoreToast = this.rexUI.add.toast({
            x: 0,
            y: screenCenterY * 2,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, "#404040"),
            text: this.add.text(0, 0, '', {
                fontSize: '20px'
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
            duration: {
                in: 200,
                hold: 9999 * 9999,
                out: 200,
            },
        }).setOrigin(0, 1)
        PlayerScoreToast.setDepth(2)
        ShiftyElfScoreToast = this.rexUI.add.toast({
            x: screenCenterX * 2,
            y: screenCenterY * 2,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, "#404040"),
            text: this.add.text(0, 0, '', {
                fontSize: '20px'
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
            duration: {
                in: 200,
                hold: 9999 * 9999,
                out: 200,
            },
        }).setOrigin(1, 1)
        ShiftyElfScoreToast.setDepth(2)
        var rid = getIdFromUrlOrDefault()
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            async: true,
            url: `action?id=${rid}`,
            data: JSON.stringify({ 'score': '' }),
            complete: function (data) {
                var response = JSON5.parse(data.responseText)
                if (response.request === true) {
                    if (response.data.conduit) {
                        __POST_RESULTS__(response.data.conduit)
                    }
                    ShiftyElfScoreToast.showMessage("Shifty's Score: " + response.data.shifty_score + ' ')
                    PlayerScoreToast.showMessage("Player's Score: " + response.data.player_score) 
                    win_lose_score_message(response.data.score_message, response.data.win_lose_tie_na)
                } else if (response.data) {
                    Talk(response.data)
                }
            }
        });
        ToastMessage = this.rexUI.add.toast({
            x: screenCenterX,
            y: 0,
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, "#404040"),
            text: this.add.text(0, 0, '', {
                fontSize: '20px'
            }),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
            duration: {
                in: 200,
                hold: 3000,
                out: 200,
            },
        }).setTransitOutCallback(function (toast, duration) {
            ShiftyElfIsTalking = false
            ShiftyElfJaw.talkTween.stop()
        }).setOrigin(0.5, 0)
        //card = this.add.image(screenCenterX, screenCenterY, 'card').setOrigin(0.5, 0.5)
        //card.scale = 0.1;
        //NotAnOrcElfTalking.anims.play('arms');
        /*
        dvoraks.on('animationcomplete', function() {
            //dvoraks.setFrame(0)
        });
        cyberdroids.setVisible(false)
                explosion.setFrame(10)
        explosion.setAlpha(0.75)
        t1 = this.tweens.create({
            targets: [dvoraks,cyberdroids,smithereens],
            angle: '+=1',
            //x: '+=100',
            //y: '+=0',
            duration: 400,
            completeDelay: 0,
            onComplete: function () {
                t2.play()
            },
        })
        dvoraks_DialogueBox = createTextBox(this, screenCenterX, 12+(DialogueBoxHeight/2), {
                wrapWidth: 500,
                fixedWidth: 500,
                fixedHeight: 65,
            }).start(dvoraks_content, 20);
        */
        UserInputBlock = this.add.rexBBCodeText(screenCenterX, screenCenterY, '-', {
            color: '#404040',
            fontSize: '80px',
            fixedWidth: 126,
            fixedHeight: 120,
            halign: 'center',
            backgroundColor: '#f2f5da',
            valign: 'center',
            fontFamily: 'monospace',
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerup', function () {
                var conf = {
                    onOpen: function (textObject) {
                        try {
                            //textObject.text = current_card.cardtext.text 
                            //UserInputBlock.setText( img.cardtext.text )
                            //cardArray2[i].cardtext.setText( img.cardtext.text )
                        } catch (e) { }
                    },
                    onTextChanged: function (textObject, text) {
                        textObject.text = text
                        /*try{
                            text = text.trim()
                            if ( Boolean( text.match(/^(?:0|1|2|3|4|5|6|7|8|9|nan)$/ig) ) ) {
                                textObject.text = text
                                current_card.cardtext.setText( textObject.text )
                                return
                            }
                        } catch(e) {}
                        ToastMessage.showMessage(text.slice(0, 3)+' is invalid. Must be 0-9.')*/
                    },
                    onClose: function (textObject) {
                        var text = '-'
                        try {
                            text = textObject.getText().trim();
                            if (IsValid(text)) {
                                for (var i = 0; i < cardArray2.length; i++) {
                                    if (cardArray2[i].cardtext.text == text) {
                                        Talk('You already picked ' + text.slice(0, 3) + ' on another card.')
                                        return
                                    }
                                }
                                textObject.text = text
                                current_card.cardtext.setText(textObject.text)
                                return
                            }
                        } catch (e) { }
                        if (text !== '-') {
                            Talk(text.slice(0, 3) + ' is invalid. You must pick a number from 0-9.')
                        }
                    },
                    selectAll: true,
                }
                this.plugins.get('rextexteditplugin').edit(UserInputBlock, conf);
            }, this);
        UserInputBlock.setVisible(false);

        buttons = this.rexUI.add.buttons({
            x: screenCenterX, y: screenCenterY * 2,
            orientation: 'x',
            //background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
            buttons: [
                createButton(this, 'Play').setOrigin(0.5, 0.5),
            ],
            space: {
                left: 4, right: 4, top: 4, bottom: 4,
                item: 6
            }
        })
            .setOrigin(0.5, 1)
            .layout()

        buttons.getElement('buttons').forEach(function (button) {
            button.popUp(1000, undefined, 'Back');
        })

        buttons
            .on('button.click', function (button, index, pointer, event) {
                var anyOpen = false
                for (var i = 0; i < cardArray2.length; i++) {
                    if (cardArray2[i].card_tweenclose.isPlaying()) {
                        anyOpen = true
                    } else if (cardArray2[i].isopen) {
                        cardArray2[i].isopen = false
                        cardArray2[i].card_tweenclose.play()
                        anyOpen = true
                        UserInputBlock.setVisible(false);
                    }
                }
                if (anyOpen) {
                    return
                }
                button.scaleYoyo(200, 1.2)
                if (!currently_playing) {
                    let arr = []
                    for (var i = 0; i < cardArray2.length; i++) {
                        if (!IsValid(cardArray2[i].cardtext.text.trim() + '')) {
                            Talk('All cards must have a valid number 0-9 before you press play!')
                            return
                        }
                        arr.push(cardArray2[i].cardtext.text.trim())
                    }
                    currently_playing = true
                    buttons.getElement('buttons').forEach(function (button) {
                        button.setText('Redo')
                    })
                    play_card_selection(arr)
                } else if (!resetting) {
                    resetting = true
                    reset_cards()
                }

            })
            .on('button.out', function (button, index, pointer, event) {
                button.alpha = 0.5
            })
            .on('button.over', function (button, index, pointer, event) {
                button.alpha = 1.0
            })
        this.load.image('shiftybody', 'img/shiftybody.png');
        this.load.image('shiftyjaw', 'img/shiftyjaw.png');
        this.load.image('shiftyl', 'img/shiftyl.png');
        this.load.image('shiftyr', 'img/shiftyr.png');
        let offset = 10
        let xoffset = 20
        ShiftyElfBody = this.add.image(screenCenterX - xoffset, screenCenterY - offset, 'shiftybody').setOrigin(0.5, 0.5).setScale(1.5)
        ShiftyElfBody.setDepth(0)
        let displayedWidth = ShiftyElfBody.width * ShiftyElfBody.scaleX;
        let displayedHeight = ShiftyElfBody.height * ShiftyElfBody.scaleY;
        let halfHeight = displayedHeight / 2
        let armOffset = -20
        ShiftyElfLeft = this.add.image(screenCenterX + 70 - xoffset, screenCenterY - armOffset, 'shiftyl').setOrigin(0.5, 0).setScale(1.5)
        ShiftyElfLeft.startX = ShiftyElfLeft.y
        ShiftyElfLeft.startY = ShiftyElfLeft.x
        ShiftyElfLeft.startRotation = ShiftyElfLeft.rotation
        ShiftyElfLeft.armTweenClose = this.tweens.create({
            targets: [ShiftyElfLeft],
            rotation: "+=2.5",
            y: "+=10",
            x: "-=5",
            duration: 200,
            completeDelay: 0,
            onStart: function () {
                ShiftyElfLeft.y = ShiftyElfLeft.startX
                ShiftyElfLeft.x = ShiftyElfLeft.startY
                ShiftyElfLeft.rotation = ShiftyElfLeft.startRotation
            },
            onComplete: function () {
                for (var i = 0; i < cardArray1.length; i++) {
                    var n = i + (half - cardArray1.length)
                    cardArray1[i].setVisible(true);
                    cardArray1[i].card_tween.play();
                    cardArray1[i].setDepth(0)
                    ShiftyElfLeft.setDepth(1)
                    ShiftyElfRight.setDepth(1)
                }
            }
        })
        ShiftyElfRight = this.add.image(screenCenterX - 52 - xoffset, screenCenterY - armOffset, 'shiftyr').setOrigin(0.5, 0).setScale(1.5)
        ShiftyElfRight.startX = ShiftyElfRight.y
        ShiftyElfRight.startY = ShiftyElfRight.x
        ShiftyElfRight.startRotation = ShiftyElfRight.rotation
        ShiftyElfRight.armTweenClose = this.tweens.create({
            targets: [ShiftyElfRight],
            rotation: "-=2.5",
            y: "+=10",
            x: "+=5",
            duration: 200,
            completeDelay: 0,
            onStart: function () {
                ShiftyElfRight.y = ShiftyElfRight.startX
                ShiftyElfRight.x = ShiftyElfRight.startY
                ShiftyElfRight.rotation = ShiftyElfRight.startRotation
            },
            onComplete: function () {

            }
        })
        ShiftyElfLeft.armTweenOpen = this.tweens.create({
            targets: [ShiftyElfLeft],
            rotation: "-=2.5",
            y: "-=10",
            x: "+=5",
            duration: 200,
            completeDelay: 0,
            onStart: function () {
                ShiftyElfLeft.y = ShiftyElfLeft.startX + 10
                ShiftyElfLeft.x = ShiftyElfLeft.startY - 5
                ShiftyElfLeft.rotation = ShiftyElfLeft.startRotation + 2.5
            },
            onComplete: function () {

            }
        })
        ShiftyElfRight.armTweenOpen = this.tweens.create({
            targets: [ShiftyElfRight],
            rotation: "+=2.5",
            y: "-=10",
            x: "-=5",
            duration: 200,
            completeDelay: 0,
            onStart: function () {
                ShiftyElfRight.y = ShiftyElfRight.startX + 10
                ShiftyElfRight.x = ShiftyElfRight.startY + 5
                ShiftyElfRight.rotation = ShiftyElfRight.startRotation - 2.5
            },
            onComplete: function () {

            }
        })
        ShiftyElfJaw = this.add.image(screenCenterX - xoffset, screenCenterY - offset, 'shiftyjaw').setOrigin(0.5, 0.5).setScale(1.5)
        ShiftyElfJaw.talkStartPosX = screenCenterX - xoffset
        ShiftyElfJaw.talkStartPosY = screenCenterY - offset
        ShiftyElfJaw.talkTween = this.tweens.create({
            targets: [ShiftyElfJaw],
            y: "+=13",
            duration: 150,
            yoyo: true,
            repeat: -1,
            onStart: function (tween, targets) {
                ShiftyElfJaw.x = ShiftyElfJaw.talkStartPosX
                ShiftyElfJaw.y = ShiftyElfJaw.talkStartPosY
            },
            onStop: function (tween, targets) {
                ShiftyElfJaw.x = ShiftyElfJaw.talkStartPosX
                ShiftyElfJaw.y = ShiftyElfJaw.talkStartPosY
            }
        })
        armsclose();
    }
    card_click_listener(img, pointer, x, y, PropagationObj) {
        if (!resetting && !currently_playing) {
            for (var i = 0; i < cardArray2.length; i++) {
                if (cardArray2[i].card_tweenopen.isPlaying() || cardArray2[i].card_tweenclose.isPlaying()) { return }
                if (cardArray2[i].isopen && img.num != cardArray2[i].num) {
                    cardArray2[i].isopen = false
                    cardArray2[i].card_tweenclose.play();
                    UserInputBlock.setVisible(false);
                }
            }
            if (img.isopen) {
                img.isopen = false
                img.card_tweenclose.play();
                UserInputBlock.setVisible(false);
            } else {
                img.isopen = true
                current_card = img;
                img.card_tweenopen.play();
            }
            //console.log(img);
        }
    }
    update() {
        for (var i = 0; i < cardArray2.length; i++) {
            cardArray2[i].cardtext.rotation = cardArray2[i].rotation
            cardArray2[i].cardtext.alpha = cardArray2[i].alpha
            cardArray2[i].cardtext.setPosition(cardArray2[i].x, cardArray2[i].y)
            cardArray2[i].cardtext.scale = cardArray2[i].scale / cardArray2[i].orig_scale
        }
        for (var i = 0; i < cardArray1.length; i++) {
            cardArray1[i].cardtext.setPosition(cardArray1[i].x, cardArray1[i].y)
            cardArray1[i].cardtext.depth = cardArray1[i].depth + 1
        }
    }
}

function play_card_selection(array_of_choices_as_csv) {
    armsopen()
    if (!Array.isArray(array_of_choices_as_csv)) {
        Talk("That was not a valid array of string choices!")
        return
    }
    var isstringarr = array_of_choices_as_csv => array_of_choices_as_csv.every(i => typeof i === "string")
    if (!isstringarr) {
        Talk("That was not a valid array of string choices!")
        return
    }
    var rid = getIdFromUrlOrDefault()
    $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        async: true,
        url: `action?id=${rid}`,
        data: JSON.stringify({ 'play': stringify([array_of_choices_as_csv, array_of_choices_as_csv]).split('\n')[0] }),
        /*success: function(data) {
            console.log("1");
            console.log(data);
        },
        error: function(data) {
            console.log("2");
            console.log(data);
        },*/
        complete: function (data) {
            var response = JSON5.parse(data.responseText)
            console.log(response)
            if (response.request == true) {
                if (response.data.conduit) {
                    __POST_RESULTS__(response.data.conduit)
                }
                ShiftyElfScoreToast.setText("Shifty's Score: " + response.data.shifty_score)
                PlayerScoreToast.setText("Player's Score: " + response.data.player_score)
                win_lose_score_message(response.data.score_message, response.data.win_lose_tie_na, response.data)
            } else if (response.data) {
                Talk(response.data)
            }
        }
    });
}

function win_lose_score_message(score_message, win_lose_tie_na, data = false) {
    if (data !== false) {
        for (var i = 0; i < cardArray1.length; i++) {
            cardArray1[i].show_tween.play()
            cardArray2[i].show_tween.play()
            //cardArray2[i].setInteractive(false)
        }
        setTimeout(function () {
            for (var i = 0; i < cardArray1.length; i++) {
                cardArray1[i].cardtext.setVisible(true)
                cardArray1[i].cardtext.setText(data.shiftys_cards[i].num)
            }
            if (data.maxItem && typeof data.maxItem.num == 'number') {
                let m = (data.maxItem.num + '').toLowerCase().charAt(0)
                for (var i = 0; i < cardArray1.length; i++) {
                    if (cardArray1[i].cardtext.text.trim().charAt(0).toLowerCase() === m) {
                        max_circle.setPosition(cardArray1[i].cardtext.x, cardArray1[i].cardtext.y)
                        break
                    } else if (cardArray2[i].cardtext.text.trim().charAt(0).toLowerCase() === m) {
                        max_circle.setPosition(cardArray2[i].cardtext.x, cardArray2[i].cardtext.y)
                        break
                    }
                }
                max_circle.setVisible(true)
            }
            if (data.minItem && typeof data.minItem.num == 'number') {
                let m = (data.minItem.num + '').toLowerCase().charAt(0)
                for (var i = 0; i < cardArray1.length; i++) {
                    if (cardArray1[i].cardtext.text.trim().charAt(0).toLowerCase() === m) {
                        min_circle.setPosition(cardArray1[i].cardtext.x, cardArray1[i].cardtext.y)
                        break
                    } else if (cardArray2[i].cardtext.text.trim().charAt(0).toLowerCase() === m) {
                        min_circle.setPosition(cardArray2[i].cardtext.x, cardArray2[i].cardtext.y)
                        break
                    }
                }
                min_circle.setVisible(true)
            }
            hand_played = true
        }, 600)
    }
    if (['w', 'l', 't'].includes(win_lose_tie_na)) {
        Talk(score_message)
        setTimeout(function () {
            ShiftyElfScoreToast.setText("Shifty's Score: 0")
            PlayerScoreToast.setText("Player's Score: 0")
        }, 3000)
    } else if (data !== false && data.play_message) {
        Talk(data.play_message)
    }
}

function Talk(msg) {
    if (!ShiftyElfIsTalking) {
        ShiftyElfIsTalking = true
        ToastMessage.showMessage(msg)
        ShiftyElfJaw.talkTween.play()
    } else {
        ToastMessage.setText(msg)
    }
    //NotAnOrcElfTalking.setVisible(true)
    //NotAnOrcElfArms.setVisible(false)
}

function IsValid(text) {
    return Boolean(text.match(/^[n0-9][na]{0,2}$/ig))
}

/*
function talk() {
    NotAnOrcElfTalking.setVisible(true)
    NotAnOrcElfArms.setVisible(false)
    NotAnOrcElfTalking.anims.play('talking');
}
*/

function reset_cards() {
    let half = cardArray1.length / 2;
    max_circle.setVisible(false)
    min_circle.setVisible(false)
    for (var i = 0; i < cardArray1.length; i++) {
        var n = i + (half - cardArray2.length)
        cardArray1[i].setPosition(cardArray1[i].orig_xy.x, cardArray1[i].orig_xy.y)
        cardArray1[i].scale = 0.04;
        cardArray1[i].alpha = 0
        cardArray1[i].cardtext.setVisible(false)
        cardArray1[i].cardtext.setText('-')
        cardArray1[i].rotation = 0
        /*cardArray1[i].cardtext.setVisible(false)
        cardArray2[i].card_tweenphasein.play()*/
        cardArray2[i].scale = cardArray2[i].orig_scale;
        cardArray2[i].setPosition(cardArray2[i].orig_xy.x, cardArray2[i].orig_xy.y)
        cardArray2[i].rotation = (0.2 * n);
        cardArray2[i].cardtext.setText('-')
        //cardArray2[i].inputEnabled = true;
        cardArray2[i].isopen = false
        cardArray2[i].depth = cardArray2[i].num
        cardArray2[i].cardtext.depth = cardArray2[i].depth
        cardArray2[i].card_tweenphasein.play()
    }
    armsclose()
    currently_playing = false
    setTimeout(function () {
        resetting = false
        buttons.getElement('buttons').forEach(function (button) {
            button.setText('Play')
        })
    }, 2000)
}

function armsclose() {
    //NotAnOrcElfTalking.setVisible(false)
    //NotAnOrcElfArms.setVisible(true)
    //NotAnOrcElfArms.anims.play('arms_close');
    ShiftyElfLeft.armTweenClose.play()
    ShiftyElfRight.armTweenClose.play()
}
function armsopen() {
    //NotAnOrcElfTalking.setVisible(false)
    //NotAnOrcElfArms.setVisible(true)
    //NotAnOrcElfArms.anims.play('arms_open');
    //NotAnOrcElfArms.anims.playReverse('arms');
    ShiftyElfLeft.armTweenOpen.play()
    ShiftyElfRight.armTweenOpen.play()
}

/*function TalkAnimation(alien_obj, time=5000) {
    alien_obj.anims.play(alien_obj.aname+'_talk');
    setTimeout(()=>{
        alien_obj.anims.stop();
        alien_obj.anims.play(alien_obj.aname+'_idle');
    }, time)
}*/

/*
var check_state = function() {
    $.post("action", {"check_state": "check_state"}, function(response){
        if (response.smithereens !== undefined && response.smithereens === true) {
            EndGame()
        } else if (response.cyberdroids !== undefined && response.cyberdroids === true) {
            alien_death(dvoraks)
            setTimeout(()=>{
                alien_death(cyberdroids)
            }, 2000)
        } else if (response.dvoraks !== undefined && response.dvoraks === true) {
            alien_death(dvoraks)
        }
    }).fail(function(response) {
        console.error(response.status+': '+ response.responseJSON.data)
    });    
}
var submit_answer = function(value) {
    $.post("action", {"answer": value}, function(response){
        if (response.data !== undefined) {
            console.log( response.data )
            DialogueResponse(response)
        }
    }).fail(function(response) {
        console.error(response.status+': '+ response.responseJSON.data)
    });
}
*/

var createButton = function (scene, text) {
    let b = scene.rexUI.add.label({
        width: 80,
        height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x0066cc),
        text: scene.add.text(0, 0, text, {
            fontSize: 28,
            color: '#fff',
            fontFamily: 'monospace'
        }),
        align: 'center',
        space: {
            left: 4,
            right: 4,
        }
    });
    b.setDepth(99)
    b.alpha = 0.5
    return b
}

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT),
        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),
        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),
        space: {
            left: 8,
            right: 8,
            top: 8,
            bottom: 8,
            icon: 4,
            text: 4,
        }
    })
        .setOrigin(0.5, 0.5)
        .layout();
    textBox
        .setInteractive()
        .on('pointerup', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }
            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})
    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: wrapWidth
        },
        maxLines: 3
    })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}

$(document).ready(function () {
    config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: 900,
        height: 650,
        //pixelArt: true,
        transparent: false,
        backgroundColor: '#e6f3ff',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0, x: 0 },
                debug: false
            }
        },
        dom: {
            createContainer: true
        },
        scene: Demo
    };
    game = new Phaser.Game(config);
});

function getIdFromUrlOrDefault() {
    // Create a URLSearchParams object from the current URL
    const urlParams = new URLSearchParams(window.location.search);

    // Get the 'id' parameter
    const id = urlParams.get('id');

    // Check if the 'id' parameter exists and has the proper length
    const defaultId = "00000000-0000-0000-0000-000000000000";
    if (id && id.length === defaultId.length) {
        return id;
    }

    // If 'id' is not set or does not have the proper length, return the default ID
    return defaultId;
}

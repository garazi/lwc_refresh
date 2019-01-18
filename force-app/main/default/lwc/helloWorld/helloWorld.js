import { LightningElement, api, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class helloWorld extends LightningElement {

    @wire(CurrentPageReference) pageRef;
    initialized = false;
    @track cssClasses = "container hideIt";

    start() {
        if (!this.initialized) {
            this.circles = this.template.querySelectorAll(".circle");
            this.initialized = true;
            this.counter = 0;
            this.windowHeight = window.innerHeight;
            requestAnimationFrame(this.animate.bind(this));

            for (var i = 0; i < this.circles.length; i++) {
                var circle = this.circles[i];
                circle.count = 0;
                circle.increment = this.getRandomNumber(1, 10) / 10;
                circle.xpos = this.getRandomNumber(0, window.innerWidth);

                circle.sign = Math.random() < 0.5 ? 1 : -1;

                var size = Math.round(this.getRandomNumber(10, 100));
                circle.style.width = size + "px";
                circle.style.height = size + "px";
                circle.ypos = -1 * size + 20;

                this.setTranslate(circle.xpos, circle.ypos, circle);
            }
        }
    }

    animate() {
        this.counter += .01;

        for (var i = 0; i < this.circles.length; i++) {
            var circle = this.circles[i];
            var newX = circle.xpos + circle.sign * 2 * Math.cos(this.counter + circle.increment);
            circle.xpos = newX;

            var newY = 3 + circle.ypos + 4 * circle.increment;
            circle.ypos = newY;

            this.setTranslate(newX, newY, circle);
        }

        var foo = requestAnimationFrame(() => {
            this.animate();
        });

        console.log("running");

        if (this.counter > 4) {
            cancelAnimationFrame(foo);
            this.cssClasses = "container";
            this.initialized = false;
            console.log("stopped");
        }
    }

    setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    getRandomNumber(low, high) {
        var r = Math.floor(Math.random() * (high - low + 1)) + low;
        return r;
    }

    connectedCallback() {
        registerListener('startAnimation', this.handleAnimation, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleAnimation(e) {
        if (e == "Sold") {
            this.cssClasses = "container";
            this.start();
        }
    }
}

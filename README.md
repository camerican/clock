# JavaScript Clock

This sample code implements both a digital and analog clock in JavaScript utilizing the native **setInterval** and **Date** functions. jQuery is utilized for easy DOM selection and css transforms allow for the rotating clock hands.

This implementation only looks up the date once and then increments it every second, which means it is vulnerable to falling out of sync over time.

To setup an analog clock, simply declare the DOM container with the clock and analog classes:

```html
<div id="analog_clock" class="clock analog"></div>
```

and then run the initializeHands function on that element:

```JavaScript
initializeHands($("#analog_clock"),"data-value");
```
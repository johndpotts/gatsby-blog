---
title: "Subjects vs Observables - Multicasting"
date: "2018-09-10"
path: "/2018-09-10-subjects-vs-observables-multicasting/"
featuredImage: "./broadcast.jpg"
---
![Broadcasting](./broadcast.jpg)

One of the topics I struggled with initially when using RxJS observables and subjects in Angular was the difference between observables and subjects. 
The most obvious difference between the two is that subjects enable the user to trigger new events with the `next()` method; they are, in effect, an observable channel
that can broadcast new data and events. Compare this with observables, which are passive subscriptions to events that are generated elsewhere.

That difference was easy enough to understand (subjects are observables that can also broadcast events) - but are there any other differences?

As it would turn out, there is another very significant difference between the way that subjects and observables transmit events. This might make no difference in some situations,
but in other applications it might lead to nagging bugs that are difficult to pinpoint and solve for. This difference is in **multicast events vs unicast events**.

When there are multiple subscribers on a single channel or observable, events can be handled in two ways. Either all observers can receive the exact same
event (unicast) or each observer can receive a separate instance or firing of the event (multicast). 

The difference between how subjects and observables handle event firing is this: events emitted by subjects are unicast, while events emitted by 
observables are multicast. This means if you have a number of observers listening to a subject, they will all receive the same event when it is fired.
Multiple observers of an observable, on the other hand, will receive separate occurrences of the observable's event.

Consider the following example: 

```js
// our observable, built to fire initially
const observable = rxjs.Observable.create((observer) => {
    observer.next(Math.random());
});

//our subject
const subject = new rxjs.Subject();

//first subscriber to subject
subject.subscribe((data) => {
console.log(`Subject subscriber 1 recieves ${data}`)
})

//second subscriber to subject
subject.subscribe((data) => {
console.log(`Subject subscriber 2 recieves ${data}`)
})

//firing the subject
subject.next(Math.random());

//first subscriber to observable
observable.subscribe((data) => {
  console.log(`Observable subscriber 1 recieves ${data}`);
});

//second subscriber to observable
observable.subscribe((data) => {
     console.log(`Observable subscriber 2 recieves ${data}`); 
});


// result:
// Subject subscriber 1 recieves 0.057620368220371754 (random num)
// Subject subscriber 2 recieves 0.057620368220371754 (same random num as sub 1)
// Observable subscriber 1 recieves 0.4309043174218721 (random num)
// Observable subscriber 2 recieves 0.3891633752329249 (new random num)


```
(to try this for yourself, copy the code into a jsFiddle with the rxjs library imported)

As you can see, the subscribers to the subject received the same event firing (unicast), while the subscribers to the observable received separate firings of the event (multicast).

This is an important distinction to make when you want to make sure that different parts of your application are receiving the exact same data. 
In those cases, you should use a subject instead of an observable to ensure your events are multicast.

I hope this helps you understand one of the key differences between observables and subjects. Happy coding!
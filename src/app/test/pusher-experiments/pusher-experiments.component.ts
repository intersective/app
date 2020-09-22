import { Component, OnInit } from '@angular/core';
import * as Pusher from 'pusher-js';

const TEST_CHANNELS = 100;
const TEST_EVENTS = 5;

@Component({
  templateUrl: './pusher-experiments.component.html',
})
export class PusherExperimentsComponent implements OnInit {
pusher: any;
  channelsEvents: any;
  results: any;
  totalChannels: number = 0;

  constructor() {
    this.channelsEvents = this.generateChannels();
  }

  protected generateChannels() {
    let channels = {};
    let events = {};

    for (var i = 0; i < TEST_CHANNELS; ++i) {
      let events = {};
      for (var j = 0; j < TEST_EVENTS; ++j) {
        events[`my-event-${j}`] = {};
      }
      channels[`my-channel-${i}`] = events;
    }
    return channels;
  }

  ngOnInit() {
    this.pusher = new Pusher('bb4968be24f5bc816119', {
      cluster: 'ap1'
    });

    // console.log('channelsEvents::', this.channelsEvents);
    this.results = this.channelsEvents;
    this.totalChannels = Object.keys(this.results).length;
    Object.keys(this.channelsEvents).forEach(channelName => {
      const events = this.channelsEvents[channelName];
      // console.log('events', events);
      Object.keys(events).forEach(eventName => {
        var channel = this.pusher.subscribe(channelName);
        // console.log('eventsName', eventName);
        channel.bind(eventName, (data) => {
          // console.log('An event was triggered with message: ' + data.message);
          // console.log(this.results);
          // console.log(this.results[channelName]);
          this.results[channelName][eventName] = data;
        });
      });
    });
  }
}

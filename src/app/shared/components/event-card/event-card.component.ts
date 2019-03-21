import { Component, Input, OnInit } from '@angular/core';
import { Event, EventsService } from '@app/events/events.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;
  @Input() time: string;
  // if it is for todo item
  @Input() layout: string;
  constructor(
    private eventsService: EventsService,
    private utils: UtilsService
  ) {}

  showEventDetail() {
    this.eventsService.eventDetailPopUp(this.event);
  }

  ngOnInit() {
    // get submission status if start time passed and booked and it has assessment
    if (this.utils.has(this.event, 'assessment.id') &&
      this.event.isPast &&
      this.event.isBooked) {
      this.eventsService.getSubmission(this.event.assessment.id, this.event.assessment.contextId).subscribe(isDone => {
        this.event.assessment.isDone = isDone;
      });
    }
  }

  isPast() {
    if (!this.event.isPast) {
      return false;
    }
    if (!this.utils.has(this.event, 'assessment.id')) {
      return true;
    }
    if (this.event.assessment.isDone) {
      return true;
    }
    return false;
  }

}

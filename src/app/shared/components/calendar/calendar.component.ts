import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],

  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  events!: any[];
  headerConfig: any;
  calendarEvents = [
    { title: 'Concurso de acuarela', date: '2025-04-28' },
    { title: 'Exposición arte digital', date: '2025-05-02' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [
      { title: 'Concurso de acuarela', date: '2025-04-28' },
      { title: 'Exposición arte digital', date: '2025-05-02' }
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    }
  };
}

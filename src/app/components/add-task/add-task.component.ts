import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  text: string = "";
  day: string = "";
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(!this.text) {
      alert('Please add a task');
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }

    this.onAddTask.emit(newTask);

    // reset form
    this.text = "";
    this.day = "";
    this.reminder = false;
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debounser: Subject<string> = new Subject<string>(); 

 
  @Input()
  public placeholder: string = '';

  @Output() 
  public onValue = new EventEmitter();

  @Input()
  public initialValue: string ='';

  @Output()
  public ondebouncer = new EventEmitter<string>();
  private debouncerSuscription?: Subscription;

  ngOnInit(): void {
    this.debouncerSuscription = this.debounser
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>{
      this.ondebouncer.emit(value);
    })
  }

  ngOnDestroy(): void {
   this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string):void{
  this.onValue.emit(value);
  }

  onKeyPress(seaarchTerm: string)
  {
  this.debounser.next(seaarchTerm);
  }

}

import { first } from 'rxjs'
import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: 'felipe@gmail.com',
    first_name: 'felipe',
    last_name: 'henriquez',
    avatar: 'imgurl.com/12345',
  });

  public fullName = computed(() => `${this.user().first_name} - ${this.user().last_name}`)

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current +1);
    }, 1000)
  }

  ngOnDestroy(): void {
    this.userChangedEffect.destroy();
  }



  increaseBy(value: number) {
    this.counter.update(current => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {

    // una forma de hacerlo:
    /*    this.user.set({
    ...this.user(),
    [field]:value,
  }) */

    // Otra forma de hacerlo (mutacion)
    /*  this.user.mutate(current => {
       switch (field) {
         case 'id':
           current.id = Number(value);
           break;
         case 'email':
           current.email = value;
           break;
         case 'first_name':
           current.first_name = value;
           break;
         case 'last_name':
           current.last_name = value;
           break;
       }
     }) */

    this.user.update(current => {
      return {
        ...current,
        [field]: value
      }
    })

  }




}

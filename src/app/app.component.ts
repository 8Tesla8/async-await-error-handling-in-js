import { Component, OnInit } from '@angular/core';
import { SomeService } from './some-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: SomeService) {}

  async ngOnInit(): Promise<any> {
    // observable
    // 1
    this.service.getTestRequestObservable().subscribe(
      (data) => {},
      (error) => {}
    );

    // 2 erro handler is inside of the method
    let res1 = this.service.getCatchError1();
    let res2 = this.service.getCatchError2();


    // 3
    try {
      let result = await this.service.errorInPromise();
    } catch (error) {
      console.log(error);
    }


    // 4
    this.service
      .getTestRequestPromise()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

      
    // 5
    let resProm = await this.service.getCatchPromise();
    if (resProm.ok) {
      console.log(resProm.response);
    } else {
      console.log(resProm.error);
    }
  }
}

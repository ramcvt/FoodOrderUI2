import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { RestaurantMenu } from 'src/app/models/restaurant-menu';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  private id:string;
  public resdetails:RestaurantMenu;
  public mainMenu:string[];
  public fullMenu:Menu[];
  public selectedItem:string;
   
  constructor(private route:ActivatedRoute,private resSVC:RestaurantService) {
    this.id = this.route.snapshot.params["id"];
   }

  ngOnInit() {
   
    this.resSVC.getRestaurant(this.id).subscribe(
      (x)=> {
        this.resdetails = x;

        this.mainMenu = [...new Set(this.resdetails.food.map(x=>x.type))];
        this.fullMenu = this.resdetails.food.filter(x=>x.type==this.mainMenu[0]);
        this.selectedItem = this.mainMenu[0];
      }
    );
  }

  menuitemclick(m){
    this.selectedItem =m;
    this.fullMenu = this.resdetails.food.filter(x=>x.type==m);
     
  }
}

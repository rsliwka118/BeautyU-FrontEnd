import { Component, OnInit } from "@angular/core";
import { RouterExtensions} from "@nativescript/angular";
import { ToastsService } from "../../../shared/toasts.service";
import { LocationService } from "../../../shared/location/location.service"
import { UserService } from "../../../shared/user/user.service";
import { EventData, Image, Label, Page, StackLayout, Switch, TouchGestureEventData } from "@nativescript/core";
import { HomeViewModel } from "../../../shared/home-view-model"
import { typeSourceSpan } from "@angular/compiler";
import { AuthService } from "../../../shared/auth/auth.service";
import { getString, setString } from "@nativescript/core/application-settings";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { Config } from "../../../shared/config";
import { SalonService } from "../../../shared/salon/salon.service";
import { Location } from '@angular/common';
import { Service } from "src/shared/salon/salon.model";

@Component({
    selector: 'ns-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
    
    public showSelectService: boolean
    public showSelectDay: boolean
    public showSelectTime: boolean
    public showSummary: boolean

    public selectedService: Service
    public selelectedDay = ""
    public selectedHour = "" 

    private actualPage = 0
    private _date: Date

    constructor(
        private toast: ToastsService,
        private post: HttpPostService,
        private routeLocation: Location, 
        public userService: UserService,
        public location: LocationService,
        public salonService: SalonService
        ) {
    }

    ngOnInit() {
        this.showSelectService = true
        this.showSelectDay = false
        this.showSelectTime = false
        this.showSummary = false

        this._date = new Date()
    }
    
    public next(screen: number){
        switch (screen) {
            case 0:
                this.showSelectService = true
                this.showSelectDay = false
                this.showSummary = false
                break
            case 1:
                this.showSelectService = false
                this.showSelectDay = true
                this.showSummary = false
                break
            case 2:
                this.showSelectService = false
                this.showSelectDay = false
                this.showSummary = true
                break
            default:
                console.log('incorrect page number')
                break    
        }
    }

    get date(){
        return this._date
    }
    
    public cancel(){
        this.routeLocation.back()
    }

    public undo(){
        this.next( this.actualPage -= 1 )
    }

    public setService(service: Service){
        this.selectedService = service
        this.actualPage += 1
        this.next(1)
    }

    public sendSettings(city: string){

        this.post.postData(Config.apiAuthURL + "/update-settings/"+getString("userID"), {city: city}, true)
            .subscribe( (res: any) => {
                this.location.currentCity = city
                this.toast.showToast(res.message)
            })
    }
}
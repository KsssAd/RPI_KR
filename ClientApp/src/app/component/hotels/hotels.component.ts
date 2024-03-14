import { Component, OnInit } from "@angular/core";
import { FoodPlan, Hotels } from "../../data/hotels";
import { Hotel } from "../../models/tour.model";

export interface GroupHotels {
  country: string,
  hotels: Hotel[],
}

@Component({
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})

export class HotelsComponent implements OnInit {
  public hotels: Hotel[] = Hotels;
  public foodPlan = FoodPlan;
  public hotelsByCountry: GroupHotels[] = [];

  ngOnInit() {
    this.hotelsByCountry = this.groupByCountry(this.hotels);
  }

  groupByCountry(hotels: Hotel[]): GroupHotels[] {
    let grouped: GroupHotels[] = [];

    hotels.forEach(hotel => {
      let country = hotel.country;
      if (grouped.map(p => p.country).includes(country))
        grouped.find(p => p.country == country)?.hotels.push(hotel);
      else
        grouped.push({ country: country, hotels: [hotel] });
    });

    return grouped;
  }

  getRange(value: number): any[] {
    return Array.from({ length: value }, (_, index) => index);
  }

  showDiscription(id: any) {
    let discr = document.getElementById(id);
    discr?.classList.contains("hotel-description-open")
      ? discr?.classList.remove("hotel-description-open")
      : discr?.classList.add("hotel-description-open");
  }

  scroll(id: string) {
    let el = document.getElementById(id);
    if (el)
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }
}

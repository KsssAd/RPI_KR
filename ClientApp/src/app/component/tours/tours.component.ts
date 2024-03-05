import { Component } from '@angular/core';
import { Tours } from '../../data/tours';
import { Types } from '../../data/tours-type';
import { Tour, TourType } from '../../models/tour.model';

@Component({
  selector: 'tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})

export class ToursComponent {
  public allTour: Tour[] = Tours;
  public allTourTypeName: TourType[] = Types;
  public allCountries: string[] = Array.from(new Set(Tours.map(t => t.country)));
  public allDuration: string[] = Array.from(new Set(Tours.map(t => t.duration)));

  public isOpenDropDownCountries: boolean = false;
  public isOpenDropDownDuration: boolean = false;
  public isOpenDropDownTypeTour: boolean = false;

  public selectedCountry: string;
  public selectedDateFrom: Date | null;
  public selectedDateTo: Date | null;
  public selectedPriceFrom: number | null;
  public selectedPriceTo: number | null;
  public selectedTypeTour: TourType = new TourType();
  public selectedIsPopular: boolean;
  public selectedDuration: string;

  public isFiltered: boolean = false;

  findTour() {
    this.isFiltered = true;


  }

  reset() {
    this.allTour = Tours;
    this.isFiltered = false;
    this.selectedCountry = "";
    this.selectedDateFrom = null;
    this.selectedDateTo = null;
    this.selectedPriceFrom = null;
    this.selectedPriceTo = null;
    this.selectedTypeTour = new TourType();
    this.selectedIsPopular = false;
    this.selectedDuration = "";
  }
}

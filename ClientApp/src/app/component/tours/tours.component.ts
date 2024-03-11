import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tours } from '../../data/tours';
import { Types } from '../../data/tours-type';
import { Tour, TourType } from '../../models/tour.model';

export class SelectionForFilter {
  country: string;
  dateFrom: Date;
  dateTo: Date;
  priceFrom: number;
  priceTo: number;
  typeTour: TourType = new TourType();
  isPopular: boolean;
  duration: string;
}

@Component({
  selector: 'tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})

export class ToursComponent implements AfterViewInit {
  public allTour: Tour[] = Tours;
  public allTourType: TourType[] = Types;
  public allCountries: string[] = Array.from(new Set(Tours.map(t => t.country)));
  public allDuration: string[] = Array.from(new Set(Tours.map(t => t.duration)));

  public isOpenDropDownCountries: boolean = false;
  public isOpenDropDownDuration: boolean = false;
  public isOpenDropDownTypeTour: boolean = false;
  public isOpenFilterPanel: boolean = false;

  public filter: SelectionForFilter = new SelectionForFilter();
  public isFiltered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.scrollToFragment();
  }

  scrollToFragment() {
    const tourId = this.route.snapshot.fragment;
    if (tourId) {
      setTimeout(() => {
        const element = this.elementRef.nativeElement.querySelector('#' + CSS.escape(tourId));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 100);
    }
  }

  findTour() {
    this.isFiltered = true;

    if (this.filter.country)
      this.allTour = this.allTour.filter(p => p.country === this.filter.country);

    if (this.filter.duration)
      this.allTour = this.allTour.filter(p => p.duration === this.filter.duration);

    if (this.filter.priceFrom && this.filter.priceTo)
      this.allTour = this.allTour.filter(p => p.price >= this.filter.priceFrom && p.price <= this.filter.priceTo);
    else if (this.filter.priceFrom)
      this.allTour = this.allTour.filter(p => p.price >= this.filter.priceFrom);
    else if (this.filter.priceTo)
      this.allTour = this.allTour.filter(p => p.price <= this.filter.priceTo);

    if (this.filter.typeTour.id)
      this.allTour = this.allTour.filter(p => p.typeTour === this.filter.typeTour.id);

    if (this.filter.isPopular)
      this.allTour = this.allTour.filter(p => p.isPopular === this.filter.isPopular);

    if (this.filter.dateFrom && this.filter.dateTo)
      this.allTour = this.allTour.filter(p => p.dateStart >= this.filter.dateFrom && p.dateStart <= this.filter.dateTo);
    else if (this.filter.dateFrom)
      this.allTour = this.allTour.filter(p => p.dateStart >= this.filter.dateFrom);
    else if (this.filter.dateTo)
      this.allTour = this.allTour.filter(p => p.dateStart <= this.filter.dateTo);

    this.isOpenFilterPanel = false;
  }

  reset() {
    this.allTour = Tours;
    this.isFiltered = false;
    this.filter = new SelectionForFilter();
  }

  showDiscription(id: any) {
    let discr = document.getElementById(id);
    discr?.classList.contains("tour-description-open")
      ? discr?.classList.remove("tour-description-open")
      : discr?.classList.add("tour-description-open");
  }

  showMore(id: number) {
    let item = document.getElementById(id + 'div');
    let btn = document.getElementById(id + 'btn');
    if (item)
      item.hidden = false;
    if (btn)
      btn.hidden = true;
  }

  hideMore(id: number) {
    let item = document.getElementById(id + 'div');
    let btn = document.getElementById(id + 'btn');
    if (item)
      item.hidden = true;
    if (btn)
      btn.hidden = false;
  }

  getTourType(id: number): TourType {
    return this.allTourType.find(p => p.id === id) || new TourType;
  }
}

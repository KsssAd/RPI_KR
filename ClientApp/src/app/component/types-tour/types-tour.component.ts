import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Tours } from "../../data/tours";
import { Types } from "../../data/tours-type";
import { Tour, TourType } from "../../models/tour.model";

export interface CarouselModel {
  slideIndex: number;
  type: TourType;
  list: Tour[];
}

@Component({
  selector: 'types-tour',
  templateUrl: './types-tour.component.html',
  styleUrls: ['./types-tour.component.css']
})

export class TypesTourComponent implements OnInit, AfterViewInit {
  public typesTour = Types;
  public tours = Tours;
  public list: CarouselModel[] = [];

  ngOnInit() {
    this.typesTour.forEach(type => 
      this.list.push({
        slideIndex: 0,
        type: type,
        list: this.tours.filter(p => p.typeTour == type.id)
      })
    );
  }

  ngAfterViewInit() {
    this.list.forEach(item => {
      this.showSlide(item);
    });
  }

  showTypeDiscription(id: any) {
    let discr = document.getElementById(id);
    discr?.classList.contains("type-description-open")
      ? discr?.classList.remove("type-description-open")
      : discr?.classList.add("type-description-open");
  }

  next(item: CarouselModel) {
    ++item.slideIndex;
    this.showSlide(item)
  }

  prev(item: CarouselModel) {
    --item.slideIndex;
    this.showSlide(item)
  }

  showSlide(item: CarouselModel) {
    let slides = document.getElementsByClassName(item.type.id.toString());
    if (item.slideIndex >= slides.length) {
      item.slideIndex = 0;
    } else if (item.slideIndex < 0) {
      item.slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }
    slides[item.slideIndex].classList.add("active");
  }
}

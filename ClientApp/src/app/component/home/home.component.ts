import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Info } from '../../data/info';
import { Reviews } from '../../data/reviews';
import { Tours } from '../../data/tours';
import { Review, Tour } from '../../models/tour.model';

export interface CarouselModel {
  slideIndex: number,
  reviewGroup: any[],
}

export interface CountryModel {
  id: number,
  name: string,
  img: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../types-tour/types-tour.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public reviews: Review[] = Reviews;
  public tours: Tour[] = Tours;
  public info = Info;
  public countries: CountryModel[] = [];

  public reviewsCarousel: CarouselModel;

  ngOnInit() {
    let mass = this.getGroupReviews(this.reviews);

    this.reviewsCarousel = {
      slideIndex: 0,
      reviewGroup: [],
    };

    mass.forEach(item => this.reviewsCarousel.reviewGroup.push(item));

    this.getCountries();
  }

  ngAfterViewInit() {
    this.showSlide(this.reviewsCarousel);
  }

  getCountries() {
    this.tours.forEach(tour => {
      if (!this.countries.map(p => p.name).includes(tour.country))
        this.countries.push(
          {
            id: tour.id,
            name: tour.country,
            img: tour.image
          }
        )
    });
  }

  getGroupReviews(reviews: Review[])  {
    let mass = [];
    for (let i = 0; i < reviews.length; i += 3) {
      mass.push(reviews.slice(i, i + 3));
    }

    return mass;
  }

  next(item: CarouselModel) {
    if (item.slideIndex !== item.reviewGroup.length - 1) {
      ++item.slideIndex;
      this.showSlide(item);
    }
  }

  prev(item: CarouselModel) {
    if (item.slideIndex !== 0) {
      --item.slideIndex;
      this.showSlide(item);
    }
  }

  showSlide(item: CarouselModel) {
    let slides = document.getElementsByClassName("review");
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

  getTourName(id: number) {
    return this.tours.find(p => p.id == id)?.name;
  }

  showReview(id: any) {
    let rev = document.getElementById(id);
    rev?.classList.contains("review-text-div-open")
      ? rev?.classList.remove("review-text-div-open")
      : rev?.classList.add("review-text-div-open");
  }
}

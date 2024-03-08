export class Tour {
  id: number;
  image: string = "";
  name: string = "";
  description: string = "";
  dateStart: Date;
  duration: string = "";
  price: number;
  typeTour: number;
  country: string = "";
  placesOfVisit: string[] = [];
  includedServices: string[] = [];
  notIncludedServices: string[] = [];
  isPopular: boolean = false;
}

export class TourType {
  id: number;
  icon: string;
  name: string = "";
  description: string = "";
}

export class Tour {
  id: number;
  image: string = "";
  name: string = "";
  description: string = "";
  dateStart: Date;
  duration: string = "";
  price: string = "";
  typeTour: string = "";
  placesOfVisit: string[] = [];
  includedServices: string[] = [];
  notIncludedServices: string[] = [];
  isPopular: boolean = false;
}

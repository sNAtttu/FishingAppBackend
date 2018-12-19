export interface IPopup {
  availableFishes: string[];
  spotGrade: number;
}

export interface IMarker {
  markerId: string;
  lat: number;
  lng: number;
  popupData: IPopup;
}

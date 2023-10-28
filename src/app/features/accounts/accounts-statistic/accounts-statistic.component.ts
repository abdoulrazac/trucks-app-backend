import { Component, OnInit } from "@angular/core";
import { IMenuItem } from "../../../models/interfaces";

@Component({
  selector: "app-accounts-statistic",
  templateUrl: "./accounts-statistic.component.html",
  styleUrls: ["./accounts-statistic.component.scss"],
})
export class AccountsStatisticComponent implements OnInit {
  statistics: IMenuItem[] = [];
  ngOnInit(): void {
    this.statistics = [
      {
        label: "Total voyages",
        icon: "assets/images/illustrations/travels.svg",
        value: "35",
      },
      {
        label: "Voyages du mois",
        icon: "assets/images/illustrations/calendar.svg",
        value: "35",
      },
      {
        label: "Total pannes",
        icon: "assets/images/illustrations/pannes.svg",
        value: "35",
      },
      {
        label: "Prime",
        icon: "assets/images/illustrations/prime.svg",
        value: "35",
      },
      {
        label: "Documents",
        icon: "assets/images/illustrations/docs.svg",
        value: "35",
      },
    ];
  }
}

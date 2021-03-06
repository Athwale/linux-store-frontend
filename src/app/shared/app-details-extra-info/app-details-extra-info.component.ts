import { Component, OnInit, Input } from '@angular/core';

import { App } from '../../shared/app.model';
import { Category } from '../category.model';
import { LinuxStoreApiService } from '../../linux-store-api.service';

@Component({
  selector: 'store-app-details-extra-info',
  templateUrl: './app-details-extra-info.component.html',
  styleUrls: ['./app-details-extra-info.component.scss']
})
export class AppDetailsExtraInfoComponent implements OnInit {

  @Input() app: App;

  flathubGithubUrl: string = "https://github.com/flathub";
  buildRepoUrl: string;
  buildRepoContributorsUrl: string;
  categoriesList: string;
  license: string;
  mainCategory: Category;

  constructor(
    private linuxStoreApiService: LinuxStoreApiService) {
  }

  ngOnInit() {
    this.buildRepoUrl = this.flathubGithubUrl + "/" + this.app.flatpakAppId;
    this.buildRepoContributorsUrl = this.buildRepoUrl + "/graphs/contributors/";

    if (this.app){

      if(this.app.projectLicense){

        if(this.app.projectLicense.indexOf('LicenseRef-proprietary') !== -1) {
         this.license = "Propietary";
        }
        else {
          this.license = "Free";
        }
      }

      if (this.app.categories){
        for (let category of this.app.categories) {
          this.setMainCategory(category.name);
        }
      }

    }

  }


  setMainCategory(categoryId: string): void {

    var tempCategory: Category;

    this.linuxStoreApiService.getCategory(categoryId)
      .subscribe(category => { tempCategory = category; });

      if(tempCategory){
        this.mainCategory = tempCategory;
      }
  }

}

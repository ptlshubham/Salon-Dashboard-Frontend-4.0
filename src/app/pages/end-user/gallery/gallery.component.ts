import { Component } from '@angular/core';
import ls from 'localstorage-slim';
import { Lightbox } from 'ngx-lightbox';
import { BannersService } from 'src/app/core/services/banners.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  gallery: { src: string; thumb: string; caption: string }[] = [];
  imagesData: any = [];
  categoryData: any = [];
  selectedCategory: any;

  collectionSize = 0;
  page = 1;
  pageSize = 8;
  paginateData: any = [];
  activeTab: number = 1; // Set the default active tab ID
  tabIds: number[] = [];

  constructor(
    private _lightbox: Lightbox,
    private bannersService: BannersService
  ) {
    this.getBannersCategory();
    this.getBanners();

  }

  getBanners() {
    this.gallery = [];
    this.bannersService.getWebBanners(ls.get('salonid', { decrypt: true })).subscribe((res: any) => {
      this.imagesData = res;
      res.forEach((element: any) => {
        if (element.name == 'Image For Gallery') {
          const src = 'http://localhost:8100' + element.bannersimage;
          const caption = element.category;
          const thumb = 'http://localhost:8100' + element.bannersimage;
          const album = {
            src,
            caption,
            thumb
          };
          this.gallery.push(album);
        }
      });
      this.collectionSize = this.gallery.length;
      this.getPagintaion();
    })
  }
  openZoomGallery(index: number): void {
    this._lightbox.open(this.gallery, index, {
      wrapAround: true, showImageNumberLabel: true, showZoom: true
    });
  }
  getPagintaion() {
    this.paginateData = this.gallery.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  getBannersCategory() {
    this.tabIds = []; // Clear existing IDs
    this.tabIds.push(1); // ID for the first static tab
    this.bannersService.getImageCategory().subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.category != null && element.category != 'null') {
          this.categoryData.push(element);
        }
      });
      for (let i = 0; i < this.categoryData.length; i++) {
        this.tabIds.push(i + 2);
      }
    })
  }

  onCategoryChange(event: any, tabId: any) {
    this.activeTab = tabId;
    this.selectedCategory = event
    if (this.selectedCategory != 'All') {
      this.gallery = [];
      this.imagesData.forEach((element: any) => {
        if (element.name == 'Image For Gallery' && element.category == this.selectedCategory) {
          const src = 'http://localhost:8100' + element.bannersimage;
          const caption = element.category;
          const thumb = 'http://localhost:8100' + element.bannersimage;
          const album = {
            src,
            caption,
            thumb
          };
          this.gallery.push(album);
        }
      });
      this.collectionSize = this.gallery.length;
      this.getPagintaion();
    }
    else {
      this.gallery = [];
      this.imagesData.forEach((element: any) => {
        if (element.name == 'Image For Gallery') {
          const src = 'http://localhost:8100' + element.bannersimage;
          const caption = element.category;
          const thumb = 'http://localhost:8100' + element.bannersimage;
          const album = {
            src,
            caption,
            thumb
          };
          this.gallery.push(album);
        }
      });
      this.collectionSize = this.gallery.length;
      this.getPagintaion();
    }

  }
}

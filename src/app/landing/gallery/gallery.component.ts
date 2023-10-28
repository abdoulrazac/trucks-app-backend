import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images: any[] ;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() {
    this.images = [] ;
  }

  ngOnInit() {
    this.images = [
      {
        "itemImageSrc": "assets/images/gallery/galleria1.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria1s.jpg",
        "alt": "Description for Image 1",
        "title": "Title 1"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria2.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria2s.jpg",
        "alt": "Description for Image 2",
        "title": "Title 2"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria3.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria3s.jpg",
        "alt": "Description for Image 3",
        "title": "Title 3"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria4.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria4s.jpg",
        "alt": "Description for Image 4",
        "title": "Title 4"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria5.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria5s.jpg",
        "alt": "Description for Image 5",
        "title": "Title 5"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria6.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria6s.jpg",
        "alt": "Description for Image 6",
        "title": "Title 6"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria7.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria7s.jpg",
        "alt": "Description for Image 7",
        "title": "Title 7"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria8.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria8s.jpg",
        "alt": "Description for Image 8",
        "title": "Title 8"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria9.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria9s.jpg",
        "alt": "Description for Image 9",
        "title": "Title 9"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria10.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria10s.jpg",
        "alt": "Description for Image 10",
        "title": "Title 10"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria11.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria11s.jpg",
        "alt": "Description for Image 11",
        "title": "Title 11"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria12.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria12s.jpg",
        "alt": "Description for Image 12",
        "title": "Title 12"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria13.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria13s.jpg",
        "alt": "Description for Image 13",
        "title": "Title 13"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria14.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria14s.jpg",
        "alt": "Description for Image 14",
        "title": "Title 14"
      },
      {
        "itemImageSrc": "assets/images/gallery/galleria15.jpg",
        "thumbnailImageSrc": "assets/images/gallery/galleria15s.jpg",
        "alt": "Description for Image 15",
        "title": "Title 15"
      }]
  }
}

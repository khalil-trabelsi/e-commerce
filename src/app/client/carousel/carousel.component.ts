import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

  selectedIndex = 0;

  images = [
    // {imageSrc: '../../../assets/384156-1593695168.jpg', imageAlt: 'pc_gamer_promo'},
    {imageSrc: '../../../assets/sams.jpg', imageAlt: 'pc_gamer_promo'},
    {imageSrc: '../../../assets/8889.png', imageAlt: 'pc_gamer_promo'},
    // {imageSrc: '../../../assets/gamer.jpg', imageAlt: 'pc_gamer_promo'},
    // {imageSrc: '../../../assets/promos-ecran-pc-msi-optix-g27cq4_01E3000001700740.jpg', imageAlt: 'pc_gamer_promo'},
    {imageSrc: '../../../assets/c08a9b5e-8665-4015-8c07-362adc318e35.jpeg', imageAlt: 'pc_gamer_promo'},
  ]


  ngOnInit(): void {
      this.autoSlideImages();
  }

  autoSlideImages(): void {
    setInterval(()=> {
      if (this.selectedIndex === (this.images.length -1)) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }, 3000)
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length -1;
    } else {
      this.selectedIndex--;
    }
  }

  oNextClick(): void {
    if (this.selectedIndex !== (this.images.length -1)) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressPipe'
})
export class AddressPipe implements PipeTransform {

  transform(value: {street: string, country: string, city: string, postal: string} | any, ): string {
    return value ? `${value.street} ${value.city} ${value.postal} ${value.country}` : 'error while converting address';
  }

}

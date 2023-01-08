import { registerDecorator } from 'class-validator';

function isValidDateObject (date: Date) {
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (isNaN(date.getTime())) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function IsExpiryDate() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExpiryDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `${propertyName} should be a unix time in the future`
      },
      validator: {
        validate(value: any) {
          const currentDate = new Date;
          let date;
          try {
            date = new Date(value * 1000);
          } catch (error) {
            return false;
          }

          if(!isValidDateObject(date))
            return false;

          if(date < currentDate) {
            return false;
          }

          return true;
        },
      },
    });
  };
}
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function isValidDateObject (date: Date) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    if (isNaN(date.getTime())) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
  
}

export function IsUnixTime(range: { min?: Date, max?: Date }, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUnixTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [range],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [range] = args.constraints;
          let date
          try {
            date = new Date(value * 1000)
          } catch (error) {
            return false
          }

          if(!isValidDateObject(date))
            return false

          if(range.min) {
            if(date < range.min) {
              return false
            }
          }
          
          if(range.max) {
            if(date > range.max) {
              return false
            }
          }

          return true
        },
      },
    });
  };
}